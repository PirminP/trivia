const INITIAL_STATE = {
  isFetching: false,
  data: '',
  error: '',
  inputLogin: {
    email: '',
    login: '',
  },
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_ACTION':
    return { ...state, isFetching: true };
  case 'JSON_ACTION':
    return { ...state, data: action.payload, isFetching: false };
  case 'FAILED_ACTION':
    return { ...state, error: action.payload, isFetching: false };
  case 'ACTION_LOGIN':
    return { ...state, inputLogin: action.payload };
  default:
    return state;
  }
}

export default login;
