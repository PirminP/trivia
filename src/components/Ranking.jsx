// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort = funçao de sortPoints
import React from 'react';
import md5 from 'crypto-js/md5';
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
    const { player, email, login } = this.props;
    const hash = md5(email).toString();

    const playerData = {
      name: login,
      score: player.score,
      picture: `https://www.gravatar.com/avatar/${hash}`,
    };

    let ranking = JSON.parse(localStorage.getItem('ranking'));

    console.log(ranking);

    if (ranking) {
      const oldRanking = ranking;
      oldRanking.push(playerData);
      const players = this.sortPoints(ranking);
      localStorage.setItem('ranking', JSON.stringify(players));
      this.setState({ ranking: players });
      console.log('if', ranking);
    } else {
      ranking = [playerData];
      console.log('else', ranking);
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

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>

        <div>
          {ranking.map((player, index) => (
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
  player: propTypes.shape({ score: propTypes.number.isRequired }).isRequired,
  email: propTypes.string.isRequired,
  login: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  login: state.login.inputLogin.login,
  email: state.login.inputLogin.email,
});

export default connect(mapStateToProps)(Ranking);
