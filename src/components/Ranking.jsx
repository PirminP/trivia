import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  // componentDidMount() {
  //   const { player, login, email } = this.props;
  // }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape(propTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  login: state.login.inputLogin.login,
  email: state.login.inputLogin.email,
});

export default connect(mapStateToProps)(Ranking);
