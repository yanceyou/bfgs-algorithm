var MathUtils = require('../lib/MathUtils.js')
var BFGSAlgorithm = require('../lib/BFGSAlgorithm.js')

describe("MathUtils", function() {
    it("have getIdentityMatrix method that can generate identity matrix", function() {
        console.log(MathUtils.getIdentityMatrix)
        var matrix = MathUtils.getIdentityMatrix(3)

        expect(matrix[0][0]).toBe(1)
        expect(matrix[0][1]).toBe(0)
        expect(matrix[1][1]).toBe(1)
        expect(matrix[1][2]).toBe(0)
        expect(matrix[2][2]).toBe(1)
        expect(matrix[2][3]).toBe(undefined)
    })
})
