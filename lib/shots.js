const config = require('../config'),
  h = require('highland'),
  fs = require('fs-extra'),
  shotFactory = require('webshot-factory'),
  url = require('url');

function shoot(target) {
  const filename = url.parse(target).pathname.split('/')[3];

  return h(shotFactory.getShot(target)
    .then((buffer) => fs.writeFile('screenshots/' + filename + '.png', buffer))
  );
}

function main(list) {
  const streams = h(list);

  shotFactory.init({
    concurrency: config.numBrowsers || 5,
    warmerUrl: config.warmerUrl || 'http://vulture.com',
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
        process.exit();
      });
  });
}

module.exports.main = main;
