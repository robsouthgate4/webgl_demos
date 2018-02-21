const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    context: __dirname,
    node: {
        __filename: true
    },
    entry: './src/app/index.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './src/public',
        port: 9000,
        watchOptions: {
            ignored: [
                path.resolve(__dirname, 'src/shaders/**/*.vert'),
                path.resolve(__dirname, 'src/shaders/**/*.frag')
            ]
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/public/index.html",
            inject: 'body'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    /node_modules/
                ]
            },
            {
                test: /node_modules/,
                loader: 'ify-loader'
            },
            {
                enforce: 'post',
                test: /\.js$/,
                loader: 'ify-loader'
            }
        ]
    }
};