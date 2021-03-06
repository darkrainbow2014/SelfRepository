const gulp = require("gulp");
const run = require("gulp-run");
const hash = require("gulp-hash");
const clean = require("gulp-clean");
const rename = require("gulp-rename");

gulp.task("cleanHashLib", () => {
    return gulp
        .src("lib/hash").pipe(clean());
});

// 将对应的外部库文件加上hash,webpack的自动生成html的插件无法读取到单文件hash,所以用gulp来做
gulp.task("createHashLib", ["cleanHashLib"], () => {
    return gulp
        .src("lib/**/*.@(js|css)")
        .pipe(hash({
            algorithm: 'md5',
            template: '<%= name %>.<%= hash %><%= ext %>',
            hashLength: 8
        }))
        .pipe(rename((path) => {
            path.dirname = path.dirname.replace("src\\", "");
        }))
        .pipe(gulp.dest('lib/hash'));
});

gulp.task("build:prod", ["createHashLib"], () => {
    return run("webpack --config ./webpackConfig/webpack.config.prod.js").exec();
});

gulp.task("dev:serve", ["createHashLib"], () => {
    return run("webpack-serve --open --config ./webpackConfig/webpack.config.dev.js").exec();
});

gulp.task("default", ["createHashLib"]);