import knapsack from './KnapsackAlgorithm';


test('table initialization', () => {
  const capacity = 6;
  const items = [
    { name: 'TV', value: 10, weight: 5 },
    { name: 'ring', value: 15, weight: 1 },
    { name: 'cell phone', value: 20, weight: 2 },
  ];
  const result = knapsack(items, capacity);
  console.log(result);
  expect(result[1][1]).toBe(0);
  expect(result[1][2]).toBe(0);
  expect(result[1][3]).toBe(0);
  expect(result[1][4]).toBe(0);
  expect(result[1][5]).toBe(1);
  expect(result[1][6]).toBe(1);

  expect(result[2][1]).toBe(1);
  expect(result[2][2]).toBe(1);
  expect(result[2][3]).toBe(1);
  expect(result[2][4]).toBe(1);
  expect(result[2][5]).toBe(1);
  expect(result[2][6]).toBe(1);


});


