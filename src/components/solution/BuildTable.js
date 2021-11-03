import PropTypes from 'prop-types';
import SolutionTableRow from './SolutionTableRow'
import React from 'react';

function BuildTable({ knapsackAlgorithm, state }) {

  function getCellIndexToHighlight(index) {
    return index === state.currentItemIndex ? state.currentCellIndex : null;
  }

  return (
    knapsackAlgorithm.solutionTable.map((row, index) => {
      const indexOffset = index - 1;
      const item = index === 0 ? null : knapsackAlgorithm.items[indexOffset]
      const highlightCellIndex = getCellIndexToHighlight(index)
      const formattedRow = row.map((element, rowIndex) => {
        return index < state.currentItemIndex || (index === state.currentItemIndex && rowIndex <= state.currentCapacity) ? element : 0;
      });
      return <SolutionTableRow
        key={item ? item.name : " "}
        cellKey={item ? item.name + "Cell" : "Cell"}
        row={formattedRow}
        item={item}
        currentCell={highlightCellIndex}
        phase={false}
      />
    })
  );
}

export default BuildTable;