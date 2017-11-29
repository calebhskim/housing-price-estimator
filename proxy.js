const express = require('express');
const request = require('request');
const xml2js = require('xml2js');
const get = require('lodash/get');
const parseString = xml2js.parseString;

const app = express();

const modelZipCodes = {
  '98101': true,
  '98102': true,
  '98103': true,
  '98104': true,
  '98105': true,
  '98106': true,
  '98107': true,
  '98108': true,
  '98109': true,
  '98110': true,
  '98111': true,
  '98112': true,
  '98114': true,
  '98115': true,
  '98116': true,
  '98117': true,
  '98118': true,
  '98119': true,
  '98121': true,
  '98122': true,
  '98124': true,
  '98125': true,
  '98126': true,
  '98131': true,
  '98132': true,
  '98133': true,
  '98134': true,
  '98136': true,
  '98138': true,
  '98144': true,
  '98145': true,
  '98146': true,
  '98148': true,
  '98154': true,
  '98155': true,
  '98158': true,
  '98160': true,
  '98161': true,
  '93401': true,
  '93402': true,
  '93403': true,
  '93405': true,
  '93406': true,
  '93407': true,
  '93408': true,
  '93409': true,
  '93410': true,
  '93412': true,
  '93420': true,
  '93421': true,
  '93422': true,
  '93423': true,
  '93424': true,
  '93428': true,
  '93430': true,
  '93432': true,
  '93433': true,
  '93435': true,
  '93442': true,
  '93443': true,
  '93444': true,
  '93445': true,
  '93446': true,
  '93447': true,
  '93448': true,
  '93449': true,
  '93451': true,
  '93452': true,
  '93453': true,
  '93461': true,
  '93465': true,
  '93483': true,
};

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
        res.send('Zillow Error');
      } else {
        // TODO: filter multiple search results e.g. filter through results
        const addressResult = get(result['SearchResults:searchresults'], 'response[0].results[0].result[0]', []);
        const propertyData = {};

        propertyData['zpid'] = get(addressResult, 'zpid[0]', '');
        propertyData['address'] = get(addressResult, 'address[0]', '');
        propertyData['sqft'] = get(addressResult, 'finishedSqFt[0]', ''); 
        propertyData['lotsqft'] = get(addressResult, 'lotSizeSqFt[0]', '');
        propertyData['bedrooms'] = get(addressResult, 'bedrooms[0]', '');
        propertyData['totalrooms'] = get(addressResult, 'totalRooms[0]', '');
        propertyData['baths'] = get(addressResult, 'bathrooms[0]', '');
        propertyData['FIPScounty'] = get(addressResult, 'FIPScounty[0]', '');
        propertyData['useCode'] = get(addressResult, 'useCode[0]', '');
        propertyData['yearBuilt'] = get(addressResult, 'yearBuilt[0]', '');
        propertyData['zestimate'] = get(addressResult, 'zestimate[0].amount[0]', '');

        if (modelZipCodes[get(propertyData['address'], 'zipcode[0]', 'false')]) {
          request({
            uri: 'http://127.0.0.1:5000/gethousingestimate',
            method: 'post',
            form: {
              'location': get(propertyData['address'], 'city[0]', ''),
              'bedrooms': propertyData['bedrooms'],
              'bathrooms': propertyData['baths'],
              'sqft_living': propertyData['sqft'], 
              'sqft_lot': propertyData['lotsqft'],
              'zipcode': get(propertyData['address'], 'zipcode[0]', ''),
              'status': '',
              'condition': '',
              'grade': '',
              'year_built': propertyData['yearBuilt'],
            },
          }, (error, response, body) => {
            // console.log(JSON.stringify(error));
            // console.log(JSON.stringify(response));
            // console.log(JSON.stringify(body));

            if (err) {
              console.log('Model Error', error);
            } else {
              propertyData['zestimate']['_'] = JSON.parse(body)['estimate'];
              res.send(propertyData);
            }
          });
        } else {
          res.send(propertyData);
        }
      }
    });
  });
});

app.listen(8080, () => console.log('Proxy server listening on port 8080'));
