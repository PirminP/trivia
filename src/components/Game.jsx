// source: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array, função shuffle

import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import { fetchQuestion } from '../redux/action/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: undefined,
    };
  }

  async componentDidMount() {
    const { token, history } = this.props;

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
        <h1 data-testid="question-category">{questions[0].category}</h1>
        <span data-testid="question-text">{questions[0].question}</span>
        {console.log(questions)}

        <div data-testid="answer-options">
          {allQuestins.sort().map((item, index) => (
            <button
              type="button"
              key={ index }
              data-testid={
                item === questions[0].correct_answer
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
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
  dataQuestion: state.questions.dataAPI.results,
});

Game.propTypes = {
  history: propTypes.objectOf.isRequired,
  token: propTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (state) => dispatch(fetchQuestion(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
