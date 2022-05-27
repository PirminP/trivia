import React from "react";
import Header from "./Header";
import { connect } from "react-redux";

class Feedback extends React.Component {
  render() {
    const { player } = this.props;
    const { assertions } = player;

    console.log(player);
    return (
      <div>
        <Header />
        <h1>Pagina de Feedback</h1>
        {assertions < 3 ? (<span data-testid='feedback-text' >Could be better...</span>) : (<span data-testid='feedback-text' >Well Done!</span>) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
