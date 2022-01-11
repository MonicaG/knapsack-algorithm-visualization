import PropTypes from 'prop-types';
import {ItemPropType} from './helpers/PropTypesHelper'
import {getCellId} from './helpers/TableHelper';

function SolutionTableRow({ cellKey, row, item, currentCell }) {
  const MAX_DECIMAL_NUMS = 2
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
        const currentCSS = index === currentCell ? "border-double border-red-900 cell" : "cell";
        const id = getCellId(cellKey, index);
        // num formatting from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
        const value = new Intl.NumberFormat('en-US', {useGrouping: false, maximumFractionDigits: MAX_DECIMAL_NUMS}).format(cell)
        return <td id={id} key={id} className={`${currentCSS}`}>{value}</td>
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