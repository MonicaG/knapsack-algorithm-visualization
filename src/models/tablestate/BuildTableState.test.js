import BuildTableState from './BuildTableState';
import TableStateReturnValue from './TableStateReturnValue';

describe('BuildTableState', () => {
  let state =  {
    currentItemIndex: 1,
    currentCapacity: 1,
    currentCellIndex: 1,
    findSolutionItems: false,
    solutionIndex: 5,
    title: "title",
    cellDimensions: new Array(6).fill({ width: 0, height: 0 }),
    phase: 1,
  }

  it('will return current cell index and css when index is the current item index', () => {  
    const bts = new BuildTableState(state);
    const expectedRetValue = new TableStateReturnValue(1, BuildTableState.CSS_SELECTED);
    expect(bts.getCellToHighLightAndCSS(1)).toStrictEqual(expectedRetValue);
  });

  it('will not return cell index nor css when index is NOT the current item index', () => {  
    const bts = new BuildTableState(state);
    const expectedRetValue = new TableStateReturnValue(null, null);
    expect(bts.getCellToHighLightAndCSS(3)).toStrictEqual(expectedRetValue);
  });

  it('will return nothing when the index is invalid', () => {
    const bts = new BuildTableState(state);
    const expectedRetValue = new TableStateReturnValue(null, null);
    expect(bts.getCellToHighLightAndCSS(-3)).toStrictEqual(expectedRetValue);
  });

  it('will return 0 for all cells in a row that is after the current item index', () => {
    const row = [5, 3, 2, 7, 8];
    const bts = new BuildTableState(state);
    expect(bts.getFormattedRow(row, 2)).toStrictEqual([0, 0, 0, 0, 0]);
  });

  it('will return the value of a cell when the row is equal to the current item index AND the cell is equal or less than the current capacity', () => {
    const row = [5, 3, 2, 7, 8];
    state.currentCapacity = 2;
    const bts = new BuildTableState(state);
    expect(bts.getFormattedRow(row, 1)).toStrictEqual([5, 3, 2, 0, 0]);
  });

  it('will return 0 for all cells when the index is greater than the current item index', () => {
    const row = [5, 3, 2, 7, 8];
    const bts = new BuildTableState(state);
    expect(bts.getFormattedRow(row, 2)).toStrictEqual([0, 0, 0, 0, 0]);
  });

  it('will return the cell values when the row is less than the current item index', () => {
    const row = [5, 3, 2, 7, 8];
    const bts = new BuildTableState(state);
    state.currentItemIndex = 2;
    expect(bts.getFormattedRow(row, 1)).toStrictEqual([5, 3, 2, 7, 8]);
  });

});