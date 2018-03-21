const config = require('../config'),
  fs = require('fs-extra'),
  looksSame = require('looks-same');

// TODO: refactor using streamz
function diff(screenshotMap, diffingMap){

  diffingMap.forEach((test, index)=>{
    let reference = `${config.screenshotsDir}/${screenshotMap[test.reference]}.png`,
      tester = `${config.screenshotsDir}/${screenshotMap[test.tester]}.png`;

    looksSame(reference, tester, function(error, equal) {
      console.log(`Is ${test.reference}, the same as ${test.tester}? `, equal);
      if (!equal) {
        looksSame.createDiff({
          reference: reference,
          current: tester,
          diff: `${config.diffDir}/compared-${index}.png`,
          highlightColor: '#ff00ff', //color to highlight the differences
          strict: false,//strict comparsion
          tolerance: 2.5
          }, function(error) {
            console.error('error with looksSame!');
            console.error(error);
          });
      }
    });
  });
}

module.exports.diff = diff;
