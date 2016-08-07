var BFGSAlgorithm = require('../lib/BFGSAlgorithm.js')

describe("BFGSAlgorithm", function() {
    it("cacul", function() {
        var f = function(x) {
            return 100 * (x[1] - x[0] * x[0]) * (x[1] - x[0] * x[0]) + (1 - x[0]) * (1 - x[0])
        }

        var df = function(x) {
            return [
                400 * (x[0] * x[0] * x[0] - x[0] * x[1]) - 2 * (1 - x[0]),
                200 * (x[1] - x[0] * x[0])
            ]
        }

        var guess = [-1, 2]

        var bfgs1 = new BFGSAlgorithm(f, guess, { df: df })
        var bfgs2 = new BFGSAlgorithm(f, guess)

        var result1 = bfgs1.run()
        var result2 = bfgs2.run()

        // ATTENTIONS: I change the source of jasmine-core, add this method
        // jasmine-core version: 2.4.1
        // L87:
        //  'toAlmostEqual',
        // 
        // L2878: 
        // getJasmineRequireObj().toAlmostEqual = function() {
        //   function toAlmostEqual() {
        //     return {
        //       compare: function(actual, expected) {
        //         return {
        //           pass: Math.abs(actual - expected) / Math.abs(expected) < 1E-6
        //         };
        //       }
        //     };
        //   }
        //   return toAlmostEqual;
        // };
        expect(result1.x[0]).toAlmostEqual(1)
        expect(result1.x[1]).toAlmostEqual(1)
        expect(result2.x[0]).toAlmostEqual(1)
        expect(result2.x[1]).toAlmostEqual(1)
    })


    it("cacul", function() {
        var f = function(x) {
            return 3 * x[0] * x[0] + 2 * x[0] * x[1] + x[1] * x[1] - 4 * x[0] + 5 * x[1]      
        }

        var df = function(x) {
            return [
                6 * x[0] + 2 * x[1] - 4,
                2 * x[0] + 2 * x[1] + 5
            ]
        }

        var guess = [5, 10]

        var bfgs1 = new BFGSAlgorithm(f, guess, { df: df })
        var bfgs2 = new BFGSAlgorithm(f, guess)

        var result1 = bfgs1.run()
        var result2 = bfgs2.run()

        // ATTENTIONS: I change the source of jasmine-core, add this method
        // jasmine-core version: 2.4.1
        // L87:
        //  'toAlmostEqual',
        // 
        // L2878: 
        // getJasmineRequireObj().toAlmostEqual = function() {
        //   function toAlmostEqual() {
        //     return {
        //       compare: function(actual, expected) {
        //         return {
        //           pass: Math.abs(actual - expected) / Math.abs(expected) < 1E-6
        //         };
        //       }
        //     };
        //   }
        //   return toAlmostEqual;
        // };
        expect(result1.x[0]).toAlmostEqual(2.25)
        expect(result1.x[1]).toAlmostEqual(-4.75)
        expect(result2.x[0]).toAlmostEqual(2.25)
        expect(result2.x[1]).toAlmostEqual(-4.75)
    })
})
