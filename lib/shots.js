const config = require('../config'),
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
    for (var i = 0; i <list.length -1; i++) {
      let target = list[i],
        filename = url.parse(target).pathname.split('/')[3];

      shotFactory.getShot(target)
        .then((buffer) => {
          fs.writeFileSync('screenshots/'+filename+'.png', buffer, function(){
            console.log('finished getting screenshot for:' + target);
            worker.getStatus().jobs.length
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

module.exports.main = main;
