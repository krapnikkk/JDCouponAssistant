const gulp = require('gulp');
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");

gulp.task("default", () => {
    return browserify({
        basedir:".",
        debug: false,
        entries: ['./main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'))
});