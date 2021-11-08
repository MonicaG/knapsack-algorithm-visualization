import PropTypes from 'prop-types';
import {KnapsackAlgorithmPropType, SolutionItemsPropType} from './helpers/proptypes'
import SolutionTableRow from './SolutionTableRow';
import React from 'react';

function SolutionItemsTable({ knapsackAlgorithm, state }) {
  //@todo - fix this to get cells to highlight
  function getCellToHighLight(index) {
    return index === state.solutionIndex && index > 0 ? state.currentCapacity : null;
  }
  return (

    knapsackAlgorithm.solutionTable.map((row, index) => {
      const indexOffset = index - 1;
      const item = index === 0 ? null : knapsackAlgorithm.items[indexOffset]
      return <SolutionTableRow
        key={item ? item.name : " "}
        cellKey={item ? item.name + "Cell" : "Cell"}
        row={row}
        item={item}
        currentCell={getCellToHighLight(index)}
        cssClassName={"ChosenItem"}
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