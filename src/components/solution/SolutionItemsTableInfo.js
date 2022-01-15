import React from 'react';
import { KnapsackAlgorithmPropType } from './helpers/PropTypesHelper'
import PropTypes from 'prop-types';
import ItemsToUsePseudoCode from './pseudocode/ItemsToUsePseudoCode';
import SolutionItems from './SolutionItems'
import { solutionTableActionTypes as types } from './SolutionController';

function SolutionItemsTableInfo({ knapsackAlgorithm, state, dispatch }) {

  function getSolutionItems() {
    return knapsackAlgorithm.solutionItems.filter(x => x.inSolution)
  }
  function buildPsuedo() {
    return (
      <div>
        <input type="button" className="btnBlue" value="Step" disabled={state.solutionIndex <= 0} onClick={handleButtonClick} />
        <div className="pseudoCode">
          <p>current capacity is: {state.currentCapacity}</p>
          <p>current item Index is: {state.solutionIndex}</p>
          <div>
            {state.solutionIndex > 0 ?
              <ItemsToUsePseudoCode
                previousItem={knapsackAlgorithm.items[state.solutionIndex - 1]}
                index={state.solutionIndex}
                currentCapacity={state.currentCapacity}
                knapsackAlgorithm={knapsackAlgorithm}
              />
              :
              <SolutionItems
                solutionItems={getSolutionItems()}
              />
            }
          </div>
        </div>
      </div>)
  }

  function doDispatch(solutionIndex, capacity) {
    dispatch({
      type: types.STEP_FIND_NEXT_SOLUTION_ITEM,
      currentCapacity: capacity,
      solutionIndex: solutionIndex,
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

  function handleFindItemsButtonClick() {
    doDispatch(state.solutionIndex, knapsackAlgorithm.capacity);
  }

  return (
    <div className="tableInfo">
      {state.phase === types.STEP_TO_FIND_SOLUTION_ITEMS ?
        <input type="button" className="btnBlue" value="Find Solution Items" onClick={handleFindItemsButtonClick} />
        :
        buildPsuedo()
      }
    </div>
  )
}

SolutionItemsTableInfo.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired,
  state: PropTypes.shape({
    solutionIndex: PropTypes.number.isRequired,
    currentCapacity: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default SolutionItemsTableInfo;


