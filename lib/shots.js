const config = require('../config'),
  events = require('events'),
  em = new events.EventEmitter(),
  fs = require('fs-extra'),
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
    let counter = 0;

    for (var i = 0; i <list.length -1; i++) {
      let target = list[i],
        filename = url.parse(target).pathname.split('/')[3];

      shotFactory.getShot(target)
        .then((buffer) => {
          fs.writeFile('screenshots/'+filename+'.png', buffer)
            .then(() => {
              counter++
              if (counter === list.length-1) {
                em.emit('DONE');
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

em.on('DONE', function () {
  console.log('done taking screenshots, you can terminate this process.');
});

module.exports.main = main;
