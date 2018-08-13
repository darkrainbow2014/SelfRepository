//存放基本且无需替换的webpack基本功能
const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //minimize js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //minimize css
const CleanWebpackPlugin = require("clean-webpack-plugin"); //clean pre-build generating resources when start building
const HtmlWebpackPlugin = require("html-webpack-plugin"); // write reference path to the distributing .html file

const rootDir = path.dirname(__dirname);

module.exports = {
    mode: "none",
    output: {
        path: path.resolve(rootDir, "dist"),
        library: "adore",
        hashDigestLength: 8
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader"
        }, {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        }]
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(rootDir, "dist")], {
            allowExternal: true
        }),
        new HtmlWebpackPlugin({
            template: "index.html"
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                }
            },
            name: "dep",
            chunks: "all"
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};