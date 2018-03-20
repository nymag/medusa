module.exports = {
  // width and height of the screenshot,
  width: 1050,
  height: 600,
  // # of headless browsers we want running concurrently, any more than 5 might
  // cause memory leak errors
  numBrowsers: 2,
  // text file that has our list of urls we want screenshots of
  list: 'examples.txt',
  // "warmer" url, so when loaded, the browsers can cache scripts
  warmerUrl: 'http://www.vulture.com/2018/03/big-little-lies-season-two-first-look.html',
  screenshotsDir: 'screenshots'
};
