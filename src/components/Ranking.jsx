import React from 'react';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        />
      </div>
    );
  }
}




Ranking.propTypes = {
  player: propTypes.shape(propTypes.object).isRequired,
  history: propTypes.shape(propTypes.object).isRequired,
};

export default Ranking;
