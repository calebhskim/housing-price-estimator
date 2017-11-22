import actions from '../constants/actions';
import initialState from '../constants/initialState';

const data = (state = initialState.data, { payload, response, type }) => {
  switch(type) {
    case actions.APP_INITIALIZED_SUCCESS: {
      return Object.assign({}, state, payload);
    }
    case actions.FETCH_ZILLOW_DATA_SUCCESS: {
      return Object.assign({}, state, {
        addressData: response.data
      });
    }
    default:
      return state;
  }
};

export default data;
