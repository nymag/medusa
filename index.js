const config = require('./config'),
  fs = require('fs-extra'),
  main = require('./lib/shots').main,
  readline = require('readline'),
  rl = readline.createInterface({
    input: fs.createReadStream(config.list)
  }),
  urls = [];

rl.on('line', (line) => {
  urls.push(line);
});

rl.on('close', () => {
  fs.ensureDirSync(config.screenshotsDir || 'screenshots');
  main(urls);
});
