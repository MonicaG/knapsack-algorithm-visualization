import KnapSackAlgorithm from './KnapsackAlgorithm';
import Item from './Item';

describe('knapsack algorithm solution table', () => {
  it('has 3 items and a capacity of 6', () => {
    const capacity = 6;
    const item1 = new Item('TV', 10, 5);
    const item2 = new Item('ring', 15, 1);
    const item3 = new Item('cell phone', 20, 2);
    const items = [item1, item2, item3];

    const algorithm = new KnapSackAlgorithm(items, capacity);
    const solutionTable = algorithm.solutionTable;
    expect(solutionTable[1][1]).toBe(0);
    expect(solutionTable[1][2]).toBe(0);
    expect(solutionTable[1][3]).toBe(0);
    expect(solutionTable[1][4]).toBe(0);
    expect(solutionTable[1][5]).toBe(10);
    expect(solutionTable[1][6]).toBe(10);

    expect(solutionTable[2][1]).toBe(15);
    expect(solutionTable[2][2]).toBe(15);
    expect(solutionTable[2][3]).toBe(15);
    expect(solutionTable[2][4]).toBe(15);
    expect(solutionTable[2][5]).toBe(15);
    expect(solutionTable[2][6]).toBe(25);

    expect(solutionTable[3][1]).toBe(15);
    expect(solutionTable[3][2]).toBe(20);
    expect(solutionTable[3][3]).toBe(35);
    expect(solutionTable[3][4]).toBe(35);
    expect(solutionTable[3][5]).toBe(35);
    expect(solutionTable[3][6]).toBe(35);

    const result = algorithm.solutionItems;
    const chosenItems = result.map(item => (item.item));
    expect(chosenItems).toContainEqual(item3, item2);

    let cell = algorithm.getContributingCells(1, 1);
    let aboveCell = cell.cellAbove;
    let leftOverCapacityCell = cell.cellRemainingCapacity;
    let winningCell = cell.winningCell;
    expect(aboveCell).toEqual([0, 1]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([0, 1]);

    cell = algorithm.getContributingCells(1, 2);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([0, 2]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([0, 2]);

    cell = algorithm.getContributingCells(1, 3);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([0, 3]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([0, 3]);

    cell = algorithm.getContributingCells(1, 4);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([0, 4]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([0, 4]);

    cell = algorithm.getContributingCells(1, 5);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([0, 5]);
    expect(leftOverCapacityCell).toEqual([0, 0])
    expect(winningCell).toEqual([0, 0]);

    cell = algorithm.getContributingCells(1, 6);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([0, 6]);
    expect(leftOverCapacityCell).toEqual([0, 1])
    expect(winningCell).toEqual([0, 1]);

    cell = algorithm.getContributingCells(2, 1);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([1, 1]);
    expect(leftOverCapacityCell).toEqual([1, 0]);
    expect(winningCell).toEqual([1, 0]);

    cell = algorithm.getContributingCells(2, 2);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([1, 2]);
    expect(leftOverCapacityCell).toEqual([1, 1]);
    expect(winningCell).toEqual([1, 1]);

    cell = algorithm.getContributingCells(2, 3);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([1, 3]);
    expect(leftOverCapacityCell).toEqual([1, 2]);
    expect(winningCell).toEqual([1, 2]);

    cell = algorithm.getContributingCells(2, 4);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([1, 4]);
    expect(leftOverCapacityCell).toEqual([1, 3]);
    expect(winningCell).toEqual([1, 3]);

    cell = algorithm.getContributingCells(2, 5);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([1, 5]);
    expect(leftOverCapacityCell).toEqual([1, 4]);
    expect(winningCell).toEqual([1, 4]);

    cell = algorithm.getContributingCells(2, 6);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([1, 6]);
    expect(leftOverCapacityCell).toEqual([1, 5]);
    expect(winningCell).toEqual([1, 5]);

    cell = algorithm.getContributingCells(3, 1);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([2, 1]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([2, 1]);

    cell = algorithm.getContributingCells(3, 2);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([2, 2]);
    expect(leftOverCapacityCell).toEqual([2, 0]);
    expect(winningCell).toEqual([2, 0]);

    cell = algorithm.getContributingCells(3, 3);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([2, 3]);
    expect(leftOverCapacityCell).toEqual([2, 1]);
    expect(winningCell).toEqual([2, 1]);

    cell = algorithm.getContributingCells(3, 4);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([2, 4]);
    expect(leftOverCapacityCell).toEqual([2, 2]);
    expect(winningCell).toEqual([2, 2]);

    cell = algorithm.getContributingCells(3, 5);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([2, 5]);
    expect(leftOverCapacityCell).toEqual([2, 3]);
    expect(winningCell).toEqual([2, 3]);

    cell = algorithm.getContributingCells(3, 6);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([2, 6]);
    expect(leftOverCapacityCell).toEqual([2, 4]);
    expect(winningCell).toEqual([2, 4]);

    // test non-existing cell
    cell = algorithm.getContributingCells(10, 10);
    expect(cell).toBeUndefined();
  });

  it('has 5 items and a capacity of 4. The weight of one item is greater than the capacity', () => {
    const capacity = 4;
    const item1 = new Item('item 1', 10, 5);
    const item2 = new Item('item 2', 15, 1);
    const item3 = new Item('item 3', 8, 3);
    const item4 = new Item('item 4', 20, 2);
    const item5 = new Item('item 5', 12, 3);
    const items = [item1, item2, item3, item4, item5];

    const algorithm = new KnapSackAlgorithm(items, capacity);
    const solutionTable = algorithm.solutionTable;
    expect(solutionTable[1][1]).toBe(0);
    expect(solutionTable[1][2]).toBe(0);
    expect(solutionTable[1][3]).toBe(0);
    expect(solutionTable[1][4]).toBe(0);


    expect(solutionTable[2][1]).toBe(15);
    expect(solutionTable[2][2]).toBe(15);
    expect(solutionTable[2][3]).toBe(15);
    expect(solutionTable[2][4]).toBe(15);


    expect(solutionTable[3][1]).toBe(15);
    expect(solutionTable[3][2]).toBe(15);
    expect(solutionTable[3][3]).toBe(15);
    expect(solutionTable[3][4]).toBe(23);

    expect(solutionTable[4][1]).toBe(15);
    expect(solutionTable[4][2]).toBe(20);
    expect(solutionTable[4][3]).toBe(35);
    expect(solutionTable[4][4]).toBe(35);

    expect(solutionTable[5][1]).toBe(15);
    expect(solutionTable[5][2]).toBe(20);
    expect(solutionTable[5][3]).toBe(35);
    expect(solutionTable[5][4]).toBe(35);

    const result = algorithm.solutionItems;
    const chosenItems = result.map(item => (item.item));
    expect(chosenItems).toContainEqual(item2, item4);

    let cell = algorithm.getContributingCells(1, 1);
    let aboveCell = cell.cellAbove;
    let leftOverCapacityCell = cell.cellRemainingCapacity;
    let winningCell = cell.winningCell;
    expect(aboveCell).toEqual([0, 1]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([0, 1]);

    cell = algorithm.getContributingCells(1, 2);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([0, 2]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([0, 2]);

    cell = algorithm.getContributingCells(1, 3);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([0, 3]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([0, 3]);

    cell = algorithm.getContributingCells(1, 4);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([0, 4]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([0, 4]);

    cell = algorithm.getContributingCells(2, 1);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([1, 1]);
    expect(leftOverCapacityCell).toEqual([1, 0]);
    expect(winningCell).toEqual([1, 0]);

    cell = algorithm.getContributingCells(2, 2);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([1, 2]);
    expect(leftOverCapacityCell).toEqual([1, 1]);
    expect(winningCell).toEqual([1, 1]);

    cell = algorithm.getContributingCells(2, 3);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([1, 3]);
    expect(leftOverCapacityCell).toEqual([1, 2]);
    expect(winningCell).toEqual([1, 2]);

    cell = algorithm.getContributingCells(2, 4);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([1, 4]);
    expect(leftOverCapacityCell).toEqual([1, 3]);
    expect(winningCell).toEqual([1, 3]);

    cell = algorithm.getContributingCells(3, 1);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([2, 1]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([2, 1]);

    cell = algorithm.getContributingCells(3, 2);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([2, 2]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([2, 2]);

    cell = algorithm.getContributingCells(3, 3);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([2, 3]);
    expect(leftOverCapacityCell).toEqual([2, 0]);
    expect(winningCell).toEqual([2, 3]);

    cell = algorithm.getContributingCells(3, 4);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([2, 4]);
    expect(leftOverCapacityCell).toEqual([2, 1]);
    expect(winningCell).toEqual([2, 1]);

    cell = algorithm.getContributingCells(4, 1);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([3, 1]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([3, 1]);

    cell = algorithm.getContributingCells(4, 2);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([3, 2]);
    expect(leftOverCapacityCell).toEqual([3, 0]);
    expect(winningCell).toEqual([3, 0]);

    cell = algorithm.getContributingCells(4, 3);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([3, 3]);
    expect(leftOverCapacityCell).toEqual([3, 1]);
    expect(winningCell).toEqual([3, 1]);

    cell = algorithm.getContributingCells(4, 4);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([3, 4]);
    expect(leftOverCapacityCell).toEqual([3, 2]);
    expect(winningCell).toEqual([3, 2]);

    cell = algorithm.getContributingCells(5, 1);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([4, 1]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([4, 1]);

    cell = algorithm.getContributingCells(5, 2);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([4, 2]);
    expect(leftOverCapacityCell).toBeNull();
    expect(winningCell).toEqual([4, 2]);

    cell = algorithm.getContributingCells(5, 3);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([4, 3]);
    expect(leftOverCapacityCell).toEqual([4, 0]);
    expect(winningCell).toEqual([4, 3]);

    cell = algorithm.getContributingCells(5, 4);
    aboveCell = cell.cellAbove;
    leftOverCapacityCell = cell.cellRemainingCapacity;
    winningCell = cell.winningCell;
    expect(aboveCell).toEqual([4, 4]);
    expect(leftOverCapacityCell).toEqual([4, 1]);
    expect(winningCell).toEqual([4, 4]);

  });

  it('handles decimal values', () => {
    const capacity = 6;
    const item1 = new Item('item 1', 39.9, 2);
    const item2 = new Item('item 2', 49.9, 1);
    const item3 = new Item('item 3', 29.7, 3);

    const items = [item1, item2, item3];

    const algorithm = new KnapSackAlgorithm(items, capacity);
    const solutionTable = algorithm.solutionTable;
    expect(solutionTable[1][1]).toBe(0);
    expect(solutionTable[1][2]).toBe(39.9);
    expect(solutionTable[1][3]).toBe(39.9);
    expect(solutionTable[1][4]).toBe(39.9);
    expect(solutionTable[1][5]).toBe(39.9);
    expect(solutionTable[1][6]).toBe(39.9);

    expect(solutionTable[2][1]).toBe(49.9);
    expect(solutionTable[2][2]).toBe(49.9);
    expect(solutionTable[2][3]).toBe(89.8);
    expect(solutionTable[2][4]).toBe(89.8);
    expect(solutionTable[2][5]).toBe(89.8);
    expect(solutionTable[2][6]).toBe(89.8);

    expect(solutionTable[3][1]).toBe(49.9);
    expect(solutionTable[3][2]).toBe(49.9);
    expect(solutionTable[3][3]).toBe(89.8);
    expect(solutionTable[3][4]).toBe(89.8);
    expect(solutionTable[3][5]).toBe(89.8);
    expect(solutionTable[3][6]).toBe(119.5);

  });

});


