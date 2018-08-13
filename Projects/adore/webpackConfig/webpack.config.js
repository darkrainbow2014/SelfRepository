//此webpack config直接用于导出生产用文件
const basicConfig = require("./webpack.config.basic");
const combineConfig = require("./combineConfig");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //extract style snippets into .css file
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin"); //for add assest to .html file

const baseScriptLib = ["react"];
const glob = baseScriptLib.map((str) => str + "!(-)").join("|");

config = {
    mode: "production",
    entry: {
        main: "./src/index.tsx"
    },
    output: {
        filename: "[name].[contentHash].js",
    },
    devtool: "none",
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
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
        }],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.[contentHash].css"
        }),
        new CopyWebpackPlugin([{
            from: "lib/hash/@(commons|production)/**/*.js",
            to: "lib/script/[name].[ext]",
            toType: "template"
        }, {
            from: "lib/hash/@(commons|production)/**/*.css",
            to: "lib/style/[name].[ext]",
            toType: "template"
        }]),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [{
                path: "lib/script",
                glob: "*@(" + glob + ")*.js",
                globPath: "lib/hash/production/script/",
                append: false
            }, {
                path: "lib/script",
                glob: "*.js",
                globPath: "lib/hash/production/script/",
                append: true
            }, {
                path: "lib/style",
                glob: "*.css",
                globPath: "lib/hash/production/style/"
            }],
            append: false
        })
    ]
};

module.exports = combineConfig(basicConfig, config);