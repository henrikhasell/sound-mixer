var gulp = require("gulp");
var typescript = require("gulp-typescript");

gulp.task("compile", function () {
    gulp.src('ts/**/*.ts').pipe(typescript()).pipe(gulp.dest('ts'))
});

gulp.task("copy", function () {
    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/bootstrap/dist/fonts/glyphicons-*.{css,eot,js,svg,ttf,woff,woff2}',
    ], { base: 'node_modules/bootstrap/dist' })
        .pipe(gulp.dest('wwwroot/lib/bootstrap'));

    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery/dist/jquery.min.js',
    ], { base: 'node_modules/jquery/dist' })
        .pipe(gulp.dest('wwwroot/lib/jquery'));

    gulp.src([
        'node_modules/html5shiv/dist/html5shiv.js',
        'node_modules/html5shiv/dist/html5shiv.min.js',
    ], { base: 'node_modules/html5shiv/dist' })
        .pipe(gulp.dest('wwwroot/lib/html5shiv'));

    gulp.src([
        'node_modules/respond.js/dest/respond.min.js'
    ], { base: 'node_modules/respond.js/dest' })
        .pipe(gulp.dest('wwwroot/lib/respond.js'));

    gulp.src([
        'node_modules/howler/dist/howler.min.js'
    ], { base: 'node_modules/howler/dist' })
        .pipe(gulp.dest('wwwroot/lib/howler'));

    gulp.src([
        'node_modules/@tweenjs/tween.js/src/Tween.js'
    ], { base: 'node_modules/@tweenjs/tween.js/src' })
        .pipe(gulp.dest('wwwroot/lib/tween.js'));

    gulp.src([
        'ts/**/*.js'
    ], { base: 'ts' })
        .pipe(gulp.dest('wwwroot'));
});

gulp.task("default", ['compile', 'copy']);
