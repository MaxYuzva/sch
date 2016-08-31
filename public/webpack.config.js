var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        desktop: "./entry.js",
        mobile: "./mobile_entry.js",
        async: "./async_entry.js"
    },
    output: {
        path: "./dist",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {test: /\.png$/, loader: "url-loader?prefix=img/&limit=5000&name=./imgs/[hash].[ext]"},
            {test: /\.jpg$/, loader: "url-loader?prefix=img/&limit=5000&name=./imgs/[hash].[ext]"},
            {test: /\.gif$/, loader: "url-loader?prefix=img/&limit=5000&name=./imgs/[hash].[ext]"},
            {test: /\.woff2$/, loader: "url-loader?prefix=font/&limit=50000&name=./fonts/[hash].[ext]"},
            {test: /\.woff$/, loader: "url-loader?prefix=font/&limit=50000&name=./fonts/[hash].[ext]"},
            {test: /\.eot$/, loader: "file-loader?prefix=font/&name=./fonts/[hash].[ext]"},
            {test: /\.ttf$/, loader: "file-loader?prefix=font/&name=./fonts/[hash].[ext]"},
            {test: /\.svg$/, loader: "file-loader?prefix=font/&name=./fonts/[hash].[ext]"}
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            '$':          'jquery',
            'jQuery':     'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
};