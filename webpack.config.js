const webpack = require('webpack')

module.exports = {
    entry: "./lib/BFGSAlgorithm.js",
    output: {
        path: __dirname + '/dist',
        filename: "bfgs-algorithm.min.js"
    },
    plugins: [
        // minifies the bundles
        new webpack.optimize.UglifyJsPlugin()
    ]
}