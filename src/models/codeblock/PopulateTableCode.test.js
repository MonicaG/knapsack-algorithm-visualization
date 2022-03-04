import PopulateTableCode from './PopulateTableCode'
import Item from '../Item'
import KnapSackAlgorithm from '../KnapsackAlgorithm'

describe('PopulateTableCode tests', () => {
  const item1 = new Item('item1', 4, 2);
  const item2 = new Item('item2', 3, 1);
  const item3 = new Item('item3', 5, 3);
  const items = [item1, item2, item3];
  const capacity = 5

  const algorithm = new KnapSackAlgorithm(items, capacity);

  it('will return appropriate code when item fits in the knapsack', () => {  
    const currentCapacity = 3
    const index = 1
    const codeBlock = new PopulateTableCode(item1, currentCapacity, index, algorithm.solutionTable)
    const code = codeBlock.getCode()

    expect(codeBlock.isInSolutions()).toBe(true)
    expect(code).toContain("// w: item weight (2)");
    expect(code).toContain("// value: item value (4)");
    expect(code).toContain("// c: current capacity (3)");
    expect(code).toContain("// i: index (1)");

    //if stmt part of code
    expect(code).toContain("if (w <= c) { // 2 <= 3");
    expect(code).toContain("T[i][c] = Math.max(T[i-1][c], (value + T[i - 1][c - w]))");
    expect(code).toContain("T[1][3] = Math.max(T[0][3], (4 + T[0][1]))");
    expect(code).toContain("T[1][3] = Math.max(0, 4)");
    expect(code).toContain("T[1][3] = 4");
    
    //else stmt part of code
    expect(code).toContain("T[i][c] = T[i-1][c]");
    expect(code).not.toContain("T[1][3] = T[0][3]");
    expect(code).not.toContain("T[1][3] = 0");
  });

  it('will return appropriate code when item does not fit in the knapsack', () => {
    const currentCapacity = 2
    const index = 3
    const codeBlock = new PopulateTableCode(item3, currentCapacity, index, algorithm.solutionTable)
    const code = codeBlock.getCode()

    expect(codeBlock.isInSolutions()).toBe(false)
    expect(code).toContain("// w: item weight (3)");
    expect(code).toContain("// value: item value (5)");
    expect(code).toContain("// c: current capacity (2)");
    expect(code).toContain("// i: index (3)");

    //if stmt part of code
    expect(code).toContain("if (w <= c) { // 3 <= 2");
    expect(code).toContain("T[i][c] = Math.max(T[i-1][c], (value + T[i - 1][c - w]))");
    expect(code).not.toContain("T[3][2] = Math.max(T[2][2], (5 + T[2][-1])))");

    //else stmt part of code
    expect(code).toContain("T[3][2] = T[2][2]");
    expect(code).toContain("T[3][2] = 4");
  });

});