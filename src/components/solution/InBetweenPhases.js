import React from 'react';
import { solutionTableActionTypes as types } from './SolutionController';
import {format} from './helpers/Formatting';
import PropTypes from 'prop-types';
import { KnapsackAlgorithmPropType } from './helpers/PropTypesHelper';
import ControlButtons from './ControlButtons';
import { TITLE_STEP_3, step3Instructions, STEP_BTN_NAME, INBETWEEN_BTN_NAME } from './helpers/constants';

function InBetweenPhases({ state, dispatch, knapsackAlgorithm }) {

  function btnClick() {
    dispatch({
      type: types.STEP_FIND_NEXT_SOLUTION_ITEM,
      currentCapacity: knapsackAlgorithm.capacity,
      solutionIndex: state.solutionIndex,
      title: TITLE_STEP_3,
      instructions: step3Instructions(STEP_BTN_NAME),
    });
  }

  return (
    <div>
      <ControlButtons buttonName={INBETWEEN_BTN_NAME} buttonAction={btnClick}/>
      <div className="explanation">
        <p>The table is now populated. Each cell contains the maximum value for the capacity and item(s) combination. The last cell contains the maximum value the knapsack can contain. In this case, it is the cell at Table[{state.currentItemIndex}][{knapsackAlgorithm.capacity}] and the value is {format(knapsackAlgorithm.solutionTable[state.currentItemIndex][knapsackAlgorithm.capacity])}.</p>
        <p>The next step of the algorithm finds the items that make up the maximum value. Click the <span className="italic">{INBETWEEN_BTN_NAME}</span> button to step through the next stage of the algorithm.</p>
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