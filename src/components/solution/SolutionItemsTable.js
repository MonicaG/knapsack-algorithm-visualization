import PropTypes from 'prop-types';
import {KnapsackAlgorithmPropType} from './helpers/PropTypesHelper'
import SolutionTableRow from './SolutionTableRow';
import React from 'react';
import { solutionTableActionTypes as types } from './SolutionController';

class RetValue {
  constructor(column, css) {
    this.column = column;
    this.css = css;
  }
}

function SolutionItemsTable({ knapsackAlgorithm, state }) {
  
  function getCellToHighLightAndCSS(index) {
    if(state.phase === types.STEP_TO_FIND_SOLUTION_ITEMS) {
      return new RetValue(null, null);
    }
    let item = knapsackAlgorithm.solutionItems.filter( x => x.column >= state.currentCapacity && x.row === index && x.row >= state.solutionIndex)
    if(item && item.length === 1) {
      const css = item[0].inSolution ? "bg-lime-300" : "bg-gray-200"
      return new RetValue(item[0].column, css);
    }
    return new RetValue(null, null)
  }

  return (

    knapsackAlgorithm.solutionTable.map((row, index) => {
      const indexOffset = index - 1;
      const item = index === 0 ? null : knapsackAlgorithm.items[indexOffset]
      const highlightCell = getCellToHighLightAndCSS(index)
      return <SolutionTableRow
        key={item ? item.id : " "}
        cellKey={item ? item.id : "Cell"}
        row={row}
        item={item}
        currentCell={highlightCell.column}
        currentCellCSS={highlightCell.css}
      />
    })
  );
}

SolutionItemsTable.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired,
 state: PropTypes.shape({
  currentCapacity: PropTypes.number.isRequired,
  solutionIndex: PropTypes.number.isRequired,
})};

export default SolutionItemsTable;