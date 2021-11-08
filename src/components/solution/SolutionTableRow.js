import PropTypes from 'prop-types';
import {ItemPropType} from './helpers/proptypes'

function SolutionTableRow({ cellKey, row, item, currentCell, cssClassName }) {
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
        const currentCSS = index === currentCell ? cssClassName : "";
        return <td key={cellKey + index} className={`${currentCSS}`}>{cell}</td>
      })}
    </tr>
  );
};


SolutionTableRow.propTypes = {
  cellKey: PropTypes.string.isRequired,
  row: PropTypes.arrayOf(PropTypes.number).isRequired,
  item: ItemPropType
};
export default SolutionTableRow;