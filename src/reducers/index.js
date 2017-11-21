import { combineReducers } from 'redux';

import config from './config';
import data from './data';

// Map of reducers to pass to store
const reducers = {
  config,
  data,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
