'use strict'

var MathUtils = {
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
