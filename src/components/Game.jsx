// source: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array, função shuffle

import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import './StyleGame.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: '',
    };
  }

  async componentDidMount() {
    const { history } = this.props;

    const token = localStorage.getItem('token');

    const questions = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const questions2 = await questions.json();
    const NUMBER_RESPONSE_CODE = 3;

    if (questions2.response_code === NUMBER_RESPONSE_CODE) {
      history.push('/');
    } else {
      this.setState({ questions: this.shuffle(questions2.results) });
    }
  }

  shuffle = (a) => {
    let j;
    let x;
    let i;
    for (i = a.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  showCorrectAnswers = () => {
    const correctButtons = document.querySelectorAll('[data-testid="correct-answer"]');
    const wrongButtons = document.querySelectorAll('[data-testid^="wrong-answer"]');
    correctButtons.forEach((button) => {
      button.style.backgroundColor = 'rgb(6, 240, 15)';
      button.style.border = '3px solid rgb(6, 240, 15)';
    });
    wrongButtons.forEach((button) => {
      button.style.backgroundColor = 'red';
      button.style.border = '3px solid red';
    });
  }

  render() {
    const { questions } = this.state;
    let allQuestins;

    if (questions) {
      allQuestins = [
        ...questions[0].incorrect_answers,
        questions[0].correct_answer,
      ];
    }

    return questions ? (
      <div>
        <Header />

        <div data-testid="answer-options">
          <h1 data-testid="question-category">{questions[0].category}</h1>
          <span data-testid="question-text">{questions[0].question}</span>
          {allQuestins.map((item, index) => (
            <button
              type="button"
              key={ index }
              data-testid={
                item === questions[0].correct_answer
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
              onClick={ this.showCorrectAnswers }
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    ) : (
      <div>loading</div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state,
  token: state.login.inputLogin.token,
});

Game.propTypes = {
  history: propTypes.shape(propTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Game);
