import PropTypes from 'prop-types';

function SolutionTableRow({ cellKey, row, firstCellValue, selectedColumnIndex, currentCell }) {
  return (
    <tr>
      <td>{firstCellValue}</td>
      {row.map((cell, index) => { 
         const chosenCSS = index === selectedColumnIndex ? "ChosenItem" : ""; 
         const currentCSS = index === currentCell ? "CurrentCell" : "";
         return <td key={cellKey + index} className={`${chosenCSS} ${currentCSS}`}>{cell}</td>
      })}
    </tr>
  );
};


SolutionTableRow.propTypes = {
  cellKey: PropTypes.string.isRequired,
  row: PropTypes.arrayOf(PropTypes.number).isRequired,
  firstCellValue: PropTypes.string,
};
export default SolutionTableRow;