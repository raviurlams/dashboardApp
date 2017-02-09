/**
 * Gulp build file
 */
var gulp = require('gulp');

/**
 * Load plugins
 */
var config = require('./gulpconfig.json');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass   = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var connect = require('gulp-connect');

var assets = {
  scripts: [    
    'assets/angular/angular.min.js',
    'assets/angular-bootstrap/ui-bootstrap.min.js',
    'assets/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'assets/angular-messages/angular-messages.min.js',
    'assets/angular-resource/angular-resource.min.js',
    'assets/angular-ui-router/release/angular-ui-router.min.js',   
    'assets/jquery/dist/jquery.min.js'
  ],
  styles: [
    'assets/bootstrap/dist/css/bootstrap.min.css',    
    'assets/angular-bootstrap/ui-bootstrap-csp.css'
  ]
};

var app = {
  scripts: [
    'src/scripts/*.js',
    'src/scripts/**/*.js'
  ],
  styles: [
    'src/styles/*.scss',
    'src/styles/**/*.scss',
  ],
  images: [
    'src/images/*'
  ],
  views: [
    'src/views/*.html',
    'src/views/**/*.html'
  ],
  index: 'src/index.html'
};

/*
 Build assets
*/
gulp.task('assets-scripts', () => {
  return gulp.src(assets.scripts)
    .pipe(concat('assets.min.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('assets-styles', () => {
  return gulp.src(assets.styles)
    .pipe(concat('assets.min.css'))
    .pipe(gulp.dest('dist'))
});

/*
 Build app
 */
gulp.task('app-scripts', () => {
  return gulp.src(app.scripts)
    .pipe(sourcemaps.init())
    // .pipe(ngAnnotate())
    .pipe(uglify({mangle: false}))
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('app-styles', () => {
  return gulp.src(app.styles)
      .pipe(sourcemaps.init())
      .pipe(concat('app.min.css'))
      .pipe(sass({outputStyle: 'compact'}))
      .pipe(sourcemaps.write('maps'))
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
});

gulp.task('app-views', () => {
  
  gulp.src(app.views)
    .pipe(templateCache())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());

  gulp.src(app.index)
    .pipe(gulp.dest('dist'))

});

/*
 Lint JS files
*/
gulp.task('jshint', () => {
  gulp.src(app.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
});

/*
 Watch for changes
 */
gulp.task('watch', () => {
  gulp.watch([app.scripts], ['app-scripts', 'jshint']);
  gulp.watch([app.styles], ['app-styles']);  
  gulp.watch([app.views, app.index], ['app-views']);
});

/*
 Run a development http server
*/
gulp.task('serve', () => {
  connect.server({
    root: 'dist',
    livereload: config.enableLivereload
  });
});


gulp.task('assets', ['assets-scripts', 'assets-styles']);

gulp.task('app', ['app-scripts', 'app-styles', 'app-views']);

/** 
 * Build production app
 */
gulp.task('prod', ['assets', 'app', 'jshint']);


var devTasks = ['assets', 'app', 'watch'];

if(config.enableServe) {
  devTasks.push('serve');
}

/** 
 * Run development tasks
 */
gulp.task('dev', devTasks);

/*
 Default task
*/
gulp.task('default', ['dev']);


/*
 Aliases
*/
gulp.task('production', ['prod']);
gulp.task('development', ['dev']);
