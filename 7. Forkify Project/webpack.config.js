const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    }
}

// 4 main things to declare in webpack
// 1. entry file - the main app Controller
// 2. output file - the file that the output code would be written to
// 3. mode - production or development