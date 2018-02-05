const path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // Add the JSHint loader
    module: {
        rules: [
            {
                test: /\.js$/, // Run the loader on all .src files
                exclude: /node_modules/, // ignore all files in the node_modules folder
                use: 'jshint-loader'
            }
        ]
    }
};