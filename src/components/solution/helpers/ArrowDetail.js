import { getCellIdBase, getCellId } from './TableHelper';

class ArrowDetail {

  constructor(knapsackAlgorithm, currentItemIndex, currentCapacity) {
    this.knapsackAlgorithm = knapsackAlgorithm;
    this.currentItemIndex = currentItemIndex;
    this.currentCapacity = currentCapacity;
    this._cell = knapsackAlgorithm.getContributingCells(currentItemIndex, currentCapacity);
  }

  getStartCell() {
    const winningCell = this._cell?.winningCell;
    if (winningCell) {
      const prevItem = this.knapsackAlgorithm.items[winningCell[0] - 1];
      return getCellId(getCellIdBase(prevItem), winningCell[1]);
    } else {
      return "";
    }
  }

  getEndCell() {
    const currentItem = this.knapsackAlgorithm.items[this._cell?.row - 1];
    if (currentItem) {
      return getCellId(getCellIdBase(currentItem), this.currentCapacity);
    } else {
      return "";
    }
  }


  getAnchorDetails() {
    let startAnchor = "auto";
    let endAnchor = "auto";
    const winningCell = this._cell?.winningCell;
    const cellAbove = this._cell?.cellAbove;
    //this is here because the arrow line isn't long enough when connecting two cells that are directly above/below each other
    //so use the middle position with a bit of an offset so the numbers can be seen.
    if (winningCell && cellAbove && winningCell[0] === cellAbove[0] && winningCell[1] === cellAbove[1]) {
      startAnchor = { position: "middle", offset: { y: 10 } };
      endAnchor = { position: "middle", offset: { y: -10 } };
    }
    return [startAnchor, endAnchor];
  }

}

export default ArrowDetail;