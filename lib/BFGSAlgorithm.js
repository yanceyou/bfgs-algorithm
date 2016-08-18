'use strict'

var minimize = require('minimize-golden-section-1d')

var MathUtils = require('./MathUtils.js')

/**
 * [BFGSAlgorithm description]
 */
var BFGSAlgorithm = function(f, x0, options) {
    options = options || {}

    this.f = f
    this.n = x0.length
    // cache the init guess
    this.xInitGuess = x0
    this.x = MathUtils.clone(x0)

    this.df = options.df || MathUtils.getApproximateGradientFunction(this.f)
    this.maxIterator = options.maxIterator || 200
    this.err = options.err || 1E-6

    // the gradient of the function evaluated at x[k]: g[k]  (x[0] = x0)
    this.g = this.df(this.x)

    // the inverse of approximate Hessian matrix: B[k]  (B[0] = I)
    this.B = MathUtils.getIdentityMatrix(this.n)

    // direction: p[k]
    this.p = []

    this.stepsize = 0
    this.convergence = Infinity
    this.isConverges = false

    this.iterator = -1
}

BFGSAlgorithm.prototype = {
    step: function() {
        var self = this
        var dimension = self.n
        var i, j

        ////////////////////////////////////////////////////////////////
        // 0. Convergence is checked by observing the norm of the gradient
        // 
        var convergence = 0
        for (i = 0; i < dimension; i++) {
            convergence += self.g[i] * self.g[i]
        }
        self.convergence = Math.sqrt(convergence)

        if (isNaN(self.convergence)) {
            throw 'the norm of the gradient was unconverged'
        }

        if (self.convergence < self.err) {
            self.isConverges = true
            return self
        }

        self.iterator++
        ////////////////////////////////////////////////////////////////
        // 1. obtain a direction pk by solving: P[k] = - B[k] * ▽f(x[k])
        // 搜索方向 done: p 
        for (i = 0; i < dimension; i++) {
            self.p[i] = 0
            for (j = 0; j < dimension; j++) {
                self.p[i] += -self.B[i][j] * self.g[j]
            }
        }

        ////////////////////////////////////////////////////////////////
        // 2. lineSearch: min f(x + lamda * p)
        // 搜索步长 done: stepsize
        var fNext = function(lamda) {
            var xNext = []
            for (i = 0; i < dimension; i++) {
                xNext[i] = self.x[i] + lamda * self.p[i]
            }
            return self.f(xNext)
        }

        self.stepsize = minimize(fNext, { guess: 0 })

        if (isNaN(self.stepsize)) {
            throw 'can\'t find approximate stepsize'
        }
        
        ////////////////////////////////////////////////////////////////
        // 3. update: x[k + 1] = x[k] + stepsize * p[k],  s[k] = stepsize * p[k]
        // 求取heessian矩阵中间值 s done: s = stepsize * p
        // 下一次迭代点 done: s = stepsize * p
        var s = []
        for (i = 0; i < dimension; i++) {
            s[i] = self.stepsize * self.p[i]
            self.x[i] += s[i]
        }

        ////////////////////////////////////////////////////////////////
        // 4. next gradient: ▽f(x[k + 1]), y[k] = g[k + 1] - g[k]
        // 求取hessian矩阵中间值 y done: y = df(x[k + 1]) - df(x[k])
        var _g = self.df(self.x)
        var y = []
        for (i = 0; i < dimension; i++) {
            y[i] = _g[i] - self.g[i]
        }
        self.g = _g

        ////////////////////////////////////////////////////////////////
        // 5. approximate hessian matrix
        // (T) => transposition
        
        // 5.1 let _scalarA = s(T) * y
        var _scalarA = 0
        for (i = 0; i < dimension; i++) {
            _scalarA += s[i] * y[i]
        }

        // 5.2 let _vectorB = B * y
        var _vectorB = []
        for (i = 0; i < dimension; i++) {
            _vectorB[i] = 0
            for (j = 0; j < dimension; j++) {
                _vectorB[i] += self.B[i][j] * y[j]
            }
        }

        // 5.3 let _scalarC = (s(T) * y + y(T) * B * y) / (s(T) * y)2
        //                  = (_scalarA + y(T) * _vectorB) / (_scalarA * _scalarA)
        var _scalarC = 0
        for (i = 0; i < dimension; i++) {
            _scalarC += y[i] * _vectorB[i]
        }
        _scalarC = (_scalarA + _scalarC) / (_scalarA * _scalarA)

        for (i = 0; i < dimension; i++) {
            for (j = 0; j < dimension; j++) {
                self.B[i][j] += _scalarC * s[i] * s[j] - (_vectorB[i] * s[j] + s[i] * _vectorB[j]) / _scalarA
            }
        }

        return self
    },

    run: function() {
        while (true) {
            if (this.isConverges) {
                return this
            }

            if (this.iterator > this.maxIterator) {
                throw 'Too much iterators'
            }

            this.step()
        }
    }
}

module.exports = BFGSAlgorithm