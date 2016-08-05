'use strict'

var minimize = require('minimize-golden-section-1d')

var MathUtils = require('./MathUtils.js')

/**
 * [BFGSAlgorithm description]
 */
var BFGSAlgorithm = function(f, df, x0, options) {
    this.initialGuess = x0

    this.f = f
    this.df = df
    this.x = x0
    this.n = x0 ? x0.length : 0

    // approximate Hessian matrix: B[k]
    // B[0] = I
    this.B = MathUtils.getIdentityMatrix(this.n)

    // direction: p[k]
    this.p = []

    this.status = -1

    this.iterator = 0
}

BFGSAlgorithm.prototype = {
    step: function() {
        this.iterator++
        
        // 1. obtain a direction pk by solving: B[k]P[k] = -▽f(x[k])
        //    using the inverse of the matrix B[k]: P[k] = -B[k]-1 * ▽f(x[k])


        // 2. lineSearch: a[k]
        var stepMin = minimize(this.f, { lowerBound: 0, upperBound: 1 })
        return stepMin
        // 3. update: x[k + 1] = x[k] + a[k] * p[k]
    },

    steps: function(steps) {
        var i
        for (i = 0; i < steps; i++) {
            this.step()
        }
        return this.x
    },

    run: function() {

    }
}

module.exports = BFGSAlgorithm