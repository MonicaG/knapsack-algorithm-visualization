import PropTypes from 'prop-types';
import {ItemPropType} from './helpers/PropTypesHelper'
import {getCellId} from './helpers/TableHelper';
import {format} from './helpers/Formatting';

function SolutionTableRow({ cellKey, row, item, currentCell, currentCellCSS }) {
  return (
    <tr>
      {item ?
        <td className="cell">
          <span className="whitespace-nowrap">{item.name}</span>
          <div className="whitespace-nowrap">
            (V: {item.value} W: {item.weight})
          </div>
        </td>
        :
        <td className="cell"> </td>
      }
      {row.map((cell, index) => {
        const currentCSS = index === currentCell ? currentCellCSS: ""
        const id = getCellId(cellKey, index);
        const value = format(cell);
        return <td id={id} key={id} className={`cell ${currentCSS}`}>{value}</td>
      })}
    </tr>
  );
};


SolutionTableRow.propTypes = {
  cellKey: PropTypes.string.isRequired,
  row: PropTypes.arrayOf(PropTypes.number).isRequired,
  item: ItemPropType,
  currentCell: PropTypes.number,
  currentCellCSS: PropTypes.string,

};
export default SolutionTableRow;