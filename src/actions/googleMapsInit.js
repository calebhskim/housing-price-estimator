import actions from '../constants/actions';

const googleMapsInit = () => dispatch => {
  // Will not work with SSR
  const google = window.google;
  const service = new google.maps.places.AutocompleteService();
  dispatch({
    type: actions.GOOGLE_MAPS_INITIALIZED,
    payload: {
      service, 
    },
  });
};

export default googleMapsInit;
