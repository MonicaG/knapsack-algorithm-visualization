const CellType = {
  hightlightedCell: "1",
  mutedCell: "2",
  contributingCellAbove: "3",
  contributingCellLeftOverCapacity: "4",
};

class RetValue {
  constructor(column, css, cellType) {
    this.column = column;
    this.css = css;
    this.type = cellType;
  }
}

export {RetValue, CellType};