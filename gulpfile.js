var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var exec = require('child_process').exec;
var Q = require('q');
var fs = require('fs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

/**
 * Build release APK package
 */
gulp.task('build', function() {
  var deferred = Q.defer();

  var child = exec('cordova build --release android', function(err, stdout, stderr) {
    console.log(stdout);
    if (err) {
      console.error(stderr);
      deferred.reject('[ERROR] Cordova build failed!');
    } else {
      deferred.resolve();
    }
  });

  return deferred.promise;
});
/**
 * Sign release APK package
 */
gulp.task('sign', function() {
  var deferred = Q.defer();

  var ksPath = gulp.env.ks;
  if (ksPath) {
    if (!fs.existsSync(ksPath)) {
      console.error('[ERROR] Keystore not found at ' + ksPath + '!');
      process.exit(-2);
    }
  } else {
    console.error('[ERROR] Keystore path not specified! Use --ks <path>');
    process.exit(-2);
  }

  var ksPass = gulp.env.ksPass;
  if (!ksPath) {
    console.error('[ERROR] Keystore password not specified! use --ksPass <password>');
    process.exit(-3);
  }

  var cmdline = 'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 '
    + ' -keystore ' + ksPath 
    + ' -storepass ' + ksPass
    + ' platforms/android/ant-build/PravitelstvoBG-release-unsigned.apk pravitelstvobg';

  var child = exec(cmdline,  function(err, stdout, stderr) {
    console.error(stdout);
    if (err) {
      console.error(stderr);
      deferred.reject('[ERROR] Cordova sign failed!');
    } else {

      //TODO: align

      deferred.resolve();
    }
  });

  return deferred.promise;  
});
/**
 * Build & Sign package
 */
gulp.task('release', function() {
  var deferred = Q.defer();

  // TODO:

  return deferred.promise;  
});

/**
 * Default
 */
gulp.task('default', ['sass']);
