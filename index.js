const argv = require('yargs').argv,
  byline = require('byline'),
  config = require('./config'),
  fs = require('fs-extra'),
  h = require('highland'),
  main = require('./lib/shots').main,
  urls = [],
  yaml = require('js-yaml');

let fileStream, diffMap;

function readText(filepath) {
  return h(byline(fs.createReadStream(filepath, 'utf8')));
}

function readYAML(filepath) {
  return h((fs.readFile(filepath, 'utf8')));
}

fs.ensureDirSync(config.screenshotsDir);
fs.ensureDirSync(config.diffDir);

if (argv.f) {

  if (argv.d) {
    readYAML(argv.f)
      .map(yaml.safeLoad)
      .each(function(data){
        diffMap = data;
        data.forEach((val)=>{
          urls.push(val.reference);
          urls.push(val.tester);
        });
      })
      .done(function(){
        main(urls, diffMap);
      });

  } else {
    readText(argv.f)
      .toArray(function(urls){
        main(urls);
      });
  }
} else {
  console.error('you need to enter a file!');
}
