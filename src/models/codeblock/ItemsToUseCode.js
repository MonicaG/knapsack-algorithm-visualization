import {format} from '../../components/solution/helpers/Formatting';

class ItemsToUseCode {
  static IN_LINE_NUMS = [7,8,9,10];
  static OUT_LINE_NUMS = [11];

  constructor(index, currentCapacity, knapsackAlgorithm) {
    this.index = index;
    this.currentCapacity = currentCapacity;
    this.knapsackAlgorithm = knapsackAlgorithm;
    this.previousItem = knapsackAlgorithm.items[index - 1]
  }

  getCode() {
    return (
`// items: array of item objects. An item has a value and weight property
let solution = []; 
let capacity = knapsack.capacity;
for (let i = items.length; i > 0; i--) {
  // i: index (${this.index})
  if (T[i][capacity] != Table[i-1][capacity]) { // T[${this.index}][${this.currentCapacity}] != T[${this.index - 1}][${this.currentCapacity}]
    //item is part of the solution
    solution.push(item);
    capacity = capacity - items[i-1].weight;  ${!this.isInSolutions() ? "": 
    `
    //capacity = ${this.currentCapacity} - ${this.previousItem.weight} = ${format(this.currentCapacity - this.previousItem.weight)}`
  }
  }else {
    // no - op
  }
}`)
  }

  getInLineNums() {
    return ItemsToUseCode.IN_LINE_NUMS;
  }

  getOutLineNums() {
    return ItemsToUseCode.OUT_LINE_NUMS;
  }

  isInSolutions() {
    return this.knapsackAlgorithm.solutionTable[this.index][this.currentCapacity] !== this.knapsackAlgorithm.solutionTable[this.index-1][this.currentCapacity];
  }
}

export default ItemsToUseCode;
