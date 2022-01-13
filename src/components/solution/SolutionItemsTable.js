import PropTypes from 'prop-types';
import {KnapsackAlgorithmPropType, SolutionItemsPropType} from './helpers/PropTypesHelper'
import SolutionTableRow from './SolutionTableRow';
import React from 'react';
import { solutionTableActionTypes as types } from './SolutionController';

function SolutionItemsTable({ knapsackAlgorithm, state }) {
  
  function getCellToHighLight(index) {
    if(state.phase === types.STEP_TO_FIND_SOLUTION_ITEMS) {
      return null;
    }
    return index === state.solutionIndex && index > 0 ? state.currentCapacity : null;
  }

  function getCSS() {
    let item = knapsackAlgorithm.solutionItems.filter( x => x.column === state.currentCapacity && x.row === state.solutionIndex)
    if(item && item.length === 1) {
      return item[0].inSolution ? "bg-lime-300" : "bg-gray-200"
    }
    return ""
  }
  return (

    knapsackAlgorithm.solutionTable.map((row, index) => {
      const indexOffset = index - 1;
      const item = index === 0 ? null : knapsackAlgorithm.items[indexOffset]
      return <SolutionTableRow
        key={item ? item.id : " "}
        cellKey={item ? item.id : "Cell"}
        row={row}
        item={item}
        currentCell={getCellToHighLight(index)}
        currentCellCSS={getCSS()}
      />
    })
  );
}

SolutionItemsTable.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired,
 state: PropTypes.shape({
  solutionItems: SolutionItemsPropType.isRequired,
})};

export default SolutionItemsTable;