import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { avatar, player } = this.props;
    const { email, login } = avatar;
    const hash = md5(email).toString();

    return (
      <header>
        <img
          alt="#"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{login}</h3>
        <h4 data-testid="header-score">{ player.score }</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: state.login.inputLogin,
  player: state.player,
});

Header.propTypes = {
  avatar: propTypes.arrayOf.isRequired,
  score: propTypes.number.isRequired,
  player: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
