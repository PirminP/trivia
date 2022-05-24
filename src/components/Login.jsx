import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { fetchAction } from '../redux/action/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      login: '',
      button: true,
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
    const { token } = this.props;

    const myToken = await token;

    localStorage.setItem('token', myToken);
  }

  render() {
    const { button, email, login } = this.state;
    const { token } = this.props;
    console.log(token);
    this.saveTheToken();
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
              onClick={ () => this.saveTheToken }
            >
              PLAY
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: (state) => dispatch(fetchAction(state)) });

const mapStateToProps = (state) => ({
  token: state.login.data.token });

Login.propTypes = {
  getToken: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
