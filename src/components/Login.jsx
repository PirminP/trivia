import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { fetchAction, actionLogin, fetchQuestion } from '../redux/action/actions';

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

  componentDidMount() {
    const { getToken } = this.props;
    getToken();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });

    this.disabledBtn();
    this.saveTheToken();
  };

  disabledBtn() {
    const { email, login } = this.state;
    const regex = /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+[a-zA-Z]$/;
    const ZERO = 0;

    if (regex.test(email) && login.length > ZERO) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  async saveTheToken() {
    const { token, getState } = this.props;
    const { login, email } = this.state;

    const myToken = await token;
    const myLogin = login;
    const myEmail = email;

    getState({
      ...this.state,
      token: myToken,
    });

    localStorage.setItem('token', myToken);
    localStorage.setItem('login', myLogin);
    localStorage.setItem('email', myEmail);
  }

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
          <Link to="/game" style={ { width: '50%', marginTop: '10px' } }>
            <button
              id="button"
              disabled={ button }
              data-testid="btn-play"
              type="button"
              onClick={ this.saveTheToken }
            >
              PLAY
            </button>
          </Link>
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
  getToken: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
  getState: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
