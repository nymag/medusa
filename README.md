Medusa
======

A command-line tool that takes screenshots of multiple web sites kinda fast. Also does visual diffing! Basically a nicer wrapper for [webshot-factory](https://github.com/ashubham/webshot-factory), which in turn is relying on [chrome headless](https://github.com/GoogleChrome/puppeteer).

## How to use
- add some urls to a text file. All that is required is that each url you want to take a screenshot of is on its own line.
- configure the tool to your liking via `config.js`. You can figure the name of the folder where you're saving screenshots, how you want to name the screenshots (see `config.generateName()`) and settings for webshot-factory.


1. run `npm install`
2. run `node index.js -f FILENAME`

## Comparing screenshots
to do compare screenshots (aka visual diffing), run:
`node index.js -f FILENAME.YAML -d`

The file of urls has to be a yaml file and has to be formatted like this:
```
-
  reference: http://www.vulture.com/2018/03/generic-network-tv-drama-quiz.html
  tester: http://www.vulture.com/2018/03/youtube-red-what-to-know-about-the-streaming-service.html
-
  reference: http://www.vulture.com/2018/03/sxsw-2018-british-takover-showcase-spotlights-afro-swing.html
  tester: http://www.vulture.com/2018/03/pacific-rim-uprising-review.html

```

### Use cases

- quick visual qa of multiple pages
- checking that ads are loading on multiple pages
- doing design research

## WARNINGS
- I've tried setting concurrency to 10, which led to memory leak errors but maybe you'll have better luck?? (-Amy)
- the tool will take a screenshot of the ENTIRE height of the page, this might to lead to images that are several mb big

## Roadmap
- `stdin` maybe???
