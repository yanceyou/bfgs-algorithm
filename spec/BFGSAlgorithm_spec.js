var BFGSAlgorithm = require('../lib/BFGSAlgorithm.js')

describe("BFGSAlgorithm", function() {
    it("test", function() {
        var bfgs = new BFGSAlgorithm(Math.sin)
        console.log(bfgs.step())
    })
})
