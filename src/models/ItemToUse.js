class SolutionItem {
  constructor(item, row, column, inSolution=false) {
    this.item = item;
    this.row = row;
    this.column = column;
    this.inSolution = inSolution;
  }
}

export default SolutionItem;