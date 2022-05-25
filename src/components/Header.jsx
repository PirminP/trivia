import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

/* import propTypes from 'prop-types'; */

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      myLogin: '',
      myEmail: '',
    };
  }

  componentDidMount() {
    const myLogin = localStorage.getItem('login');
    const myEmail = localStorage.getItem('email');

    this.setState({
      myEmail,
      myLogin,
    });
    console.log(myLogin);
  }

  render() {
    /* const { avatar } = this.props;
    /* const { email, login } = avatar; */
    const { myEmail, myLogin } = this.state;
    const hash = md5(myEmail).toString();
    return (
      <header>
        <img
          alt="#"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{myLogin}</h3>
        <h4 data-testid="header-score">0</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: state.login.inputLogin,
});

/* Header.propTypes = {
  avatar: propTypes.objectOf.isRequired,
}; */

export default connect(mapStateToProps)(Header);
