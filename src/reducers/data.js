import actions from '../constants/actions';
import initialState from '../constants/initialState';

const data = (state = initialState.data, { payload, type }) => {
  switch(type) {
    case actions.APP_INITIALIZED_SUCCESS: {
      return Object.assign({}, state, payload);
    }
    case actions.FETCH_ZILLOW_DATA_SUCCESS: {
      return Object.assign({}, state);
    }
    default:
      return state;
  }
};

export default data;
