import PropTypes from 'prop-types';
import SolutionTableRow from './SolutionTableRow';
import React, { useReducer } from 'react';
import BuildTable from './BuildTable';
import SolutionItemsTable from './SolutionItemsTable';
import BuildTableInfo from './BuildTableInfo';
import SolutionItemsTableInfo from './SolutionItemsTableInfo';


const solutionTableActionTypes = {
  STEP_TO_NEXT_CELL: 1,
  STEP_TO_NEXT_ROW: 2,
  STEP_TO_FIND_SOLUTION_ITEMS: 3,
  STEP_FIND_NEXT_SOLUTION_ITEM: 4,
}

function SolutionTable({ knapsackAlgorithm }) {

  const initialState = {
    currentItemIndex: 1,
    currentCapacity: 1,
    currentCellIndex: 1,
    findSolutionItems: false,
    solutionItems: [],
    solutionIndex: knapsackAlgorithm.items.length
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const capacityRow = Array.from({ length: knapsackAlgorithm.capacity + 1 }, (e, i) => i);


  function reducer(state, action) {
    switch (action.type) {
      case solutionTableActionTypes.STEP_TO_NEXT_CELL:
        return {
          ...state,
          currentCapacity: state.currentCapacity + 1,
          currentCellIndex: state.currentCellIndex + 1
        }
      case solutionTableActionTypes.STEP_TO_NEXT_ROW:
        return {
          ...state,
          currentItemIndex: state.currentItemIndex + 1,
          currentCapacity: 1,
          currentCellIndex: 1
        };
      case solutionTableActionTypes.STEP_TO_FIND_SOLUTION_ITEMS:
        return {
          ...state,
          findSolutionItems: true,
          currentCapacity: knapsackAlgorithm.capacity
        }
      case solutionTableActionTypes.STEP_FIND_NEXT_SOLUTION_ITEM:
        let theState = {
          ...state,
          solutionIndex: state.solutionIndex - 1,
          currentCapacity: action.payload.currentCapacity
        }

        if(action.payload.newItem) {
          theState = {
            ...theState,
            solutionItems: [...state.solutionItems, action.payload.newItem]
          }
        }
        return theState;
      default:
        //@todo should default do something else?
        throw new Error();
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

          {state.findSolutionItems === false ?
            <BuildTable
              knapsackAlgorithm={knapsackAlgorithm}
              state={state}
            /> :
            <SolutionItemsTable
              knapsackAlgorithm={knapsackAlgorithm}
              state={state}
            />
          }
        </tbody>
      </table>
      {state.findSolutionItems === false ?
        <BuildTableInfo
          knapsackAlgorithm={knapsackAlgorithm}
          state={state}
          dispatch={dispatch}
        /> :
        <SolutionItemsTableInfo
          knapsackAlgorithm={knapsackAlgorithm}
          state={state}
          dispatch={dispatch}
        />
      }
    </div>
  );
};

SolutionTable.propTypes = {
  knapsackAlgorithm: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired
    })).isRequired,
    capacity: PropTypes.number.isRequired,
  }).isRequired
};

export default SolutionTable;
export { solutionTableActionTypes };