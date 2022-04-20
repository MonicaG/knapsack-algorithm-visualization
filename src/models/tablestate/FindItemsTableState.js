import RetValue from "./TableStateReturnValue";
import { solutionTableActionTypes as types } from '../../components/solution/SolutionController';

class FindItemsTableState {
  static CSS_IN_SOLUTION = "bg-lime-300";
  static CSS_NOT_IN_SOLUTION = "bg-gray-200";

  constructor(state, knapsackAlgorithm) {
    this.state = state;
    this.knapsackAlgorithm = knapsackAlgorithm
  }

  getFormattedRow(row, index) {
    return row;  
  }
    
    getCellToHighLightAndCSS(index) {
     if(this.state.phase === types.STEP_TO_FIND_SOLUTION_ITEMS) {
      return new RetValue(null, null);
    }
    let item = this.knapsackAlgorithm.solutionItems.filter( x => x.row === index && x.row >= this.state.solutionIndex)
    if(item && item.length === 1) {
      const css = item[0].inSolution ? FindItemsTableState.CSS_IN_SOLUTION : FindItemsTableState.CSS_NOT_IN_SOLUTION
      return new RetValue(item[0].column, css);
    }
    return new RetValue(null, null)
    }    

}

export default FindItemsTableState;
