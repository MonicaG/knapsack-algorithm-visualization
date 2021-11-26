import PropTypes from 'prop-types';
import {KnapsackAlgorithmPropType, SolutionItemsPropType} from './helpers/PropTypesHelper'
import SolutionTableRow from './SolutionTableRow';
import React from 'react';

function SolutionItemsTable({ knapsackAlgorithm, state }) {
  
  function getCellToHighLight(index) {
    return index === state.solutionIndex && index > 0 ? state.currentCapacity : null;
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