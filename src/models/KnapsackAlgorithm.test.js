import knapsack from './KnapsackAlgorithm';

describe('knapsack algorithm solution table', () => {
  test('has 3 items and a capacity of 6', () => {
    const capacity = 6;
    const items = [
      { name: 'TV', value: 10, weight: 5 },
      { name: 'ring', value: 15, weight: 1 },
      { name: 'cell phone', value: 20, weight: 2 },
    ];
    const result = knapsack(items, capacity);
    expect(result[1][1]).toBe(0);
    expect(result[1][2]).toBe(0);
    expect(result[1][3]).toBe(0);
    expect(result[1][4]).toBe(0);
    expect(result[1][5]).toBe(10);
    expect(result[1][6]).toBe(10);
  
    expect(result[2][1]).toBe(15);
    expect(result[2][2]).toBe(15);
    expect(result[2][3]).toBe(15);
    expect(result[2][4]).toBe(15);
    expect(result[2][5]).toBe(15);
    expect(result[2][6]).toBe(25);
  
    expect(result[3][1]).toBe(15);
    expect(result[3][2]).toBe(20);
    expect(result[3][3]).toBe(35);
    expect(result[3][4]).toBe(35);
    expect(result[3][5]).toBe(35);
    expect(result[3][6]).toBe(35);
  
  });
  
  test('has 5 items and a capacity of 4. The weight of one item is greater than the capacity', () => {
    const capacity = 4;
    const items = [
      { name: 'item 1', value: 10, weight: 5 },
      { name: 'item 2', value: 15, weight: 1 },
      { name: 'item 3', value: 8, weight: 3 },
      { name: 'item 4', value: 20, weight: 2 },
      { name: 'item 4', value: 12, weight: 3 },
    ];
    const result = knapsack(items, capacity);
    expect(result[1][1]).toBe(0);
    expect(result[1][2]).toBe(0);
    expect(result[1][3]).toBe(0);
    expect(result[1][4]).toBe(0);
  
  
    expect(result[2][1]).toBe(15);
    expect(result[2][2]).toBe(15);
    expect(result[2][3]).toBe(15);
    expect(result[2][4]).toBe(15);
  
  
    expect(result[3][1]).toBe(15);
    expect(result[3][2]).toBe(15);
    expect(result[3][3]).toBe(15);
    expect(result[3][4]).toBe(23);

    expect(result[4][1]).toBe(15);
    expect(result[4][2]).toBe(20);
    expect(result[4][3]).toBe(35);
    expect(result[4][4]).toBe(35);

    expect(result[5][1]).toBe(15);
    expect(result[5][2]).toBe(20);
    expect(result[5][3]).toBe(35);
    expect(result[5][4]).toBe(35);
    
  });

});


