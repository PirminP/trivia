import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  fetchAction,
  actionLogin,
  fetchQuestion,
  actionPlayer,
} from '../redux/action/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      login: '',
      button: true,
      token: '',
    };
  }

  handleChange = ({ target }) => {
    this.disabledBtn();
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  disabledBtn = () => {
    const { email, login } = this.state;
    const regex = /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+[a-zA-Z]$/;
    const ZERO = 0;

    if (regex.test(email) && login.length !== ZERO) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  saveTheToken = async () => {
    const { history, getState, getPlayer } = this.props;
    const { login, email } = this.state;

    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const token = await response.json();

    const myToken = token.token;

    getState({
      ...this.state,
      token: myToken,
    });

    getPlayer({
      name: login,
      score: 0,
      assertions: 0,
      gravatarEmail: email,
    });

    // local storage

    localStorage.setItem('token', myToken);
    history.push('/game');
  };

  render() {
    const { button, email, login } = this.state;
    return (
      <div>
        <div>
          <form>
            <input
              placeholder="Player Name"
              value={ login }
              type="text"
              name="login"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
            <br />
            <input
              placeholder="E-mail"
              name="email"
              value={ email }
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </form>
          <button
            id="button"
            disabled={ button }
            data-testid="btn-play"
            type="button"
            onClick={ this.saveTheToken }
          >
            PLAY
          </button>
          <Link to="/settings">
            <button type="button" data-testid="btn-settings">
              Settings
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  /* getToken: (state) => dispatch(fetchAction(state)), */
  getState: (state) => dispatch(actionLogin(state)),
  /* getQuestion: (state) => dispatch(fetchQuestion(state)), */
  getPlayer: (state) => dispatch(actionPlayer(state)),
});

const mapStateToProps = (state) => ({
  token: state.login.data.token,
  info: state.login.inputLogin,
});

Login.propTypes = {
  getState: propTypes.func.isRequired,
  history: propTypes.shape(propTypes.object).isRequired,
  getPlayer: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
