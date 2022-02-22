import renderer from 'react-test-renderer';
import TablePopulationCodeBlock from './TablePopulationCodeBlock';
import KnapSackAlgorithm from '../../../models/KnapsackAlgorithm';
import Item from '../../../models/Item';

/** 
 * Using snapshot testing because the syntax hightlighting uses a lot of span tags. This makes it difficult to match text as the text 
 * is spread across multiple elements. 
*/

describe('the code block', () => {
  const item1 = new Item('item1', 10, 3);
  const item2 = new Item('item2', 20, 1);
  const item3 = new Item('item3', 25, 2);
  const items = [item1, item2, item3];

  const algorithm = new KnapSackAlgorithm(items, 5);
  const solutionTable = algorithm.solutionTable;

  it('displays the code block when an item fits in the knapsack', () => {
    const capacity = 3
    const tree = renderer
      .create(<TablePopulationCodeBlock
        item={item1}
        capacity={capacity}
        index={1}
        solutionTable={solutionTable} />)
      .toJSON();

    expect(tree).toMatchSnapshot()
  })

  it('displays the code block when an item does NOT fit in the knapsack', () => {
    const capacity = 2
    const tree = renderer
      .create(<TablePopulationCodeBlock
        item={item1}
        capacity={capacity}
        index={1}
        solutionTable={solutionTable} />)
      .toJSON();

    expect(tree).toMatchSnapshot()
  
  });
});