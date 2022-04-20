import RetValue from "./TableStateReturnValue";
class BuildTableState {
  static CSS_SELECTED = "bg-lime-300";

  constructor(state) {
    this.state = state;
  }

  getFormattedRow(row, index) {
    let result = row.map((element, rowIndex) => {
        return index < this.state.currentItemIndex || (index === this.state.currentItemIndex && rowIndex <= this.state.currentCapacity) ? element : 0;
      });
      return result;
    }
    
    getCellToHighLightAndCSS(index) {
      if(index === this.state.currentItemIndex) {
        return new RetValue(this.state.currentCellIndex, BuildTableState.CSS_SELECTED);
      }else {
        return new RetValue(null, null);
      }
    }    

}

export default BuildTableState;