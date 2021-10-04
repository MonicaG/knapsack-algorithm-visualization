import PropTypes from 'prop-types';
import SolutionTableRow from './SolutionTableRow';
import TablePopulationPseudoCode from './TablePopulationPseudoCode';
import React, { useReducer } from 'react';
import ItemsToUsePseudoCode from './ItemsToUsePseudoCode';


const types = {
  STEP_TO_NEXT_CELL: 1,
  STEP_TO_NEXT_ROW: 2,
  STEP_TO_NEXT_SOLUTION_ITEM: 3, 
}

const initialState = {
  currentItemIndex: 1,
  currentCapacity: 1,
  currentCellIndex: 1,
  currentSolutionItemIndex: -1
}

function SolutionTable({ knapsackAlgorithm }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const capacityRow = Array.from({ length: knapsackAlgorithm.capacity + 1 }, (e, i) => i);

  function getType() {
    if (state.currentCapacity === knapsackAlgorithm.capacity) {
      if(state.currentItemIndex  >= knapsackAlgorithm.items.length) {
        return types.STEP_TO_NEXT_SOLUTION_ITEM
      }else {
        return types.STEP_TO_NEXT_ROW
      }
    }else {
      return types.STEP_TO_NEXT_CELL
    }
  }

  function reducer(state, action) {
    switch (action.type) {
      case types.STEP_TO_NEXT_CELL :
        return { 
          ...state, 
          currentCapacity: state.currentCapacity + 1,
          currentCellIndex: state.currentCellIndex + 1
        }
      case types.STEP_TO_NEXT_ROW :
        return { 
          ...state, 
          currentItemIndex: state.currentItemIndex + 1,
          currentCapacity: 1,
          currentCellIndex: 1
        };
      case types.STEP_TO_NEXT_SOLUTION_ITEM :
        return {
          ...state,
          currentSolutionItemIndex: state.currentSolutionItemIndex + 1,
        }
      default: 
        //@todo should default do something else?
        throw new Error();
    }
  }

  function isInFindSolutionItemsStep() {
    return state.currentSolutionItemIndex >= 0;
  }

  function getCellIndexToHighlight(index) {
    if(isInFindSolutionItemsStep()) {
      const item = knapsackAlgorithm.solutionItems[state.currentSolutionItemIndex]
      return item ? (index-1) === item.row ? item.column : null
                  : null;
    }else {
      return index === state.currentItemIndex ? state.currentCellIndex : null;
    }
    
  }

  return (
    <div className="SolutionTable">
      <table border="1">
        <tbody>
          <SolutionTableRow
            cellKey="capacityRowCell"
            row={capacityRow}
          />

          {knapsackAlgorithm.solutionTable.map((row, index) => {
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
              phase={isInFindSolutionItemsStep()}
            />
          })}
        </tbody>
      </table>
      <input type="button" value="Step" onClick={ () => dispatch({type: getType()}) } />
      <div>
        <p>current capacity is: {state.currentCapacity}</p>
        <p>current item Index is: {state.currentItemIndex}</p>
        {isInFindSolutionItemsStep() ?
        <ItemsToUsePseudoCode
          solutionItems={knapsackAlgorithm.solutionItems}
          index={state.currentSolutionItemIndex}
        />
        :
        <TablePopulationPseudoCode
            item={knapsackAlgorithm.items[state.currentItemIndex - 1]}
            capacity={state.currentCapacity}
            index={state.currentItemIndex}
            solutionTable={knapsackAlgorithm.solutionTable}
          />
        }
      </div>
    </div>
  );
};

SolutionTable.propTypes = {
  knapsackAlgorithm: PropTypes.shape({   
     items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired})).isRequired,
      capacity: PropTypes.number.isRequired,
}).isRequired};

export default SolutionTable;