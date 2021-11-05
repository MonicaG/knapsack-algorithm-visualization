import React from 'react';
import {KnapsackAlgorithmPropType, SolutionItemsPropType} from './helpers/proptypes'
import PropTypes from 'prop-types';
import ItemsToUsePseudoCode from './pseudocode/ItemsToUsePseudoCode';
import SolutionItems from './SolutionItems'
import { solutionTableActionTypes as types } from './SolutionController';
import ItemToUse from '../../models/ItemToUse';

function SolutionItemsTableInfo({ knapsackAlgorithm, state, dispatch }) {
  function handleButtonClick() {
    let currentCapacity = state.currentCapacity
    let newItem = null;
    if (knapsackAlgorithm.solutionTable[state.solutionIndex][state.currentCapacity] !== knapsackAlgorithm.solutionTable[state.solutionIndex - 1][state.currentCapacity]) {
      newItem = new ItemToUse(knapsackAlgorithm.items[state.solutionIndex - 1], state.solutionIndex, state.currentCapacity);
      currentCapacity -= knapsackAlgorithm.items[state.solutionIndex - 1].weight
    }

    let payload = { currentCapacity: currentCapacity }
    if (newItem) {
      payload = {
        ...payload,
        newItem: newItem
      }
    }

    dispatch({
      type: types.STEP_FIND_NEXT_SOLUTION_ITEM,
      payload: payload
    });

  }

  return (
    <div className="SolutionItemsTableInfo">
      <input type="button" value="Step" disabled={state.solutionIndex <= 0} onClick={handleButtonClick} />
      <div>
        <p>current capacity is: {state.currentCapacity}</p>
        <p>current item Index is: {state.solutionIndex}</p>
        <div>
        {state.solutionIndex > 0 ?
          <ItemsToUsePseudoCode
            previousItem={knapsackAlgorithm.items[state.solutionIndex - 1]}
            index={state.solutionIndex}
            currentCapacity={state.currentCapacity}
          />
          :
          null
        }
          <SolutionItems
            solutionItems={state.solutionItems}
          />
        </div>
      </div>
    </div>
  )
}

SolutionItemsTableInfo.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired,
  state: PropTypes.shape({
    solutionItems: SolutionItemsPropType.isRequired,
    solutionIndex: PropTypes.number.isRequired,
    currentCapacity: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default SolutionItemsTableInfo;


