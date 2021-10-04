import PropTypes from 'prop-types';

function SolutionTableRow({ cellKey, row, item, currentCell, phase }) {
  return (
    <tr>
      {item ?
        <td>
          {item.name} <br />
          (V: {item.value} W: {item.weight})
        </td>
        :
        <td> </td>
      }
      {row.map((cell, index) => {
        let css = 'CurrentCell'
        if(phase) {
          css = 'ChosenItem'
        }
        const currentCSS = index === currentCell ? css : "";
        return <td key={cellKey + index} className={`${currentCSS}`}>{cell}</td>
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