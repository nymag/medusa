const config = require('../config'),
  events = require('events'),
  em = new events.EventEmitter(),
  fs = require('fs-extra'),
  looksSame = require('looks-same'),
  shotFactory = require('webshot-factory'),
  url = require('url');

function main(list){
  shotFactory.init({
    concurrency: config.numBrowsers || 5,
    warmerUrl: config.warmerUrl || 'http://vulture.com',
    width: config.width || 1050,
    height: config.height || 600,
    timeout: 60000,
    webshotDebugPort: 3030
  })
  .then((worker)=>{
    let counter = list.length;

    if (config.compareHost) {
      // doubling the counter, because we'll be taking twice as many screenshots
      counter = (list.length) * 2;
    }

    for (var i = 0; i < list.length; i++) {
      let target = list[i],
        filename = url.parse(target).pathname.split('/')[3],
        compareTarget,
        compareFilename;

      if (config.compareHost) {
        compareTarget = target.replace(url.parse(target).host, config.compareHost);
        compareFilename =  url.parse(compareTarget).pathname.split('/')[3]+ 'compare';
      };

      shotFactory.getShot(target)
        .then((buffer) => {
          fs.writeFile('screenshots/'+filename+'.png', buffer)
            .then(() => {
              if (config.compareHost) {
                shotFactory.getShot(compareTarget)
                  .then((buffer) => {
                    fs.writeFile('screenshots/'+compareFilename+'.png', buffer)
                      .then(() => {
                        // visual diffing!
                        looksSame('screenshots/'+filename+'.png', 'screenshots/'+compareFilename+'.png', function(error, equal) {
                          console.log(`Is ${'screenshots/'+filename+'.png'}, the same as ${'screenshots/'+compareFilename+'.png'}? `, equal);
                        });
                      });
                  })
                  .catch((error) => {
                      console.error(`Something went wrong with: ${target}`);
                      console.error(error);
                  });
              }

            });

        })
        .catch((error) => {
            console.error(`Something went wrong with: ${target}`);
            console.error(error);
        });
    };
  })
  .catch((error) => {
    console.error('something went wrong with webshot-factory');
  });
};

// em.on('DONE', function () {
//   console.log('done taking screenshots, you can terminate this process.');
//   if (compareHost) {

//   }
// });

module.exports.main = main;
