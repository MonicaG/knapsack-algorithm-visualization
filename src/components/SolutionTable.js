import PropTypes from 'prop-types';
import SolutionTableRow from './SolutionTableRow';
import TablePopulationPseudoCode from './TablePopulationPseudoCode';
import React, { useReducer } from 'react';
import ItemsToUsePseudoCode from './ItemsToUsePseudoCode';


const types = {
  STEP_TO_NEXT_CELL: 1,
  STEP_TO_NEXT_ROW: 2,
}

const initialState = {
  currentItemIndex: 1,
  currentCapacity: 1,
  currentCellIndex: 1,
}

function SolutionTable({ knapsackAlgorithm }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const capacityRow = Array.from({ length: knapsackAlgorithm.capacity + 1 }, (e, i) => i);

  function getType() {
    return state.currentCapacity === knapsackAlgorithm.capacity ? types.STEP_TO_NEXT_ROW : types.STEP_TO_NEXT_CELL
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

          {knapsackAlgorithm.solutionTable.map((row, index) => {
            const indexOffset = index - 1;
            const item = index === 0 ? null : knapsackAlgorithm.items[indexOffset]
            const highlightCellIndex = index === state.currentItemIndex ? state.currentCellIndex : null;
            const formattedRow = row.map((element, rowIndex) => {
              return index < state.currentItemIndex || (index === state.currentItemIndex && rowIndex <= state.currentCapacity) ? element : 0;
            });
            return <SolutionTableRow
              key={item ? item.name : " "}
              cellKey={item ? item.name + "Cell" : "Cell"}
              row={formattedRow}
              item={item}
              currentCell={highlightCellIndex}
            />
          })}
        </tbody>
      </table>
      <input type="button" value="Step" onClick={ () => dispatch({type: getType()}) } />
      <div>
        <p>current capacity is: {state.currentCapacity}</p>
        <p>current item Index is: {state.currentItemIndex}</p>
        {state.currentItemIndex > knapsackAlgorithm.items.length ?
        <ItemsToUsePseudoCode/>
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