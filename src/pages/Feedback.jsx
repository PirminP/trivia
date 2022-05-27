import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { player } = this.props;
    const { assertions, score } = player;
    const NUMBER_TRES = 3;

    console.log(player);
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
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
