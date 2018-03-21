const config = require('../config'),
  diff = require('./diff').diff,
  h = require('highland'),
  fs = require('fs-extra'),
  shotFactory = require('webshot-factory');

let screenshotMap = {};

function shoot(target) {
  const filename = config.generateName(target);

  screenshotMap[target] = filename;

  return h(shotFactory.getShot(target)
    .then((buffer) => fs.writeFile(`${config.screenshotsDir}/${filename}.png`, buffer))
  );
}

function main(list, diffingMap) {
  const streams = h(list);

  shotFactory.init({
    concurrency: config.numBrowsers || 5,
    warmerUrl: list[0],
    width: config.width || 1050,
    height: config.height || 600,
    timeout: 60000,
    webshotDebugPort: 3030
  })
  .then(() => {
    streams
      .flatMap(shoot)
      .errors((err) => {
        console.error('Something went wrong.');
        console.error(err);
        process.exit(1);
      })
      .done(() => {
        console.log('finished taking screenshots');
        console.log(screenshotMap);
        if (diffingMap) {
          diff(screenshotMap, diffingMap);
        } else {
          process.exit();
        }
      });
  });
}

module.exports.main = main;
