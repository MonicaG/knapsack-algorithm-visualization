import PropTypes from 'prop-types';

function SolutionTableRow({ cellKey, row, firstCellValue, useIndex }) {
  return (
    <tr>
      <td>{firstCellValue}</td>
      {row.map((cell, index) => (<td key={cellKey + index}>{useIndex ? index : cell}</td>))}
    </tr>
  );
};


SolutionTableRow.propTypes = {
  cellKey: PropTypes.string.isRequired,
  row: PropTypes.arrayOf(PropTypes.number).isRequired,
  firstCellValue: PropTypes.string,
  useIndex: PropTypes.bool.isRequired,
};
export default SolutionTableRow;