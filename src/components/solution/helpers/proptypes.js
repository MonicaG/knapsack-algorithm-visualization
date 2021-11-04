import PropTypes from 'prop-types';
export const knapsackAlgorithmPropType = {
  knapsackAlgorithm: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired
    })).isRequired,
    capacity: PropTypes.number.isRequired,
    solutionTable: PropTypes.array.isRequired
  }).isRequired
};

export const solutionItemsPropType = {
  solutionItems: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired
    }).isRequired,
      row: PropTypes.number.isRequired,
      column: PropTypes.number.isRequired
  })).isRequired
};
