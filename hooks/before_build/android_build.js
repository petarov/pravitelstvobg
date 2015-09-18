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

var resources = [
  {
    src: 'assets/android/PravitelstvoBG.java',
    dest: 'platforms/android/src/net/vexelon/pravitelstvobg/PravitelstvoBG.java'
  }
];

console.log('*** [HOOK] Copy platform build files ...');

resources.forEach(function(res) {
  var srcPath = path.join(rootdir, res.src);
  if (!fs.existsSync(srcPath)) {
    quit(srcPath + ' does not exist!');
  }

  var destPath = path.join(rootdir, res.dest);
  // if (!fs.existsSync(destDir)) {
    // quit(destDir + ' does not exist! Please add an Android platform.');
  // }
  // destPath = path.join(destDir, 'AndroidManifest.xml');
  // 
  // console.log('*********** copy ', srcPath, ' to ', destPath);

  var rd = fs.createReadStream(srcPath);
  rd.on("error", function(err) {
    quit(err);
  });
  var wr = fs.createWriteStream(destPath);
  wr.on("error", function(err) {
    quit(err);
  });
  rd.pipe(wr);
});
