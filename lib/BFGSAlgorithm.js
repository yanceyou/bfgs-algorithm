'use strict'

/**
 * [BFGSAlgorithm description]
 */
var BFGSAlgorithm = function(f, x0, options) {
    this.initialGuess = x0

    this.f = f
    this.x = xGuess


    this.status = -1
}

BFGSAlgorithm.prototype = {
    step: function() {

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