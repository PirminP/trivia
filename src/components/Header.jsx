import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    console.log(md5('higino.neto@gmail.com').toString());
    return (
      <header>
        <img alt="#" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">Higino</h3>
        <h4 data-testid="header-score">0</h4>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state });

export default connect(mapStateToProps)(Header);
