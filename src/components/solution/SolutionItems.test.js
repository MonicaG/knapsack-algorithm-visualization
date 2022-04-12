import { screen, render, within } from '@testing-library/react';
import SolutionItems from './SolutionItems';
import SolutionItem from '../../models/SolutionItem';
import Item from '../../models/Item';

describe('SolutionItems tests', () => {
  
  it('display 1 item when there is only one item that fits', () => {
    const solutionItem1 =  new SolutionItem(new Item('item 1', 3, 5), 1, 2, true)
    const solutionItem2 = new SolutionItem(new Item('item 2', 2, 7), 3, 4, false)
    const solutionItem3 = new SolutionItem(new Item('item 3', 4, 8), 5, 6, false)
    const solutionItems = [solutionItem1, solutionItem2, solutionItem3]
    render(<SolutionItems solutionItems={solutionItems} />);

    const items = screen.queryAllByRole("listitem", { name: /solution item/i });
    expect(items).toHaveLength(1);
    expect(within(items[0]).getByText(/item 1/)).toBeInTheDocument()
  });

  it('displays 2 items when two items fit', () => {
    const solutionItem1 =  new SolutionItem(new Item('item 1', 3, 5), 1, 2, true)
    const solutionItem2 = new SolutionItem(new Item('item 2', 2, 7), 3, 4, false)
    const solutionItem3 = new SolutionItem(new Item('item 3', 4, 8), 5, 6, true)
    const solutionItems = [solutionItem1, solutionItem2, solutionItem3]
    render(<SolutionItems solutionItems={solutionItems} />);

    const items = screen.queryAllByRole("listitem", { name: /solution item/i });
    expect(items).toHaveLength(2);
    expect(within(items[0]).getByText(/item 1/)).toBeInTheDocument()
    expect(within(items[1]).getByText(/item 3/)).toBeInTheDocument()
  });

  it('displays a message when no items are part of the solution', () => {
    const solutionItem1 =  new SolutionItem(new Item('item 1', 3, 5), 1, 2, false)
    const solutionItem2 = new SolutionItem(new Item('item 2', 2, 7), 3, 4, false)
    const solutionItem3 = new SolutionItem(new Item('item 3', 4, 8), 5, 6, false)
    const solutionItems = [solutionItem1, solutionItem2, solutionItem3]
    render(<SolutionItems solutionItems={solutionItems} />);

    const items = screen.queryAllByRole("listitem", { name: /solution item/i});
    expect(items).toHaveLength(0);
    expect(screen.getByText(/No items fit in the knapsack./i)).toBeInTheDocument();
  });

});
