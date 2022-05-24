const INITIAL_STATE = {
  isFetching: false,
  data: '',
  error: '',
};

function avatar(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_ACTION':
    return { ...state, isFetching: true };
  case 'JSON_ACTION':
    return { ...state, data: action.payload, isFetching: false };
  case 'FAILED_ACTION':
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default avatar;
