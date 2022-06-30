import {RetValue, CellType} from "./TableStateReturnValue";
import { solutionTableActionTypes as types } from '../../components/solution/SolutionController';

class FindItemsTableState {
  static CSS_IN_SOLUTION = "highlighted";
  static CSS_NOT_IN_SOLUTION = "highlighted-muted";

  constructor(state, knapsackAlgorithm) {
    this.state = state;
    this.knapsackAlgorithm = knapsackAlgorithm
  }

  getFormattedRow(row, index) {
    return row;  
  }
    
    getCellToHighLightAndCSS(index) {
     if(this.state.phase === types.STEP_TO_FIND_SOLUTION_ITEMS) {
      return null;
    }
    let items = this.knapsackAlgorithm.solutionItems.filter( x => x.row === index && x.row >= this.state.solutionIndex)
    if(items && items.length === 1) {
      let item = items[0]
      if(item.inSolution) {
        return new RetValue(item.column, FindItemsTableState.CSS_IN_SOLUTION, CellType.hightlightedCell);
      }else {
        return new RetValue(item.column, FindItemsTableState.CSS_NOT_IN_SOLUTION, CellType.mutedCell);
      }
    }
    return null;
    }    

}

export default FindItemsTableState;
