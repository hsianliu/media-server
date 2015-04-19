var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true,
        debug: true
    });

    b.add('./client/js/index.js');

    b.bundle()
        .pipe(source('app.bundle.js'))
        .pipe(gulp.dest('./client'));
});
