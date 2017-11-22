This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Housing Price Estimator
A simple react application that estimates housing price based on housing properties such as lot size, number of bathrooms, square footage, etc using a linear regression model. The application pulls addresses from the Google Places API and grabs housing property data from Zillow. The linear regression model can be found [here](https://github.com/joncatanio/housing-classifier).

## Usage
To run this application you will need [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/lang/en/docs/install/). Also install [node](https://nodejs.org/en/download/). You will also need a Google API key for the [Places](https://developers.google.com/maps/documentation/javascript/places-autocomplete) API. And a [Zillow](https://www.zillow.com/howto/api/APIOverview.htm) key which can be found [here](https://www.zillow.com/howto/api/APIOverview.htm).

```
git clone https://github.com/calebhskim/housing-price-estimator.git
cd housing-price-estimator
node proxy.js
```

In a new terminal window change directories into `housing-price-estimator` and run:
```
./scripts/start [GOOGLE-MAPS-API-KEY] [ZILLOW-KEY]
```
