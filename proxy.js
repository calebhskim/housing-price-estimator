const express = require('express');
const request = require('request');
const xml2js = require('xml2js');
const get = require('lodash/get');
const parseString = xml2js.parseString;

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  const params = {};

  params['zws-id'] = req.query['zws-id'];
  params['address'] = req.query['address'];
  params['citystatezip'] = req.query['citystatezip'];

  request({
    uri: req.query['url'],
    method: 'get',
    qs: params,
  }, (error, response, body) => {
    parseString(body, (err, result) => {
      if (err) {
        res.send('Error');
      } else {
        // TODO: filter multiple search results
        const addressResult = get(result['SearchResults:searchresults'], 'response[0].results', []);
        res.send(addressResult);
      }
    });
  });
});

app.listen(8080, () => console.log('Proxy server listening on port 8080'));
