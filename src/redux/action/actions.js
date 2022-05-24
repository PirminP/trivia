export const actionJson = (json) => ({
  type: 'JSON_ACTION',
  payload: json,
});

export const actionRequest = () => ({ type: 'REQUEST_ACTION' });

export const actionFailed = (error) => ({
  type: 'FAILED_ACTION',
  payload: error.message,
});

export function fetchAction() {
  return (dispatch) => {
    dispatch(actionRequest());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => {
        dispatch(actionJson(data));
      })
      .catch((error) => dispatch(actionFailed(error)));
  };
}

export const actionData = (json) => ({
  type: 'DATA_ACTION',
  payload: json,
});

export const actionLogin = (state) => ({ type: 'ACTION_LOGIN', payload: state });
