import KnapSackAlgorithm from './KnapsackAlgorithm';
import Item from './Item';

describe('knapsack algorithm solution table', () => {
  it('has 3 items and a capacity of 6', () => {
    const capacity = 6;
    const item1 = new Item('TV', 10, 5);
    const item2 =  new Item('ring', 15, 1);
    const item3 =  new Item('cell phone', 20, 2);
    const items = [ item1, item2, item3 ];
     
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
    const chosenItems = result.map(item => (item.item))
    expect(chosenItems).toContainEqual(item3, item2);

  });

  it('has 5 items and a capacity of 4. The weight of one item is greater than the capacity', () => {
    const capacity = 4;
    const item1 = new Item ('item 1', 10, 5);
    const item2 = new Item ('item 2', 15, 1);
    const item3 = new Item ('item 3', 8, 3 );
    const item4 = new Item ('item 4', 20, 2);
    const item5 = new Item ('item 5', 12, 3);
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
    const chosenItems = result.map(item => (item.item))
    expect(chosenItems).toContainEqual(item2, item4);

  });

});


