#!/usr/bin/env node
/**
 * Copy required android resource into build folder
 */

var fs = require('fs')
  , path = require('path')
  , rootdir = process.argv[2];

console.log('*** [HOOK] Copy platform resources ...');

var assetsPath = path.join(rootdir, 'assets/android');
fs.readdirSync(assetsPath).forEach(function(dirName){
  
  if(dirName[0] != ".") {
    var dirPath = path.join(assetsPath, dirName);
    fs.readdirSync(dirPath).forEach(function(fileName) {

      var source = path.join(dirPath, fileName);
      var dest = path.join(rootdir, 'platforms/android/res', dirName, fileName);

      console.log('Copying file ', source, ' to ', dest);

      fs.createReadStream(source).pipe(
        fs.createWriteStream(dest));

    });
  }

});
