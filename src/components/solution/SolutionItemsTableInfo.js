import React from 'react';
import { KnapsackAlgorithmPropType } from './helpers/PropTypesHelper'
import PropTypes from 'prop-types';
import ItemsToUseCodeBlock from './codeblocks/ItemsToUseCodeBlock';
import { solutionTableActionTypes as types } from './SolutionController';

function SolutionItemsTableInfo({ knapsackAlgorithm, state, dispatch }) {

  function buildPsuedo() {
    return (
      <div>
        <input type="button" className="btnBlue" value="Step" onClick={handleButtonClick} />
        <div className="pseudoCode">
          <div>
              <ItemsToUseCodeBlock
                previousItem={knapsackAlgorithm.items[state.solutionIndex - 1]}
                index={state.solutionIndex}
                currentCapacity={state.currentCapacity}
                knapsackAlgorithm={knapsackAlgorithm}
              />
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

  return (
        buildPsuedo()
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


