// source: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array, função shuffle

import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import { actionPlayer } from '../redux/action/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      timer: 30,
      assertions: 0,
      score: 0,
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
      this.setState({
        questions: this.shuffle(questions2.results),
      });
    }

    this.startCounter();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer < 0) {
      clearInterval(this.interval);
      this.stopCounter();
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

  startCounter = () => {
    const UM_SEGUNDO = 1000;
    const { timer } = this.state;

    this.interval = setInterval(() => {
      if (timer === 0) this.setState({ timer: 0 });
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, UM_SEGUNDO);
  };

  stopCounter = () => {
    this.setState(
      {
        timer: 0,
      },
      () => clearInterval(this.interval),
    );
  };

  resetCounter = () => {
    this.setState({
      timer: 30,
    });
  };

  showCorrectAnswers = ({ target }) => {
    const btnCorrect = document.querySelectorAll(
      '[data-testid="correct-answer"]',
    );
    const btnWrong = document.querySelectorAll('[data-testid^="wrong-answer"]');
    btnCorrect.forEach((button) => {
      button.style.border = '3px solid rgb(6, 240, 15)';
      button.style.backgroundColor = 'rgb(6, 240, 15)';
    });
    btnWrong.forEach((button) => {
      button.style.border = '3px solid red';
      button.style.backgroundColor = 'red';
    });

    this.totalPoints(target.className);
  };

  questionDifficult = () => {
    const { questions } = this.state;
    const { difficulty } = questions[0];
    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    let dificuldade;

    if (difficulty === 'easy') {
      dificuldade = EASY;
      return dificuldade;
    }
    if (difficulty === 'medium') {
      dificuldade = MEDIUM;
      return dificuldade;
    }
    if (difficulty === 'hard') {
      dificuldade = HARD;
      return dificuldade;
    }
  };

  totalPoints = (answer) => {
    if (answer === 'wrong-answer') return 0;
    const { avatar, getPlayer } = this.props;
    const { email, login } = avatar;
    const { timer, assertions, score } = this.state;
    const START_POINT = 10;
    const dificuldade = this.questionDifficult();

    const pontuacao = START_POINT + timer * dificuldade;

    this.setState((prevState) => ({
      score: prevState.score + pontuacao,
      assertions: prevState.assertions + 1,
    }));

    const player = {
      name: login,
      gravatarEmail: email,
      score: score + pontuacao,
      assertions: assertions + 1,
    };

    getPlayer(player);
  };

  render() {
    const { questions, timer, score } = this.state;
    let allQuestins;

    if (questions) {
      allQuestins = [
        ...questions[0].incorrect_answers,
        questions[0].correct_answer,
      ];
    }

    return questions ? (
      <div>
        <Header score={ score } />

        <div data-testid="answer-options">
          <h2>{ timer }</h2>
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
              className={
                item === questions[0].correct_answer
                  ? 'correct-answer'
                  : 'wrong-answer'
              }
              onClick={ this.showCorrectAnswers }
              disabled={ timer === 0 }
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
  avatar: state.login.inputLogin,
  token: state.login.inputLogin.token,
  player: state,
});

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (state) => dispatch(actionPlayer(state)),
});

Game.propTypes = {
  history: propTypes.shape(propTypes.object).isRequired,
  getPlayer: propTypes.func.isRequired,
  email: propTypes.string.isRequired,
  login: propTypes.string.isRequired,
  avatar: propTypes.shape(propTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
