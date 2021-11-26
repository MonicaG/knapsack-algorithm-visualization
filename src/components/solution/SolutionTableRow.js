import PropTypes from 'prop-types';
import {ItemPropType} from './helpers/PropTypesHelper'
import {getCellId} from './helpers/TableHelper';

function SolutionTableRow({ cellKey, row, item, currentCell }) {
  return (
    <tr>
      {item ?
        <td className="cell">
          {item.name} <br />
          (V: {item.value} W: {item.weight})
        </td>
        :
        <td className="cell"> </td>
      }
      {row.map((cell, index) => {
        const currentCSS = index === currentCell ? "border-double border-red-900 cell" : "cell";
        const id = getCellId(cellKey, index);
        return <td id={id} key={id} className={`${currentCSS}`}>{cell}</td>
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