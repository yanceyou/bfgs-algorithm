'use strict'

var MathUtils = {
    getApproximateGradientFunction: function(f) {
        return function(x) {
            var deltaX = 1E-10
            var deltaY
            var xNew = [], dy = []

            var i, j, n = x.length
            for (i = 0; i < n; i++) {
                for (j = 0; j < n; j++) {
                    xNew[j] = (i === j) ? (x[j] + deltaX) : x[j]
                }

                deltaY = f(xNew) - f(x)

                dy[i] = deltaY / deltaX
            }

            return dy
        }
    },

    /**
     * generate Identity Matrix
     * @param  {Number} size the size of identity matrix
     * @return {Array}  Identity Matrix 
     */
    getIdentityMatrix: function(size) {
        var i, j
        var matrix = []

        for (i = 0; i < size; i++) {
            matrix[i] = []
            for (j = 0; j < size; j++) {
                matrix[i][j] = 0
            }
            matrix[i][i] = 1
        }

        return matrix
    },

    clone: function(array) {
        var res = []
        var i, len = array.length

        for (i = 0; i < len; i++) {
            res.push(array[i])
        }

        return res
    }
}

module.exports = MathUtils
