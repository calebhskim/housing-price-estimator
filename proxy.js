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
        // TODO: filter multiple search results e.g. filter through results
        const addressResult = get(result['SearchResults:searchresults'], 'response[0].results[0].result[0]', []);
        const propertyData = {};

        propertyData['zpid'] = get(addressResult, 'zpid[0]', '');
        propertyData['sqft'] = get(addressResult, 'finishedSqFt[0]', ''); 
        propertyData['lotsqft'] = get(addressResult, 'lotSizeSqFt[0]', '');
        propertyData['bedrooms'] = get(addressResult, 'bedrooms[0]', '');
        propertyData['totalrooms'] = get(addressResult, 'totalRooms[0]', '');
        propertyData['baths'] = get(addressResult, 'bathrooms[0]', '');
        propertyData['FIPScounty'] = get(addressResult, 'FIPScounty[0]', '');
        propertyData['useCode'] = get(addressResult, 'useCode[0]', '');
        propertyData['yearBuilt'] = get(addressResult, 'yearBuilt[0]', '');
        propertyData['zestimate'] = get(addressResult, 'zestimate[0].amount[0]', '');

        res.send(propertyData);
      }
    });
  });
});

app.listen(8080, () => console.log('Proxy server listening on port 8080'));
