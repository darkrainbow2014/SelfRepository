const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //minimize js
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //extract style snippets into .css file
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //minimize css
const CleanWebpackPlugin = require("clean-webpack-plugin"); //clean pre-build generating resources when start building
const CopyWebpackPlugin = require("copy-webpack-plugin"); //copy assest to the distributing .html file
const HtmlWebpackPlugin = require("html-webpack-plugin"); // write reference path to the distributing .html file
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin"); //for add assest to .html file

let defaultConfig = {
    mode: "development",
    entry: {
        main: "./src/index.tsx"
    },
    output: {
        filename: "[name].[hash].js",
        path: __dirname + "/dist/",
        library: "adore",
        hashDigestLength: 8
    },
    devtool: "source-map",
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
            },
            // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }, {
                test: /\.scss$/,
                use: [
                    // "css-hot-loader",
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
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new MiniCssExtractPlugin({
            filename: "style.[hash].css"
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

module.exports = (env, argv) => {
    const useDevelopmentServer = process.env.WEBPACK_SERVE;
    const isDevelopmentMode = useDevelopmentServer || argv.mode !== "production";
    const mode = isDevelopmentMode ? "development" : "production";

    defaultConfig.devtool = isDevelopmentMode ? "source-map" : "none";

    const copyLibPlugin = new CopyWebpackPlugin([{
        from: "lib/hash/@(commons|" + mode + ")/**/*.js",
        to: "lib/script/[name].[ext]",
        toType: "template"
    }, {
        from: "lib/hash/@(commons|" + mode + ")/**/*.css",
        to: "lib/style/[name].[ext]",
        toType: "template"
    }]);

    const generateHtmlPlugin = new HtmlWebpackPlugin({
        title: "Adore Single Page Application",
        template: "index.html"
    });

    const baseScriptLib = ["react"];
    const glob = baseScriptLib.map((str) => str + "!(-)").join("|");
    const appendAssetPlugin = new HtmlWebpackIncludeAssetsPlugin({
        assets: [{
            path: "lib/script",
            glob: "*@(" + glob + ")*.js",
            globPath: "lib/hash/" + mode + "/script/",
            append: false
        }, {
            path: "lib/script",
            glob: "*.js",
            globPath: "lib/hash/" + mode + "/script/",
            append: true
        }, {
            path: "lib/style",
            glob: "*.css",
            globPath: "lib/hash/" + mode + "/style/"
        }],
        append: false
    });

    defaultConfig.plugins.push(copyLibPlugin, generateHtmlPlugin, appendAssetPlugin);

    return defaultConfig;
};