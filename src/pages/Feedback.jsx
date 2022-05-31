import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const { player, email, login } = this.props;
    const { ranking } = this.state;
    const hash = md5(email).toString();

    const playerData = {
      name: login,
      score: player.score,
      picture: `https://www.gravatar.com/avatar/${hash}`,
    };
    ranking.push(playerData);

    localStorage.setItem('ranking', JSON.stringify(ranking));

    console.log(player);
  }

  render() {
    const { player } = this.props;
    const { assertions, score } = player;
    const NUMBER_TRES = 3;

    return (
      <div>
        <Header />
        <h1>Pagina de Feedback</h1>
        {assertions < NUMBER_TRES ? (
          <span data-testid="feedback-text">Could be better...</span>
        ) : (
          <span data-testid="feedback-text">Well Done!</span>
        )}
        <div>
          <h2 data-testid="feedback-total-score">{score}</h2>
          <h3 data-testid="feedback-total-question">{assertions}</h3>
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              const { history } = this.props;
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              const { history } = this.props;
              history.push('/');
            } }
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: propTypes.shape(propTypes.object).isRequired,
  history: propTypes.shape(propTypes.object).isRequired,
  email: propTypes.string.isRequired,
  login: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  login: state.login.inputLogin.login,
  email: state.login.inputLogin.email,
});

export default connect(mapStateToProps)(Feedback);
