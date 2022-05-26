import React from 'react';
import { KnapsackAlgorithmPropType } from './helpers/PropTypesHelper'
import PropTypes from 'prop-types';
import { solutionTableActionTypes as types } from './SolutionController';
import { buildSyntaxHighlight } from './helpers/CodeBlocksCommon';
import ItemsToUseCode from '../../models/codeblock/ItemsToUseCode';
import ControlButtons from './ControlButtons';
import { TITLE_STEP_3, STEP_BTN_NAME, step3Instructions } from './helpers/constants';

function ItemsToUseCodeBlock({ knapsackAlgorithm, state, dispatch }) {

  const codeBlock = new ItemsToUseCode(state.solutionIndex, state.currentCapacity, knapsackAlgorithm);
  return (
    <div>
      <ControlButtons buttonName={STEP_BTN_NAME} buttonAction={handleButtonClick}/>
      <div className="py-2">
        {buildSyntaxHighlight(codeBlock.getCode(), codeBlock.isInSolutions(), codeBlock.getInLineNums(), codeBlock.getOutLineNums())}
      </div>
      <div className="explanation">
        <p>It is now time to find the items that fit in the knapsack. This step checks if each item fits in the knapsack, starting with the last item. It starts there because that item's last cell contains the maximum value of the knapsack.</p>
        <p>Click the <span className="italic">{STEP_BTN_NAME}</span> button to find the items. A green cell means the item fits in the knapsack for the given capacity. A grey cell means the item did  not fit.</p>
        <p>For each item, the algorithm checks if the current cell matches the previous cell's value. If it does NOT match, it means the item is part of the solution. Why? In step 1 of the algorithm the previous cell's value was copied when:</p>
        <ul className="list-disc ml-8">
          <li>the item's weight was greater than the knapsack's capacity, or</li>
          <li>the previous cell's value is greater than the item's value plus the value at any remaining capacity </li>
        </ul>
        <p>A different value means a new, greater value was calculated for the capacity. So, the item is part of the solution.</p>
        <p>If the item is part of the solution, then the capacity is set to the current capacity minus this item's weight. Why? The item may not take up the entire knapsack's capacity.  One or more items may fit in the left-over capacity. So, the next item uses the left-over capacity to see if it fits.</p>
        <p>Note: the above code snippet uses an else statement to show the case when the cell values match. The else block is here for demonstration purposes. Omit it in an actual implementation.</p>
      </div>
    </div>
  )

  function doDispatch(solutionIndex, capacity) {
    dispatch({
      type: types.STEP_FIND_NEXT_SOLUTION_ITEM,
      currentCapacity: capacity,
      solutionIndex: solutionIndex,
      title: TITLE_STEP_3,
      instructions: step3Instructions(STEP_BTN_NAME),
    });
  }

  function handleButtonClick() {
    const solutionIndex = state.solutionIndex - 1;
    let currentCapacity = state.currentCapacity;
    if (knapsackAlgorithm.solutionTable[state.solutionIndex][state.currentCapacity] !== knapsackAlgorithm.solutionTable[state.solutionIndex - 1][state.currentCapacity]) {
      currentCapacity -= knapsackAlgorithm.items[state.solutionIndex - 1].weight
    }
    doDispatch(solutionIndex, currentCapacity);
  }
}

ItemsToUseCodeBlock.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired,
  state: PropTypes.shape({
    solutionIndex: PropTypes.number.isRequired,
    currentCapacity: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default ItemsToUseCodeBlock;