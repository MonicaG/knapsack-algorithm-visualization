import {format} from '../../components/solution/helpers/Formatting';
class PopulateTableCode {

  static IN_LINE_NUMS = [5,6,7,8,9,10,11];
  static OUT_LINE_NUMS = [7,8,9,10,11,12];

  constructor( item, capacity, index, solutionTable ) {
    this.item = item;
    this.capacity = capacity;
    this.index = index;
    this.solutionTable = solutionTable;
  }

  _getIfComment() {
    return !this.isInSolutions() ? "" : 
`
/* 
T[${this.index}][${this.capacity}] = Math.max(T[${this.index - 1}][${this.capacity}], (${this.item.value} + T[${this.index - 1}][${this.remainingCapacity()}])) 
T[${this.index}][${this.capacity}] = Math.max(${format(this.previousCellValue())}, ${format(this.item.value + this.valueAtRemainingCapacity())})
T[${this.index}][${this.capacity}] = ${format(this.cellValue())}
*/`
  }

  _getElseComment() {
    return this.isInSolutions() ? "" :
`
/* 
T[${this.index}][${this.capacity}] = T[${this.index - 1}][${this.capacity}]
T[${this.index}][${this.capacity}] = ${format(this.cellValue())}
*/`    
  }

  getCode() {
    return (
`// w: item weight (${this.item.weight})
// value: item value (${this.item.value})
// c: current capacity (${this.capacity})
// i: index (${this.index})
if (w <= c) { // ${this.item.weight} <= ${this.capacity}
  T[i][c] = Math.max(T[i-1][c], (value + T[i - 1][c - w])) ${this._getIfComment()}
}else {
  T[i][c] = T[i-1][c] ${this._getElseComment()}
}`
    )
  }

  getInLineNums() {
    return PopulateTableCode.IN_LINE_NUMS;
  }

  getOutLineNums() {
    return PopulateTableCode.OUT_LINE_NUMS;
  }

  isInSolutions() {
    return  this.item.weight <= this.capacity;
  }

  previousCellValue() {
    return this.solutionTable[this.index - 1][this.capacity];
  }

  valueAtRemainingCapacity() {
    return this.solutionTable[this.index - 1][this.capacity - this.item.weight];
  }

  cellValue() {
    return this.solutionTable[this.index][this.capacity];
  }

  remainingCapacity() {
    return this.capacity - this.item.weight;
  }
}

export default PopulateTableCode;