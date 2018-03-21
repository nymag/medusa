const url = require('url');

module.exports = {
  // width and height of the screenshot,
  width: 1050,
  height: 600,
  // # of headless browsers we want running concurrently, any more than 5 might
  // cause memory leak errors
  numBrowsers: 2,
  // where we're saving screenshots
  screenshotsDir: 'screenshots',
  // where we're saving diff images
  diffDir: 'diffs',
  // a custom function for generating filenames, feel free to edit this to your
  // liking. Needs to return a string
  generateName: function(target){
    // return url.parse(target).pathname.replace(/\//g, '_').replace('.html','');
    return `screenshot-${Date.now()}`;
  }
};
