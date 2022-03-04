import ItemsToUseCode from './ItemsToUseCode'
import Item from '../Item'
import KnapSackAlgorithm from '../KnapsackAlgorithm'

describe('ItemsToUseCode tests', () => {
  const item1 = new Item('item1', 4, 2);
  const item2 = new Item('item2', 3, 1);
  const item3 = new Item('item3', 5, 3);
  const items = [item1, item2, item3];
  const capacity = 5

  const algorithm = new KnapSackAlgorithm(items, capacity);

  it('will return code that is part of the solution', () => {  
    const currentCapacity = capacity
    const index = 3
    const codeBlock = new ItemsToUseCode(index, currentCapacity, algorithm)
    const code = codeBlock.getCode()

    expect(codeBlock.isInSolutions()).toBe(true)
    expect(code).toContain("// i: index (3)")
    expect(code).toContain("if (T[i][capacity] != Table[i-1][capacity]) { // T[3][5] != T[2][5]")
    expect(code).toContain("//capacity = 5 - 3 = 2")
  });

  it('will return code for an item not in a solution', () => {
    const currentCapacity = capacity - item3.weight
    const index = 2
    const codeBlock = new ItemsToUseCode(index, currentCapacity, algorithm)
    const code = codeBlock.getCode()
    
    expect(codeBlock.isInSolutions()).toBe(false)
    expect(code).toContain("// i: index (2)")
    expect(code).toContain("if (T[i][capacity] != Table[i-1][capacity]) { // T[2][2] != T[1][2]")
    expect(code).not.toContain("//capacity")
  });

});