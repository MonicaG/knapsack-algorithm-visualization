import PropTypes from 'prop-types';
import {KnapsackAlgorithmPropType} from './helpers/PropTypesHelper'
import React from 'react';
import TablePopulationPseudoCode from './pseudocode/TablePopulationPseudoCode';
import { solutionTableActionTypes as types} from './SolutionController';


function BuildTableInfo({knapsackAlgorithm, state, dispatch}) {

  function getType() {
    if (state.currentCapacity === knapsackAlgorithm.capacity) {
      if(state.currentItemIndex >= knapsackAlgorithm.items.length) {
        return types.STEP_TO_FIND_SOLUTION_ITEMS;
      }else {
        return types.STEP_TO_NEXT_ROW
      }
    }else {
        return types.STEP_TO_NEXT_CELL
    }
  }

  return (
    <div className="BuildTableInfo">
    
      <input type="button" className="btn" value="Step" onClick={() => dispatch({type: getType()})} />
      <div>
        <p>current capacity is: {state.currentCapacity}</p>
        <p>current item Index is: {state.currentItemIndex}</p>
        <TablePopulationPseudoCode
          item={knapsackAlgorithm.items[state.currentItemIndex - 1]}
          capacity={state.currentCapacity}
          index={state.currentItemIndex}
          solutionTable={knapsackAlgorithm.solutionTable}
        />
      </div>
    </div>
  );
}

BuildTableInfo.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired,
  state: PropTypes.shape({
    currentItemIndex: PropTypes.number.isRequired,
    currentCapacity: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default BuildTableInfo;