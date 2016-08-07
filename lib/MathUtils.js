'use strict'

var MathUtils = {
    getApproximateGradientFunction: function(f) {
        return function(x) {
            var DELTA_RATIO = 1E-10
            var y = f(x),
                xNew = [],
                dy = []
            var deltaY, deltaX
            var i, j, n = x.length
            for (i = 0; i < n; i++) {
                for (j = 0; j < n; j++) {
                    xNew[j] = i === j ? x[j] * (1 + DELTA_RATIO) : x[j]
                }

                deltaY = f(xNew) - y
                deltaX = x[i] * DELTA_RATIO

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
    }
}

module.exports = MathUtils
