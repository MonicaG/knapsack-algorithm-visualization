import { KnapsackAlgorithmPropType } from './helpers/PropTypesHelper'
import React, { useReducer, useRef, useEffect } from 'react';
import DisplayTablePopulationCodeBlock from './DisplayTablePopulationCodeBlock';
import SolutionTableRow from './SolutionTableRow';
import SolutionItemsTableInfo from './SolutionItemsTableInfo';
import SolutionTableHeaderRow from './SolutionTableHeaderRow';
import FindItemsTableState from '../../models/tablestate/FindItemsTableState';
import BuildTableState from '../../models/tablestate/BuildTableState';
import SolutionItems from './SolutionItems';
import InBetweenPhases from './InBetweenPhases';


const TITLE_STEP_2 = "Step 2: Build Table";
const TITLE_STEP_3 = "Step 3: Find Solution";

const solutionControllerActionTypes = {
  STEP_TO_NEXT_CELL: 1,
  STEP_TO_NEXT_ROW: 2,
  STEP_TO_FIND_SOLUTION_ITEMS: 3,
  STEP_FIND_NEXT_SOLUTION_ITEM: 4,
  CELL_DIMENSIONS: 5,
  STEP_SHOW_ALL_SOLUTION_ITEMS: 6,
}

function SolutionController({ knapsackAlgorithm }) {

  const initialState = {
    currentItemIndex: 1,
    currentCapacity: 1,
    currentCellIndex: 1,
    findSolutionItems: false,
    solutionIndex: knapsackAlgorithm.items.length,
    title: TITLE_STEP_2,
    cellDimensions: new Array(knapsackAlgorithm.capacity + 1).fill({ width: 0, height: 0 }),
    phase: solutionControllerActionTypes.STEP_TO_NEXT_CELL
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const capacityRow = Array.from({ length: knapsackAlgorithm.capacity + 1 }, (e, i) => i);
  const ref = useRef(null);
  const tableState = state.findSolutionItems ? new FindItemsTableState(state, knapsackAlgorithm) : new BuildTableState(state)

  function summation(prevValue, curValue) {
    return prevValue + curValue.width
  }
  useEffect(() => {
    const rowName = state.cellDimensions[0]
    const index = state.findSolutionItems ? state.currentCapacity : state.currentCellIndex;
    const itemIndex = state.findSolutionItems ? state.solutionIndex : state.currentItemIndex
    if (state.currentCellIndex === 1) {
      ref.current.scrollLeft = 0;
    } else {
      ref.current.scrollLeft = state.cellDimensions.slice(0, index + 1).reduce(summation, 0) + state.cellDimensions[index].width
    }
    if (state.currentItemIndex > 1 || state.findSolutionItems) {
      ref.current.scrollTop = rowName.height * itemIndex
    }

  }, [state.cellDimensions, state.currentCapacity, state.currentCellIndex, state.currentItemIndex, state.findSolutionItems, state.solutionIndex]);

  function reducer(state, action) {
    switch (action.type) {
      case solutionControllerActionTypes.STEP_TO_NEXT_CELL:
        return {
          ...state,
          currentCapacity: state.currentCapacity + 1,
          currentCellIndex: state.currentCellIndex + 1,
          title: TITLE_STEP_2,
          phase: solutionControllerActionTypes.STEP_TO_NEXT_CELL,
        }
      case solutionControllerActionTypes.STEP_TO_NEXT_ROW:
        return {
          ...state,
          currentItemIndex: state.currentItemIndex + 1,
          currentCapacity: 1,
          currentCellIndex: 1,
          title: TITLE_STEP_2,
          phase: solutionControllerActionTypes.STEP_TO_NEXT_ROW,
        };
      case solutionControllerActionTypes.STEP_TO_FIND_SOLUTION_ITEMS:
        return {
          ...state,
          findSolutionItems: true,
          currentCapacity: knapsackAlgorithm.capacity,
          title: TITLE_STEP_3,
          phase: solutionControllerActionTypes.STEP_TO_FIND_SOLUTION_ITEMS,
        }
      case solutionControllerActionTypes.STEP_FIND_NEXT_SOLUTION_ITEM:
        let tempPhase = solutionControllerActionTypes.STEP_FIND_NEXT_SOLUTION_ITEM;
        if (state.solutionIndex <= 1) {
          tempPhase = solutionControllerActionTypes.STEP_SHOW_ALL_SOLUTION_ITEMS;
        }
        return {
          ...state,
          solutionIndex: action.solutionIndex,
          currentCapacity: action.currentCapacity,
          title: TITLE_STEP_3,
          phase: tempPhase,
        }
      case solutionControllerActionTypes.CELL_DIMENSIONS:
        return {
          ...state,
          cellDimensions: action.cellDimensions,
        }
      default:
        //@todo should default do something else?
        throw new Error();
    }
  }

  function getComponent() {
    switch(state.phase) {
      case solutionControllerActionTypes.STEP_TO_NEXT_CELL: 
      case solutionControllerActionTypes.STEP_TO_NEXT_ROW: 
        return  <DisplayTablePopulationCodeBlock knapsackAlgorithm={knapsackAlgorithm} state={state} dispatch={dispatch}/>
      case solutionControllerActionTypes.STEP_TO_FIND_SOLUTION_ITEMS: 
        return <InBetweenPhases state={state} dispatch={dispatch} capacity={knapsackAlgorithm.capacity}/>
      case solutionControllerActionTypes.STEP_FIND_NEXT_SOLUTION_ITEM:
        return  <SolutionItemsTableInfo knapsackAlgorithm={knapsackAlgorithm} state={state} dispatch={dispatch}/>
      case solutionControllerActionTypes.STEP_SHOW_ALL_SOLUTION_ITEMS:
        return <SolutionItems solutionItems={knapsackAlgorithm.solutionItems}/>
      default:
        return <DisplayTablePopulationCodeBlock knapsackAlgorithm={knapsackAlgorithm} state={state} dispatch={dispatch}/>
    }
  }

  return (
    <div>
      <h2 className="title">{state.title}</h2>
      <div className="overflow-x-auto overflow-y-auto h-72 sm:h-96" ref={ref}>
        <table className="table-auto px-10 py-3 w-full">
          <SolutionTableHeaderRow
            cellKey="capacityRowCell"
            row={capacityRow}
            state={state}
            dispatch={dispatch}
          />
          <tbody>
            {knapsackAlgorithm.solutionTable.map((row, index) => {
              const indexOffset = index - 1;
              const item = index === 0 ? null : knapsackAlgorithm.items[indexOffset]
              const highlightCell = tableState.getCellToHighLightAndCSS(index)
              const formattedRow = tableState.getFormattedRow(row, index);
              return <SolutionTableRow
                key={item ? item.id : " "}
                cellKey={item ? item.id : "Cell"}
                row={formattedRow}
                item={item}
                currentCell={highlightCell.column}
                currentCellCSS={highlightCell.css}
              />
            })}
          </tbody>
        </table>
      </div>
        {
          getComponent()
          /* state.findSolutionItems === false ?
        <BuildTableInfo
          knapsackAlgorithm={knapsackAlgorithm}
          state={state}
          dispatch={dispatch}
        /> :
        <SolutionItemsTableInfo
          knapsackAlgorithm={knapsackAlgorithm}
          state={state}
          dispatch={dispatch}
        /> */
        }
    </div>
  );
};

SolutionController.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired
};

export default SolutionController;
export { solutionControllerActionTypes as solutionTableActionTypes, TITLE_STEP_2 };