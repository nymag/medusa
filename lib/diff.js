const config = require('../config'),
  fs = require('fs-extra'),
  looksSame = require('looks-same');

// TODO: refactor using streamz
function diff(screenshotMap, diffingMap){
  let count = diffingMap.length;
  console.log('performing visual diffing');

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
        count--;
          if (error) {
            console.error('error with looksSame!');
            console.error(error);
          } else {
            console.log('diff image created!')
          }

        if (count === 0) {
          console.log('finished visual diffing!')
          process.exit();
        }
    });
  });
}

module.exports.diff = diff;
