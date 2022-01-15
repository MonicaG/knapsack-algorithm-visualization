class SolutionItem {
  constructor(item, row, column, inSolution=false) {
    this.item = item;
    this.row = row;
    this.column = column;
    this.inSolution = inSolution;
  }

  toString() {
    return `SolutionItem  item: (${this.item}) row: ${this.row} column: ${this.column} inSolution: ${this.inSolution}`;
  }
}

export default SolutionItem;