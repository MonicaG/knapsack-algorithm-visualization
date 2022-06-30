import PropTypes from 'prop-types';
import { ItemPropType, TableStateReturnValue } from './helpers/PropTypesHelper'
import { getCellId } from './helpers/TableHelper';
import { format } from './helpers/Formatting';
import { useCallback } from 'react';
import { CellType } from './../../models/tablestate/TableStateReturnValue'

function SolutionTableRow({ cellKey, row, item, highlightcells, currentItem, measureCellRef, rowIndex }) {

  const mutedCSS = "muted";

  function shouldDisplayValue(index, cell) {
    return (cell && cell.column === index && cell.type === CellType.contributingCellLeftOverCapacity)
  }
  const getCell = useCallback((index) => {
    if (highlightcells !== null) {
      if (Array.isArray(highlightcells)) {
        let cells = highlightcells.filter(x => x.column === index);
        if (cells.length === 1) {
          return cells[0];
        }
      } else {
        return highlightcells;
      }
    }
    return null;
  }, [highlightcells])



  function getCSS(index, cell) {
    if (cell && cell.column === index) {
      let css = cell.css;
      if (index === 0) {
        css = `${mutedCSS} ${css}`
      }
      return css;
    } else if (!item || index === 0) {
      return mutedCSS;
    } else {
      return "";
    }
  }
  return (
    <tr>
      {item ?
        <td className="cell">
          <span className="whitespace-nowrap">{item.name}</span>
          <div className="whitespace-nowrap">
            (v: {item.value} w: {item.weight})
          </div>
        </td>
        :
        <td className="cell" ref={measureCellRef}></td>
      }
      {row.map((cell, index) => {
        const id = getCellId(cellKey, index);
        const hightlightCell = getCell(index)
        const currentCSS = getCSS(index, hightlightCell);
        const displayValue = shouldDisplayValue(index, hightlightCell);
        const value = format(cell);
        return (
          <td id={id} key={id} className={`cell ${currentCSS}`}  ref={rowIndex === 1 && index === 1 ? measureCellRef : null}>
            {displayValue ?
              <div className="relative">
                <span>{value}</span>
                <div className="absolute -top-4 -right-2 text-sm">{currentItem ? `+${currentItem.value}` : ""}</div>
              </div>
              :
              `${value}`
            }
          </td>)
      })}
    </tr>
  );
};


SolutionTableRow.propTypes = {
  cellKey: PropTypes.string.isRequired,
  row: PropTypes.arrayOf(PropTypes.number).isRequired,
  item: ItemPropType,
  highlightcells: PropTypes.oneOfType([TableStateReturnValue, PropTypes.arrayOf(TableStateReturnValue)]),
  currentItem: ItemPropType,
  measureCellRef: PropTypes.func,
  rowIndex: PropTypes.number,
};
export default SolutionTableRow;