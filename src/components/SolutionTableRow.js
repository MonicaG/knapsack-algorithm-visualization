import PropTypes from 'prop-types';

function SolutionTableRow({ cellKey, row, item, selectedColumnIndex, currentCell }) {
  return (
    <tr>
    {item ? 
      <td>
        {item.name} <br/>
        (V: {item.value} W: {item.weight})
      </td>
    :
    <td> </td>
    }
      <td>
      {item ? item.name : " "}
      </td>
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
  item: PropTypes.object
};
export default SolutionTableRow;