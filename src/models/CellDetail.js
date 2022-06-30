class CellDetail {

  constructor(row, column) {
    this.row = row;
    this.column = column;
    this._cellAbove = null;
    this._cellRemainingCapacity = null;
    this._winningCell = null;
  }

  get cellAbove() {
    return this._cellAbove;
  }

  get cellRemainingCapacity() {
    return this._cellRemainingCapacity;
  }

  get winningCell() {
    return this._winningCell
  }

  set cellAbove(cell) {
    this._cellAbove = cell;
  }

  set cellRemainingCapacity(cell) {
    this._cellRemainingCapacity = cell;
  }

  set winningCell(cell) {
    this._winningCell = cell;
  }

  toString() {
    return `ContributingCell  row: ${this.row} column: ${this.column} cellAbove: ${this.cellAbove} cellRemainingCapacity: ${this.cellRemainingCapacity}  winningCell: ${this.winningCell}`;
  }
}

export default CellDetail;