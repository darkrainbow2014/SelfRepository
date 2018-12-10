//此webpack config用于快速开发环境
const basicConfig = require("./webpack.config.basic");
const combineConfig = require("./combineConfig");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //extract style snippets into .css file
const CopyWebpackPlugin = require("copy-webpack-plugin"); //for resource copy
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin"); //for add assest to .html file

const baseScriptLib = ["react"];
const glob = baseScriptLib.map((str) => str + "!(-)").join("|");

const config = {
    mode: "development",
    entry: {
        main: "./TestGround.tsx"
    },
    output: {
        filename: "[name].js",
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        // includePaths: ["absolute/path/a", "absolute/path/b"]
                    }
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new CopyWebpackPlugin([{
            from: "lib/src/@(commons|development)/**/*.js",
            to: "lib/script/[name].[ext]",
            toType: "template"
        }, {
            from: "lib/src/@(commons|development)/**/*.css",
            to: "lib/style/[name].[ext]",
            toType: "template"
        }]),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [{
                path: "lib/script",
                glob: "*@(" + glob + ")*.js",
                globPath: "lib/src/development/script/",
                append: false
            }, {
                path: "lib/script",
                glob: "*.js",
                globPath: "lib/src/development/script/",
                append: true
            }, {
                path: "lib/style",
                glob: "*.css",
                globPath: "lib/src/development/style/"
            }],
            append: false
        })
    ]
};

module.exports = combineConfig(basicConfig, config);