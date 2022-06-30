import { KnapsackAlgorithmPropType } from './helpers/PropTypesHelper'
import React, { useReducer, useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import PopulateTableCodeBlock from './PopulateTableCodeBlock';
import SolutionTableRow from './SolutionTableRow';
import { getCellIdBase, getTableHeaderCellId } from './helpers/TableHelper';
import FindItemsTableState from '../../models/tablestate/FindItemsTableState';
import BuildTableState from '../../models/tablestate/BuildTableState';
import SolutionItems from './SolutionItems';
import InBetweenPhases from './InBetweenPhases';
import ItemsToUseCodeBlock from './ItemsToUseCodeBlock';
import { TITLE_STEP_2, step2Instructions, STEP_BTN_NAME } from './helpers/constants';
import Arrow from './Arrow';
import { useXarrow, Xwrapper } from 'react-xarrows';

const solutionControllerActionTypes = {
  STEP_TO_NEXT_CELL: 1,
  STEP_TO_NEXT_ROW: 2,
  STEP_TO_FIND_SOLUTION_ITEMS: 3,
  STEP_FIND_NEXT_SOLUTION_ITEM: 4,
  STEP_SHOW_ALL_SOLUTION_ITEMS: 5,
}

function SolutionController({ knapsackAlgorithm }) {

  const initialState = {
    currentItemIndex: 1,
    currentCapacity: 1,
    currentCellIndex: 1,
    findSolutionItems: false,
    solutionIndex: knapsackAlgorithm.items.length,
    title: TITLE_STEP_2,
    phase: solutionControllerActionTypes.STEP_TO_NEXT_CELL,
    instructions: step2Instructions(STEP_BTN_NAME),
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOverflow, setIsOverflow] = useState(undefined);
  const capacityRow = Array.from({ length: knapsackAlgorithm.capacity + 1 }, (e, i) => i);
  const ref = useRef(null);
  const [cellDimensions, setCellDimensions] = useState({ width: 0, height: 0 });
  const [tableHeaderCellDimensions, setTableHeaderCellDimensions] = useState({width: 0, height: 0})

  const tableState = state.findSolutionItems ? new FindItemsTableState(state, knapsackAlgorithm) : new BuildTableState(state, knapsackAlgorithm);
  const currentItem = knapsackAlgorithm.items[state.currentItemIndex - 1];
  const updateXarrow = useXarrow();

  /**
   * Get the size of the table cell so we know how much to scroll by in the useEffect logic below. 
   * See: https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
   */
  const measureCellRef = useCallback((node) => {
    if (node !== null) {
      setCellDimensions({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height });
    }
  }, []);

  const measureTableHeaderCellRef = useCallback((node) => {
    if (node !== null) {
      setTableHeaderCellDimensions({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height });
    }
  }, []);

  /** 
   * Scroll the table (if needed) when the "step" button is pressed. This is so the current cell being calculated is visible to the user.
   */
  useEffect(() => {
    const index = state.findSolutionItems ? state.currentCapacity : state.currentCellIndex;
    const itemIndex = state.findSolutionItems ? state.solutionIndex : state.currentItemIndex
    if (state.currentCellIndex === 1) {
      ref.current.scrollLeft = 0;
    } else {
      ref.current.scrollLeft = (index - 1) * cellDimensions.width;
    }
    if ((state.currentItemIndex % 2 === 0 ) || state.findSolutionItems) {
      ref.current.scrollTop = tableHeaderCellDimensions.height + (cellDimensions.height * (itemIndex - 2) ); 
    }

  }, [cellDimensions, state.currentCapacity, state.currentCellIndex, state.currentItemIndex, state.findSolutionItems, state.solutionIndex, tableHeaderCellDimensions.height]);


  /**
   * adapted from: https://www.robinwieruch.de/react-custom-hook-check-if-overflow/
   * Used to detect if the solution table is scrollable so as to display a message to ensure the user knows their data isn't truncated. They just need to scroll.
   */
  useLayoutEffect(() => {
    const { current } = ref;
    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight || current.scrollWidth > current.clientWidth;
      setIsOverflow(hasOverflow);
    };
    if (current) {
      trigger();
    }
  }, [ref]);

  function reducer(state, action) {
    switch (action.type) {
      case solutionControllerActionTypes.STEP_TO_NEXT_CELL:
        return {
          ...state,
          currentCapacity: state.currentCapacity + 1,
          currentCellIndex: state.currentCellIndex + 1,
          title: action.title,
          phase: solutionControllerActionTypes.STEP_TO_NEXT_CELL,
          instructions: action.instructions,
        }
      case solutionControllerActionTypes.STEP_TO_NEXT_ROW:
        return {
          ...state,
          currentItemIndex: state.currentItemIndex + 1,
          currentCapacity: 1,
          currentCellIndex: 1,
          title: action.title,
          phase: solutionControllerActionTypes.STEP_TO_NEXT_ROW,
          instructions: action.instructions,
        };
      case solutionControllerActionTypes.STEP_TO_FIND_SOLUTION_ITEMS:
        return {
          ...state,
          findSolutionItems: true,
          currentCapacity: knapsackAlgorithm.capacity,
          title: action.title,
          phase: solutionControllerActionTypes.STEP_TO_FIND_SOLUTION_ITEMS,
          instructions: action.instructions,
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
          title: action.title,
          phase: tempPhase,
          instructions: tempPhase === solutionControllerActionTypes.STEP_FIND_NEXT_SOLUTION_ITEM ? action.instructions : "",
        }
      default:
        //@todo should default do something else?
        throw new Error();
    }
  }

  function getComponent() {
    switch (state.phase) {
      case solutionControllerActionTypes.STEP_TO_NEXT_CELL:
      case solutionControllerActionTypes.STEP_TO_NEXT_ROW:
        return <PopulateTableCodeBlock knapsackAlgorithm={knapsackAlgorithm} state={state} dispatch={dispatch} />
      case solutionControllerActionTypes.STEP_TO_FIND_SOLUTION_ITEMS:
        return <InBetweenPhases state={state} dispatch={dispatch} knapsackAlgorithm={knapsackAlgorithm} />
      case solutionControllerActionTypes.STEP_FIND_NEXT_SOLUTION_ITEM:
        return <ItemsToUseCodeBlock knapsackAlgorithm={knapsackAlgorithm} state={state} dispatch={dispatch} />
      case solutionControllerActionTypes.STEP_SHOW_ALL_SOLUTION_ITEMS:
        return <SolutionItems solutionItems={knapsackAlgorithm.solutionItems} />
      default:
        return <PopulateTableCodeBlock knapsackAlgorithm={knapsackAlgorithm} state={state} dispatch={dispatch} />
    }
  }
  return (
    <div>
      <h2 className="title">{state.title}</h2>
      <p className="table-instructions">{state.instructions}</p>
      {isOverflow ? <p className="table-instructions">Note: The table is scrollable.</p> : ""}
      <Xwrapper>
      <div className="overflow-x-auto overflow-y-auto h-72 sm:h-80 2xl:h-fit" ref={ref}  onScroll={updateXarrow}>
        <table className="table-auto px-10 py-3 w-full">
          <thead>
            <tr>
              <th className="header"></th>
              {capacityRow.map((cell, index) => {
                const id = getTableHeaderCellId(index);
                return <th id={id} key={id} className="header">
                  {/* Make all the cells the size of the length of the longest value in the table. This is because at the start all 0 are shown. But if a cell contains a value with multiple digits the cells width changes
                    (from 1 digit to 3 digits for example), which causes a jumping motion in the table as it expands the cell. So, make all the cells the max width at the start to avoid this behaviour.
                  */}
                    <div className="relative"><div className='z-1 invisible'>{knapsackAlgorithm.maxLengthItem}</div>
                    <div className="absolute text-center inset-x-0 inset-y-0" aria-label="capacity value">{cell}</div></div>
                </th>
              })}
            </tr>
          </thead>
          <tbody>
            {knapsackAlgorithm.solutionTable.map((row, index) => {
              const indexOffset = index - 1;
              const item = index === 0 ? null : knapsackAlgorithm.items[indexOffset]
              const highlightCell = tableState.getCellToHighLightAndCSS(index)
              const formattedRow = tableState.getFormattedRow(row, index);
              const cellIdBase = getCellIdBase(item);
              const measurer = index === 0 ? measureTableHeaderCellRef : measureCellRef
              return <SolutionTableRow
                key={item ? item.id : " "}
                cellKey={cellIdBase}
                row={formattedRow}
                item={item}
                highlightcells={highlightCell}
                currentItem={currentItem}
                measureCellRef={measurer}
                rowIndex={indexOffset}
              />
            })}
          </tbody>
        </table>
        {state.findSolutionItems ? null : <Arrow knapsackAlgorithm={knapsackAlgorithm} state={state} solutionTableRef={ref} />}
      </div>
      </Xwrapper>
      {getComponent()}
    </div>
  );
};

SolutionController.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired
};

export default SolutionController;
export { solutionControllerActionTypes as solutionTableActionTypes, TITLE_STEP_2 };