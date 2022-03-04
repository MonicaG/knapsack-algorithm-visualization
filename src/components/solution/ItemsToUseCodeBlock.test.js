import renderer from 'react-test-renderer';
import KnapSackAlgorithm from '../../models/KnapsackAlgorithm';
import Item from '../../models/Item';
import ItemsToUseCodeBlock from './ItemsToUseCodeBlock';

/** 
 * Using snapshot testing because the syntax hightlighting uses a lot of span tags. This makes it difficult to match text as the text 
 * is spread across multiple elements. 
*/

describe('the code block', () => {
  const item1 = new Item('item1', 4, 2);
  const item2 = new Item('item2', 3, 1);
  const item3 = new Item('item3', 5, 3);
  const items = [item1, item2, item3];
  const capacity = 5

  const algorithm = new KnapSackAlgorithm(items, capacity);
  const mockDispatch = jest.fn();

  it('displays when an item is part of the solution', () => {
    /**
     * The test is setup for the solution to be at the first step, which is the last item, max capacity.
     * Item 3 is part of the solution
     */
     const state = {
      solutionIndex: 3,
      currentCapacity: capacity
    }
    const tree = renderer
      .create(<ItemsToUseCodeBlock
        knapsackAlgorithm = {algorithm}
        state = {state} 
        dispatch = {mockDispatch} />)
      .toJSON();

    expect(tree).toMatchSnapshot()
  });

  it('displays when an item is not part of the solution', () => {
     /**
     * The test is setup for the solution to be at the second step, which is index 2. The capacity is 2, because we are building off
     * of step 1. There is only 2 weight units left in the knapsack.
     * Item 2 is NOT part of the solution even though it fits, because the previous item provides a higher value.
     */
      const state = {
        solutionIndex: 2,
        currentCapacity: capacity - item3.weight
      }
    const tree = renderer
      .create(<ItemsToUseCodeBlock
        knapsackAlgorithm = {algorithm}
        state = {state} 
        dispatch = {mockDispatch} />)
      .toJSON();

    expect(tree).toMatchSnapshot()
  });

});