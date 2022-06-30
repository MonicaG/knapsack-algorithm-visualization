import SolutionItem from "./SolutionItem";
import { format } from './../components/solution/helpers/Formatting';
import CellDetail from "./CellDetail";

class KnapSackAlgorithm {
  _solutionTable;
  _solutionItems;
  _maxLengthItem;
  _contributingCells;
  constructor(items, capacity) {
    /*
    Note to future self: I'm only providing getter functionality for items and capacity, since I create the object when 
    the calculate button is clicked and then only read from it. If I decide to change this in the future I will need to
    provide setter methods for items/capacity that will recalculate the solutionTable and solutionItems. I've disabled
    setting at the moment to prevent unintended bugs by not recalculating the tables. The underscore syntax is because of
    https://stackoverflow.com/q/36553274/4704303
    */
    this._items = items;
    this._capacity = capacity;
    /* The maxLengthItem contains the value with the most number of digits in it. This is a bit of a hack to get around the issue of the display table resizing itself. By getting the max length, the 
      table cells in the display can be set to the max width at the start. I'm getting the size based on the value vs just setting a size on the cell so that on smaller screens, the cells will not be too large
      if not needed. (i.e. don't set a cells width to hold 3 digits when only 1 digit is needed). This way the screen space is better used for small screens.
    */
    this._maxLengthItem = 0;
    this._contributingCells = {};
  }

  _init() {
    if (!this._solutionTable) {
      this._solutionTable = this._knapsack();
    }
    if (!this._solutionItems) {
      this._solutionItems = this._findItemsThatFit();
    }
  }

  _knapsack() {
    const table = [];
    for (let i = 0; i <= this.items.length; i++) {
      table.push(Array(this.capacity + 1).fill(0));
    }

    this.items.forEach((item, index) => {
      const offsetIndex = index + 1;
      for (let currentCapacity = 1; currentCapacity <= this.capacity; currentCapacity++) {
        let cell = new CellDetail(offsetIndex, currentCapacity);
        const previousRow = offsetIndex - 1;
        const leftOverCapacity = currentCapacity - item.weight;
        const valueForCapacityInPreviousRow = table[previousRow][currentCapacity]
        let cellValue = 0;
        if(item.weight <= currentCapacity) {
          let combinedValue = parseFloat(format((item.value + table[previousRow][leftOverCapacity])));
          if(combinedValue > valueForCapacityInPreviousRow) {
            cellValue = combinedValue;
            cell.winningCell = [previousRow, leftOverCapacity];
          }else {
            cellValue = valueForCapacityInPreviousRow;
            cell.winningCell = [previousRow, currentCapacity];
          }
          
          cell.cellRemainingCapacity = [previousRow, leftOverCapacity];
        }else {
          cellValue = valueForCapacityInPreviousRow;
          cell.winningCell = [previousRow, currentCapacity];
        }
        table[offsetIndex][currentCapacity] = cellValue;
        cell.cellAbove = [previousRow, currentCapacity];
        this._contributingCells[[offsetIndex, currentCapacity]] = cell;
        this._maxLengthItem = this._maxLengthItem.toString().length < table[offsetIndex][currentCapacity].toString().length ? table[offsetIndex][currentCapacity] : this._maxLengthItem;
      }
    });
    return table;
  }

  _findItemsThatFit() {
    var solution = [];
    var currentCapacity = this.capacity;
    for (let i = this.items.length; i > 0; i--) {
      let item = new SolutionItem(this.items[i - 1], i, currentCapacity, false)
      if (this._solutionTable[i][currentCapacity] !== this._solutionTable[i - 1][currentCapacity]) {
        item.inSolution = true;
        solution.push(item);
        currentCapacity -= this.items[i - 1].weight;
      } else {
        solution.push(item);
      }
    }
    return solution;
  }

  get solutionTable() {
    this._init();
    return this._solutionTable;
  }

  get solutionItems() {
    this._init();
    return this._solutionItems;
  }

  get items() {
    return this._items;
  }

  get capacity() {
    return this._capacity;
  }

  get maxLengthItem() {
    return this._maxLengthItem;
  }

  getContributingCells(row, column) {
    this._init();
    return this._contributingCells[[row, column]];
  }

}

export default KnapSackAlgorithm;