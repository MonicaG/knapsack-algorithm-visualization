import PropTypes from 'prop-types';

export const ItemPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired
});

export const KnapsackAlgorithmPropType = PropTypes.shape({
  items: PropTypes.arrayOf(ItemPropType).isRequired,
  capacity: PropTypes.number.isRequired,
  solutionTable: PropTypes.array.isRequired
});

export const SolutionItemsPropType = PropTypes.arrayOf(
  PropTypes.shape({
    item: ItemPropType.isRequired,
    row: PropTypes.number.isRequired,
    column: PropTypes.number.isRequired
  }));
