import { RetValue, CellType } from "./TableStateReturnValue";
class BuildTableState {
  static CSS_SELECTED = "highlighted";
  static CSS_CONTRIBUTING = "highlighted-contributor";

  constructor(state, knapsackAlgorithm) {
    this.state = state;
    this.knapsackAlgorithm = knapsackAlgorithm
  }

  getFormattedRow(row, index) {
    let result = row.map((element, rowIndex) => {
      return index < this.state.currentItemIndex || (index === this.state.currentItemIndex && rowIndex <= this.state.currentCapacity) ? element : 0;
    });
    return result;
  }

  getCellToHighLightAndCSS(index) {
    if (index === this.state.currentItemIndex) {
      return new RetValue(this.state.currentCellIndex, BuildTableState.CSS_SELECTED, CellType.hightlightedCell);
    } else if (index === (this.state.currentItemIndex - 1)) {
      // This block is for highlighting the cells that contribute to the current cell's value
      let cell = this.knapsackAlgorithm.getContributingCells(this.state.currentItemIndex, this.state.currentCapacity);
      let result = [];
      if (cell) {
        result.push(new RetValue(this.state.currentCellIndex, BuildTableState.CSS_CONTRIBUTING, CellType.contributingCellAbove));
        let cellAtRemainingCapacity = cell.cellRemainingCapacity;
        if (cellAtRemainingCapacity) {
          result.push(new RetValue(cellAtRemainingCapacity[1], BuildTableState.CSS_CONTRIBUTING, CellType.contributingCellLeftOverCapacity));
        }
      } else {
        result = null;
      }
      return result;
    } else {
      return null;
    }
  }

}

export default BuildTableState;