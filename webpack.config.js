var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pathLib = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        main: './app/index.js'
    },
    output: {
        path: __dirname + '/static',
        filename: '[name].[chunkhash].js'
    },
    devServer: {
        contentBase: pathLib.join(__dirname, "static"),
        compress: true,
        port: 9000
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [
                    './app/index.html'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html?attrs=link:href',
                include: [
                    './app/index.html'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: __dirname + '/app',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'url-loader',
                options: {
                    limit: 25000,
                },
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                },
                exclude: /node_modules/
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html'
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};