#!/usr/bin/env node
/**
 * Add required cordova plugins
 */

var requiredPlugins = [
  "org.apache.cordova.dialogs",
  "org.apache.cordova.vibration",
  "org.apache.cordova.inappbrowser",
  "https://github.com/driftyco/ionic-plugins-keyboard.git",
  "https://github.com/whiteoctober/cordova-plugin-app-version.git"
];
 
var fs = require('fs')
, path = require('path')
, sys = require('sys')
, exec = require('child_process').exec;

console.log('*** [HOOK] Adding plugins ...');
 
requiredPlugins.forEach(function(plugin) {
  exec("cordova plugin add " + plugin, function(err, stdout, stderr) {
    console.log(stdout)
    if (err) {
      console.error(stderr)
      process.exit(-1);
    }
  });
});