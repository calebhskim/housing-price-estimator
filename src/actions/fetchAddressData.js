import axios from 'axios';

import actions from '../constants/actions';

const {
  FETCH_ZILLOW_DATA_START,
  FETCH_ZILLOW_DATA_SUCCESS,
  FETCH_ZILLOW_DATA_FAILURE,
} = actions;

export default function fetchAddressData(address, zipcode) {
  return {
    types: {
      request: FETCH_ZILLOW_DATA_START,
      success: FETCH_ZILLOW_DATA_SUCCESS,
      failure: FETCH_ZILLOW_DATA_FAILURE,
    },
    callAPI: (state) => {
      const {
        config: { urls: { local, zillow } },
        data: { zwsid }
      } = state;
      const params = {};
     
      params['zws-id'] = zwsid;
      params['address'] = address;
      params['citystatezip'] = zipcode;
      params['url'] = zillow;

      return axios({
        method: 'get',
        baseURL: local,
        url: '',
        params
      });
    },
  };
}
