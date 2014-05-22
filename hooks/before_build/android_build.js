#!/usr/bin/env node
/**
 * Copy AndroidManifest.xml template into build folder
 */

var fs = require('fs')
  , path = require('path')
  , rootdir = process.argv[2];


function quit(msg) {
    console.error('[ERROR] ', msg);
    process.exit(-1);
};

var manifestPath = path.join(rootdir, 'platforms/AndroidManifest.xml');
if (!fs.existsSync(manifestPath)) {
    quit(manifestPath + ' does not exist!');
}

var dest = path.join(rootdir, 'platforms/android');
if (!fs.existsSync(dest)) {
    quit(manifestPath + ' does not exist! Please add an Android platform.');
}

dest = path.join(dest, 'AndroidManifest.xml');

// fs.createReadStream(manifestPath).pipe(fs.createWriteStream(dest));

var rd = fs.createReadStream(manifestPath);
rd.on("error", function(err) {
    quit(err);
});
var wr = fs.createWriteStream(dest);
wr.on("error", function(err) {
    quit(err);
});
rd.pipe(wr);