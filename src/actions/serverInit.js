import actions from '../constants/actions';

const serverInit = () => {
  const payload = {};

  if (typeof window !== 'undefined') {
    payload.zwsid = window.zwsid;
  }

  return (
    (dispatch) => dispatch({
      type: actions.APP_INITIALIZED_SUCCESS,
      payload,
    })
  );
}

export default serverInit;
