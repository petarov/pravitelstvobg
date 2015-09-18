#!/usr/bin/env node

var fs = require('fs'), path = require('path');

var platform = process.env.CORDOVA_PLATFORMS;
if(platform === 'android') {
  var androidManifestPath = path.resolve(__dirname, '../../platforms/android/');
  androidManifestPath = path.join(androidManifestPath, 'AndroidManifest.xml');
  fs.readFile(androidManifestPath, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }
    var result = data;
    var permissions = [
      '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />'];
    for (var i = 0; i < permissions.length; i++) {
      result = result.replace(permissions[i], '');
    }
    fs.writeFile(androidManifestPath, result, 'utf8', function (err) {
      if (err) {
        throw err;
      }
    });
  });
}