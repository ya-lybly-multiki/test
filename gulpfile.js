const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sourcemap = require('gulp-sourcemaps')
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();

gulp.task("css-source", function () {
    return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
    server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
    });

    gulp.watch("source/sass/**/*.scss", gulp.series("css-source"));

    gulp.watch("source/*.html", gulp.series("refresh"));
});

gulp.task("refresh", function (done) {
    server.reload();
    done();
})

gulp.task("start-source", gulp.series("css-source", "server"));