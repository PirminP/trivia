const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function myReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ACTION_PLAYER':
    return {
      ...state,
      name: action.state.name,
      gravatarEmail: action.state.gravatarEmail,
      score: action.state.score,
      assertions: action.state.assertions,
    };
  default:
    return state;
  }
}

export default myReducer;
