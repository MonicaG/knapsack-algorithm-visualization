import React from 'react';
import ItemsToUsePseudoCode from './pseudocode/ItemsToUsePseudoCode';
import SolutionItems from './SolutionItems'
import { solutionTableActionTypes as types } from './SolutionTable';
import ItemToUse from '../../models/ItemToUse';

function SolutionItemsTableInfo({ knapsackAlgorithm, state, dispatch }) {
  function handleButtonClick() {
    let currentCapacity = state.currentCapacity
    let newItem = null;
    if (knapsackAlgorithm.solutionTable[state.solutionIndex][state.currentCapacity] !== knapsackAlgorithm.solutionTable[state.solutionIndex - 1][state.currentCapacity]) {
      newItem = new ItemToUse(knapsackAlgorithm.items[state.solutionIndex - 1], state.solutionIndex, state.currentCapacity);
      currentCapacity -= knapsackAlgorithm.items[state.solutionIndex - 1].weight
    }
    if (newItem) {
      dispatch({
        type: types.STEP_FIND_NEXT_SOLUTION_ITEM,
        payload: { newItem: newItem, currentCapacity: currentCapacity }
      });
    }else {
      dispatch({
        type: types.STEP_FIND_NEXT_SOLUTION_ITEM,
        payload: { currentCapacity: currentCapacity }
      });
    }
  }

  return (
    <div className="SolutionItemsTableInfo">
      <input type="button" value="Step" disabled={state.solutionIndex <= 0} onClick={handleButtonClick} />
      <div>
        <p>current capacity is: {state.currentCapacity}</p>
        <p>current item Index is: {state.solutionIndex}</p>
        <div>
          {/* <ItemsToUsePseudoCode
            solutionItems={knapsackAlgorithm.solutionItems}
            index={state.solutionIndex}
          /> */}
          <SolutionItems
            solutionItems={state.solutionItems}
          />
        </div>
      </div>
    </div>
  )
}

export default SolutionItemsTableInfo;


