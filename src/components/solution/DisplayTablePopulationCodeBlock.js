import PropTypes from 'prop-types';
import { KnapsackAlgorithmPropType } from './helpers/PropTypesHelper'
import React from 'react';
import { solutionTableActionTypes as types } from './SolutionController';
import { buildSyntaxHighlight } from './codeblocks/CodeBlocksCommon';
import PopulateTableCode from '../../models/codeblock/PopulateTableCode';


function DisplayTablePopulationCodeBlock({ knapsackAlgorithm, state, dispatch }) {

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
  return (
    <div>
      <input type="button" className="btnBlue" value="Step" onClick={() => dispatch({ type: getType() })} />
      <div className='py-2'>
      {buildSyntaxHighlight(codeBlock.getCode(), codeBlock.isInSolutions(), codeBlock.getInLineNums(), codeBlock.getOutLineNums())}
      </div>
    </div>
  );
}

DisplayTablePopulationCodeBlock.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired,
  state: PropTypes.shape({
    currentItemIndex: PropTypes.number.isRequired,
    currentCapacity: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default DisplayTablePopulationCodeBlock;