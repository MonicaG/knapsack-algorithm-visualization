import FindItemsTableState from './FindItemsTableState';
import {RetValue, CellType} from './TableStateReturnValue';
import KnapSackAlgorithm from '../KnapsackAlgorithm';
import Item from '../Item';

describe('FindItemsTableState', () => {
  let capacity = 5;
  let state =  {
    currentItemIndex: 3,
    currentCapacity: capacity,
    currentCellIndex: capacity,
    findSolutionItems: true,
    solutionIndex: 3,
    title: "title",
    cellDimensions: new Array(capacity + 1).fill({ width: 0, height: 0 }),
    phase: 4,
  }

  const items = [
    new Item('item 1', 4, 2),
    new Item('item 2', 3, 1),
    new Item('item 3', 5, 3),
  ]

  let knapsackAlgorithm = new KnapSackAlgorithm(items, capacity);

  it('will return cell index and in solution css when the item is part of the solution', () => {  
    const fits = new FindItemsTableState(state, knapsackAlgorithm);
    const expectedRetValue = new RetValue(5, FindItemsTableState.CSS_IN_SOLUTION, CellType.hightlightedCell);
    expect(fits.getCellToHighLightAndCSS(3)).toStrictEqual(expectedRetValue);
  });

  it('will return cell index and not in solution css when item is NOT part of the solution', () => {  
    state.currentCapacity = 2;
    state.currentItemIndex = 2;
    state.currentCellIndex = 2;
    state.solutionIndex = 2;
    const fits = new FindItemsTableState(state, knapsackAlgorithm);
    const expectedRetValue = new RetValue(2, FindItemsTableState.CSS_NOT_IN_SOLUTION, CellType.mutedCell);
    expect(fits.getCellToHighLightAndCSS(2)).toStrictEqual(expectedRetValue);
  });

  it('will return nothing when the phase is STEP_TO_FIND_SOLUTION_ITEMS', () => {  
    state.phase = 3;
    const fits = new FindItemsTableState(state, knapsackAlgorithm);
    expect(fits.getCellToHighLightAndCSS(2)).toBeNull();
  });

  it('will return nothing when the index is invalid', () => {
    const fits = new FindItemsTableState(state, knapsackAlgorithm);
    expect(fits.getCellToHighLightAndCSS(-2)).toBeNull();
  });
  
  it('will return return the row with no changes', () => {
    const row = [5, 3, 2, 7, 8];
    const fits = new FindItemsTableState(state, knapsackAlgorithm);
    expect(fits.getFormattedRow(row, 1)).toStrictEqual([5, 3, 2, 7, 8]);
  });
});