import React from 'react';
import { solutionTableActionTypes as types } from './SolutionController';

function InBetweenPhases({ state, dispatch, capacity }) {
  
  function btnClick() {
    dispatch({
      type: types.STEP_FIND_NEXT_SOLUTION_ITEM,
      currentCapacity: capacity,
      solutionIndex: state.solutionIndex,
    });
  }

  return(
  <input type="button" className="btnBlue" value="Find Solution Items" onClick={btnClick} />
  );
}

export default InBetweenPhases;