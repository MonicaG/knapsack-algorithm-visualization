import React from 'react';
import { solutionTableActionTypes as types } from './SolutionController';
import {format} from './helpers/Formatting';
import PropTypes from 'prop-types';
import { KnapsackAlgorithmPropType } from './helpers/PropTypesHelper';

function InBetweenPhases({ state, dispatch, knapsackAlgorithm }) {

  const btnName = "Find Solution Items";
  function btnClick() {
    dispatch({
      type: types.STEP_FIND_NEXT_SOLUTION_ITEM,
      currentCapacity: knapsackAlgorithm.capacity,
      solutionIndex: state.solutionIndex,
    });
  }

  return (
    <div>
      <input type="button" className="btnBlue" value={btnName} onClick={btnClick} />
      <div className="explanation">
        <p>The table is now populated. Each cell contains the maximum value for the capacity and item(s) combination. The last cell contains the maximum value the knapsack can contain. In this case, it is the cell at Table[{state.currentItemIndex}][{knapsackAlgorithm.capacity}] and the value is {format(knapsackAlgorithm.solutionTable[state.currentItemIndex][knapsackAlgorithm.capacity])}.</p>
        <p>The next step of the algorithm finds the items that make up the maximum value. Click the <span className="italic">{btnName}</span> button to step through the next stage of the algorithm.</p>
      </div>
    </div>
  );
}

InBetweenPhases.propTypes = {
  state: PropTypes.shape({
    currentItemIndex: PropTypes.number.isRequired,
    solutionIndex: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired,
};

export default InBetweenPhases;