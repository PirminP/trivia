import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import { actionPlayer } from '../redux/action/actions';
import { shuffle, questionDifficult } from '../services/services';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      timer: 30,
      assertions: 0,
      score: 0,
      respondido: false,
      indexQ: 0,
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
        questions: shuffle(questions2.results),
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
    this.setState({ timer: 0 }, () => clearInterval(this.interval));
  };

  resetCounter = () => {
    this.setState({ timer: 30 });
  };

  newQuestion = async () => {
    const token = localStorage.getItem('token');
    const questions = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const questions2 = await questions.json();
    const NUMBER_RESPONSE_CODE = 3;

    if (questions2.response_code === NUMBER_RESPONSE_CODE) {
      const { history } = this.props;
      history.push('/');
    } else {
      this.setState({
        questions: shuffle(questions2.results),
      });
    }
  };

  showCorrectAnswers = ({ target }) => {
    const btnCorrect = document.querySelectorAll(
      '[data-testid="correct-answer"]',
    );
    const btnWrong = document.querySelectorAll('[data-testid^="wrong-answer"]');
    btnCorrect.forEach((button) => {
      button.style.border = '3px solid rgb(6, 240, 15)';
    });
    btnWrong.forEach((button) => {
      button.style.border = '3px solid red';
    });

    this.totalPoints(target.className);
    this.setState({ respondido: true });
  };

  totalPoints = (answer) => {
    const { avatar, getPlayer } = this.props;
    const { email, login } = avatar;
    const { timer, assertions, score, questions, indexQ } = this.state;
    const { difficulty } = questions[indexQ];
    const START_POINT = 10;
    const dificuldade = questionDifficult(difficulty);
    const pontuacao = START_POINT + timer * dificuldade;

    if (answer === 'wrong-answer') return 0;

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

  setNextQuestion = () => {
    const { indexQ } = this.state;
    const NUMBER_FOUR = 4;
    const btnCorrect = document.querySelectorAll(
      '[data-testid="correct-answer"]',
    );
    const btnWrong = document.querySelectorAll('[data-testid^="wrong-answer"]');

    btnCorrect.forEach((button) => {
      button.style.border = '';
      button.style.backgroundColor = '';
    });
    btnWrong.forEach((button) => {
      button.style.border = '';
      button.style.backgroundColor = '';
    });

    if (indexQ !== NUMBER_FOUR) {
      this.setState((prevState) => ({
        indexQ: prevState.indexQ + 1,
        timer: 30,
      }));
    }

    if (indexQ === NUMBER_FOUR) {
      this.setState({ score: 0 });
      const { history } = this.props;

      history.push('/feedback');
    }
  };

  render() {
    const { questions, timer, score, respondido, indexQ } = this.state;
    let allQuestins;

    if (questions) {
      allQuestins = [
        ...questions[indexQ].incorrect_answers,
        questions[indexQ].correct_answer,
      ];
    }

    return questions ? (
      <div>
        <Header score={ score } />

        <div data-testid="answer-options" className="container-answer">
          <h2>{timer}</h2>
          <h1 data-testid="question-category">{questions[indexQ].category}</h1>
          <span data-testid="question-text">{questions[indexQ].question}</span>
          {allQuestins.map((item, index) => (
            <button
              type="button"
              key={ index }
              data-testid={
                item === questions[indexQ].correct_answer
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
              className={
                item === questions[indexQ].correct_answer
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
        {timer === 0 ? (
          <button
            type="button"
            onClick={ this.setNextQuestion }
            data-testid="btn-next"
          >
            Next
          </button>
        ) : (
          respondido && (
            <button
              type="button"
              onClick={ this.setNextQuestion }
              data-testid="btn-next"
            >
              Next
            </button>
          )
        )}
      </div>
    ) : (
      <div>loading</div>
    );
  }
}

const mapStateToProps = (state) => ({
  avatar: state.login.inputLogin,
  token: state.login.inputLogin.token,
  player: state.player,
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
