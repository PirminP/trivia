import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  componentDidMount() {
    const { player } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking[ranking.length - 1].score = player.score;
    const players = this.sortPoints(ranking);
    localStorage.setItem('ranking', JSON.stringify(players));
  }

  sortPoints = (players) => {
    const minus1 = -1;
    players.sort((a, b) => {
      if (parseInt(a.score, 10) > parseInt(b.score, 10)) {
        return minus1;
      }
      if (parseInt(a.score, 10) < parseInt(b.score, 10)) {
        return 1;
      }
      return 0;
    });
    return players;
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const players = this.sortPoints(ranking);

    return (

      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <div>
          {players.map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt="foto perfil" />
              <h3 data-testid={ `player-name-${index}` }>{player.name}</h3>
              <h3 data-testid={ `player-score-${index}` }>{player.score}</h3>
            </div>
          ))}
        </div>

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
