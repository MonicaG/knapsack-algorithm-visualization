import PropTypes from 'prop-types';
import { KnapsackAlgorithmPropType } from './helpers/PropTypesHelper'
import React from 'react';
import { solutionTableActionTypes as types } from './SolutionController';
import { buildSyntaxHighlight } from './helpers/CodeBlocksCommon'
import PopulateTableCode from '../../models/codeblock/PopulateTableCode';
import {format} from './helpers/Formatting';
import ControlButtons from './ControlButtons';
import { TITLE_STEP_2, step2Instructions, STEP_BTN_NAME, INBETWEEN_BTN_NAME, stepBetweenInstructions } from './helpers/constants';

function PopulateTableCodeBlock({ knapsackAlgorithm, state, dispatch }) {

  const codeBlock = new PopulateTableCode(knapsackAlgorithm.items[state.currentItemIndex - 1], state.currentCapacity, state.currentItemIndex, knapsackAlgorithm.solutionTable);
  function getType() {
    if (state.currentCapacity === knapsackAlgorithm.capacity) {
      if (state.currentItemIndex >= knapsackAlgorithm.items.length) {
        return types.STEP_TO_FIND_SOLUTION_ITEMS;
      } else {
        return types.STEP_TO_NEXT_ROW;
      }
    } else {
      return types.STEP_TO_NEXT_CELL;
    }
  }

  function btnClick() {
    const type = getType();
    dispatch({ type: type, 
      title: TITLE_STEP_2,
      instructions: type === types.STEP_TO_FIND_SOLUTION_ITEMS ? stepBetweenInstructions(INBETWEEN_BTN_NAME) : step2Instructions(STEP_BTN_NAME)
     });
  }
  return (
    <div>
      <ControlButtons buttonName={STEP_BTN_NAME} buttonAction={btnClick}/>
      <div className='py-2'>
        {buildSyntaxHighlight(codeBlock.getCode(), codeBlock.isInSolutions(), codeBlock.getInLineNums(), codeBlock.getOutLineNums())}
      </div>
      <div className="explanation">
        <p>This phase builds the dynamic table. In this visualization the process is done in a step by step process. Pressing the "{STEP_BTN_NAME}" button will calculate the next cell's value. That value will be the maximum value for the current knapsack capacity. The highlighted code is the logic used to calculate the value.</p>
        <p>In this implementation, the first column and row contain zeros. This is a coding convenience to avoid checking for index out of bounds errors.</p>
        <p>The algorithm does the following:</p>
        <ul className="list-disc ml-8">
          <li>Checks if the item will fit in the knapsack at the current capacity.</li>
          <li>If the item fits, then the value of the cell will be the greatest (max) of the following two values:
            <ul className="list-disc ml-8">
              <li>The value of the cell above the current cell. This is the previous maximum value for the current capacity.</li>
              <li>The current item's value plus the value at the remaining capacity.</li>
              <ul className="list-disc ml-8">
                <li>The item may not take up the entire knapsack. So, there will be available capacity in which to fit additional items. The item's weight is subtracted from the current capacity to get the remaining capacity. The value at that capacity in the previous row is added to the item's value to get the total value.</li>
              </ul>
              <li>The above table will highlight these two cells in light green.</li>
            </ul>
          </li>
          <li>If the item does not fit then use the value from the cell above it.</li>
          <ul className="list-disc ml-8">
            <li>The above table will highlight the cell in light green.</li>
          </ul>
        </ul>
        <p>At the current step the the capacity is {state.currentCapacity} and the item weight is {codeBlock.item.weight}. </p>
        {codeBlock.isInSolutions() ? 
        <div className="explanation">
          <p>The item fits in the knapsack. The maximum value is calculated as described above.</p>
          <p>The first value obtained is the previous cell's value which is {format(codeBlock.previousCellValue())}.</p>
          <p>The second value is the item's value ({format(codeBlock.item.value)}) plus the value at the reamining capacity. In this step the item's weight is {codeBlock.item.weight}. So, there is {state.currentCapacity} - {codeBlock.item.weight } = {codeBlock.remainingCapacity()} capacity available in the knapsack. The value in the previous row at capacity {codeBlock.remainingCapacity()} is {format(codeBlock.valueAtRemainingCapacity())}. The value of the item plus the value at the remaining capacity is {codeBlock.item.value} + {format(codeBlock.valueAtRemainingCapacity())} = {format(codeBlock.item.value + codeBlock.valueAtRemainingCapacity())}.</p>
          <p>The maximum of the first and second values is {format(codeBlock.cellValue())}. Math.max({format(codeBlock.previousCellValue())}, {format(codeBlock.item.value + codeBlock.valueAtRemainingCapacity())}) = {format(codeBlock.cellValue())}.</p>
        </div>
         : 
         <p>The item does not fit. The value of the cell will be the same as the cell directly above it, which is {format(codeBlock.cellValue())}.</p>}
      </div>
    </div>
  );
}

PopulateTableCodeBlock.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired,
  state: PropTypes.shape({
    currentItemIndex: PropTypes.number.isRequired,
    currentCapacity: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default PopulateTableCodeBlock;