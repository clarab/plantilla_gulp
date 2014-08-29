var gulp = require("gulp");
var slim = require("gulp-slim");
var watch = require("gulp-watch");
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');

gulp.task('server', function() {
  connect.server({
    root: 'public',
    port: 8080,
    livereload: true
  });
});

gulp.task('sass', function () {
    return gulp.src('app/assets/stylesheets/*.sass')
        .pipe(sass({}))
        .on('error', function (err) { console.log(err.message); })
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('slim', function(){
  gulp.src("./app/views/*.slim")
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest("./public"));
});

gulp.task('reload', function () {
  gulp.src('public/**')
    .pipe(connect.reload());
});

gulp.task("dev", function(){
  gulp.watch("./app/views/*.slim",["slim"] );
  gulp.watch("./app/assets/stylesheets/*.sass",["sass"] );
  gulp.watch("public/**",["reload"] );
});

gulp.task("default", ["dev", "server"]);
