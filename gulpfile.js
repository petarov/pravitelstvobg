/**
 * PravitelstvoBG Build Script
 */

var gulp = require('gulp')
  , concat = require('gulp-concat')
  , sass = require('gulp-sass')
  , minifyCss = require('gulp-minify-css')
  , rename = require('gulp-rename')
  , exec = require('child_process').exec
  , Q = require('q')
  , fs = require('fs')
  , argv = require('yargs').argv;

var Consts = {
  RELEASE_NAME: 'PravitelstvoBG.apk'
};

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

  try {
    fs.unlinkSync(Consts.RELEASE_NAME);
  } catch (e) {};

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
gulp.task('sign', ['build'], function() {
  var deferred = Q.defer();

  var ksPath = argv.ks;
  if (ksPath) {
    if (!fs.existsSync(ksPath)) {
      console.error('[ERROR] Keystore not found at ' + ksPath + '!');
      process.exit(-2);
    }
  } else {
    console.error('[ERROR] Keystore path not specified! Use --ks <path>');
    process.exit(-2);
  }

  var ksPass = argv.ksPass;
  if (!ksPath) {
    console.error('[ERROR] Keystore password not specified! use --ksPass <password>');
    process.exit(-3);
  }

  var cmdline = 'jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 '
    + ' -keystore ' + ksPath 
    + ' -storepass ' + ksPass
    + ' -signedjar platforms/android/ant-build/PravitelstvoBG-release-signed.apk'
    + ' platforms/android/ant-build/PravitelstvoBG-release-unsigned.apk pravitelstvobg';

  console.log(cmdline);

  var child = exec(cmdline,  function(err, stdout, stderr) {
    console.log(stdout);
    if (err) {
      console.error(stderr);
      deferred.reject('[ERROR] Cordova sign failed!');
    } else {

      //TODO: align
      var zcmd = 'zipalign -v 4 platforms/android/ant-build/PravitelstvoBG-release-signed.apk ' + Consts.RELEASE_NAME;
      var zchild = exec(zcmd, function(err, stdout, stderr) {
        console.log(stdout);
        if (err) {
          console.error(stderr);
          deferred.reject('[ERROR] Cordova sign failed!');
        } else {
          // All OK!
          deferred.resolve();
        }
      });
    }
  });

  return deferred.promise;  
});


/**
 * Default
 */
gulp.task('default', ['sass']);
gulp.task('release', ['build', 'sign']);
