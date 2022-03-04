import React from 'react';
import { KnapsackAlgorithmPropType } from './helpers/PropTypesHelper'
import PropTypes from 'prop-types';
import { solutionTableActionTypes as types } from './SolutionController';
import { buildSyntaxHighlight } from './helpers/CodeBlocksCommon';
import ItemsToUseCode from '../../models/codeblock/ItemsToUseCode';

function ItemsToUseCodeBlock({ knapsackAlgorithm, state, dispatch }) {

  const codeBlock = new ItemsToUseCode(state.solutionIndex, state.currentCapacity, knapsackAlgorithm);

  return (
    <div>
      <input type="button" className="btnBlue" value="Step" onClick={handleButtonClick} />
      <div className="py-2">
      {buildSyntaxHighlight(codeBlock.getCode(), codeBlock.isInSolutions(), codeBlock.getInLineNums(), codeBlock.getOutLineNums())}
      </div>
    </div>
  )

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