// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort = funçao de sortPoints
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    let ranking = JSON.parse(localStorage.getItem('ranking'));

    if (ranking) {
      const players = this.sortPoints(ranking);
      localStorage.setItem('ranking', JSON.stringify(players));
      this.setState({ ranking: players });
    } else {
      ranking = [];
      localStorage.setItem('ranking', JSON.stringify(ranking));
      this.setState({ ranking });
    }
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
  };

  render() {
    const { ranking } = this.state;

    console.log(ranking);

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <div>
          {ranking.length === 0 ? (
            <>Volte ao inicio e começe uma partida para ter um ranking</>
          ) : (
            ranking.map((player, index) => (
              <div key={ index }>
                <img src={ player.picture } alt="foto perfil" />
                <h3 data-testid={ `player-name-${index}` }>{player.name}</h3>
                <h3 data-testid={ `player-score-${index}` }>{player.score}</h3>
              </div>
            ))
          )}
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
  player: propTypes.shape({ score: propTypes.number.isRequired }).isRequired,

};

const mapStateToProps = (state) => ({
  player: state.player,
  login: state.login.inputLogin.login,
  email: state.login.inputLogin.email,
});

export default connect(mapStateToProps)(Ranking);
