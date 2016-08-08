var MathUtils = require('../lib/MathUtils.js')
var BFGSAlgorithm = require('../lib/BFGSAlgorithm.js')

var customMatchers = {
    toAlmostEqual: function(util, customEqualityTesters) {
        return {
            compare: function(actual, expected) {
                if (expected === undefined) {
                    expected = ''
                }

                var result = {}

                result.pass =  Math.abs(actual - expected) / Math.abs(expected) < 1E-6

                if (result.pass) {
                    result.message = "Expected " + actual + " not to almost equal " + expected
                }

                return result
            }
        }
    }
}

describe("MathUtils", function() {
    beforeEach(function() {
        jasmine.addMatchers(customMatchers);
    })

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

        expect(res[0]).toAlmostEqual(REAL_RESULT[0])
        expect(res[1]).toAlmostEqual(REAL_RESULT[1])
    })

    it("have getIdentityMatrix method that can generate identity matrix", function() {
        var matrix = MathUtils.getIdentityMatrix(3)

        expect(matrix).toEqual([[1,0,0],[0,1,0],[0,0,1]])
    })
})
