import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { fetchQuestion } from '../redux/action/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      question: '',
      answer: [],

    };
  }

  componentDidMount() {
    const { getQuestions, token, dataQuestion } = this.props;
    getQuestions(token);
    this.setState({ questions: dataQuestion });
  }

  async questionGenerator() {
    const { questions } = this.state;

    const perguntas = await questions;

    console.log(perguntas[0]);
  }

  render() {
    const { dataQuestion } = this.props;
    console.log(dataQuestion);
    return (
      <div>
        <Header />
        <div>
          <h1>
            Pergunta:
            {' '}
            <span />
          </h1>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state,
  token: state.login.inputLogin.token,
  dataQuestion: state.questions.dataAPI.results,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (state) => dispatch(fetchQuestion(state)) });

export default connect(mapStateToProps, mapDispatchToProps)(Game);
