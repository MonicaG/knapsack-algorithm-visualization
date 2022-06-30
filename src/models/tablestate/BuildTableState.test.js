import BuildTableState from './BuildTableState';
import { RetValue, CellType } from './TableStateReturnValue';
import Item from '../Item';
import KnapSackAlgorithm from '../KnapsackAlgorithm';

describe('BuildTableState', () => {
  let state;
  let algorithm;
  const capacity = 6;
  const item1 = new Item('TV', 10, 5);
  const item2 = new Item('ring', 15, 1);
  const item3 = new Item('cell phone', 20, 2);
  const items = [item1, item2, item3];

  beforeEach(() => {
    state = {
      currentItemIndex: 1,
      currentCapacity: 1,
      currentCellIndex: 1,
      findSolutionItems: false,
    }
    algorithm = new KnapSackAlgorithm(items, capacity);
  })

  it('will return current cell index and css when index is the current item index', () => {
    const bts = new BuildTableState(state, algorithm);
    const expectedRetValue = new RetValue(1, BuildTableState.CSS_SELECTED, CellType.hightlightedCell);
    expect(bts.getCellToHighLightAndCSS(1)).toStrictEqual(expectedRetValue);
  });

  it('will return contributing cell when item does not fit in the knapsack', () => {
    const bts = new BuildTableState(state, algorithm);
    const expectedRetValue = [new RetValue(1, BuildTableState.CSS_CONTRIBUTING, CellType.contributingCellAbove)];
    expect(bts.getCellToHighLightAndCSS(0)).toEqual(expectedRetValue);

  });


  it('will return contributing cells when item fits in the knapsack', () => {
    state.currentItemIndex = 2;
    state.currentCellIndex = 6;
    state.currentCapacity = 6;
    const bts = new BuildTableState(state, algorithm);
    const expectedRetValue = [new RetValue(6, BuildTableState.CSS_CONTRIBUTING, CellType.contributingCellAbove),
    new RetValue(5, BuildTableState.CSS_CONTRIBUTING, CellType.contributingCellLeftOverCapacity)];
    expect(bts.getCellToHighLightAndCSS(1)).toEqual(expectedRetValue);

  });


  it('will not return cell index nor css when index is NOT the current item index', () => {
    const bts = new BuildTableState(state, algorithm);
    expect(bts.getCellToHighLightAndCSS(3)).toBeNull();
  });

  it('will return nothing when the index is invalid', () => {
    const bts = new BuildTableState(state, algorithm);
    expect(bts.getCellToHighLightAndCSS(-3)).toBeNull();
  });

  it('will return 0 for all cells in a row that is after the current item index', () => {
    const row = [5, 3, 2, 7, 8];
    const bts = new BuildTableState(state, algorithm);
    expect(bts.getFormattedRow(row, 2)).toStrictEqual([0, 0, 0, 0, 0]);
  });

  it('will return the value of a cell when the row is equal to the current item index AND the cell is equal or less than the current capacity', () => {
    const row = [5, 3, 2, 7, 8];
    state.currentCapacity = 2;
    const bts = new BuildTableState(state, algorithm);
    expect(bts.getFormattedRow(row, 1)).toStrictEqual([5, 3, 2, 0, 0]);
  });

  it('will return 0 for all cells when the index is greater than the current item index', () => {
    const row = [5, 3, 2, 7, 8];
    const bts = new BuildTableState(state, algorithm);
    expect(bts.getFormattedRow(row, 2)).toStrictEqual([0, 0, 0, 0, 0]);
  });

  it('will return the cell values when the row is less than the current item index', () => {
    const row = [5, 3, 2, 7, 8];
    const bts = new BuildTableState(state, algorithm);
    state.currentItemIndex = 2;
    expect(bts.getFormattedRow(row, 1)).toStrictEqual([5, 3, 2, 7, 8]);
  });

});