var MathUtils = require('../lib/MathUtils.js')
var BFGSAlgorithm = require('../lib/BFGSAlgorithm.js')

describe("MathUtils", function() {
    it("have getApproximateGradientFunction method", function() {
        var f = function(x) {
            return 100 * (x[1] - x[0] * x[0]) * (x[1] - x[0] * x[0]) + (1 - x[0]) * (1 - x[0])
        }

        var df = function(x) {
            return [
                400 * (x[0] * x[0] * x[0] - x[0] * x[1]) - 2 * (1 - x[0]),
                200 * (x[1] - x[0] * x[0])
            ]
        }

        var x = [-1, 2]

        var dff = MathUtils.getApproximateGradientFunction(f)

        var res = dff(x)
        var REAL_RESULT = df(x)

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
        expect(res[0]).toAlmostEqual(REAL_RESULT[0])
        expect(res[1]).toAlmostEqual(REAL_RESULT[1])
    })

    it("have getIdentityMatrix method that can generate identity matrix", function() {
        var matrix = MathUtils.getIdentityMatrix(3)

        expect(matrix).toEqual([[1,0,0],[0,1,0],[0,0,1]])
    })
})
