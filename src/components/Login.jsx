import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import {
  fetchAction,
  actionLogin,
  fetchQuestion,
} from '../redux/action/actions';
import md5 from 'crypto-js/md5';

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
    console.log(this.props);
    const { history, getState } = this.props;
    const { login, email } = this.state;

    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const token = await response.json();

    const myToken = token.token;
    // const myLogin = login;
    // const myEmail = email;

    getState({
      ...this.state,
      token: myToken,
    });

    localStorage.setItem('token', myToken);

    const hash = md5(email).toString();

    // const playerData = {
    //   name: login,
    //   score: 0,
    //   picture: `https://www.gravatar.com/avatar/${hash}`,
    // };

    const playerData = { name: login, score: 0, picture: `https://www.gravatar.com/avatar/${hash}` };

    const ranking = JSON.parse(localStorage.getItem('ranking'));

    if (ranking) {
      const oldRanking = JSON.parse(localStorage.getItem('ranking'));
      oldRanking.push(playerData);
      localStorage.setItem('ranking', JSON.stringify(oldRanking));
      // console.log('tem ranking');
      console.log(oldRanking);
    } else {
      // console.log('não tem ranking');
      localStorage.setItem('ranking', JSON.stringify([playerData]));
    }

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
  getToken: (state) => dispatch(fetchAction(state)),
  getState: (state) => dispatch(actionLogin(state)),
  getQuestion: (state) => dispatch(fetchQuestion(state)),
});

const mapStateToProps = (state) => ({
  token: state.login.data.token,
  info: state.login.inputLogin,
});

Login.propTypes = {
  getState: propTypes.func.isRequired,
  history: propTypes.shape(propTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
