import { render, screen, within } from '@testing-library/react';
import TablePopulationPseudoCode from './TablePopulationPseudoCode';
import KnapSackAlgorithm from '../models/KnapsackAlgorithm';
import Item from '../models/Item';

describe('the PseudoCode block', () => {
  const item1 = new Item('item1', 10, 3);
  const item2 = new Item('item2', 20, 1);
  const item3 = new Item('item3', 25, 2);
  const items = [item1, item2, item3];

  const algorithm = new KnapSackAlgorithm(items, 5);
  const solutionTable = algorithm.solutionTable;

  test('the PseudoCode for an item that fits in the knapsack is displayed', () => {
    const capacity = 3
    render(<TablePopulationPseudoCode
      item={item1}
      capacity={capacity}
      index={1}
      solutionTable={solutionTable} />);

        
    expect(screen.getByText('if w <= c { // 3 <= 3 (True)', {exact: false})).toBeInTheDocument();
    expect(screen.getByText('T[i][c] = Max(T[i-1][c], (value + T[i - 1][c - w]))', {exact: false})).toBeInTheDocument();
    expect(screen.getByText('// T[1][3] = Max(T[0][3], (10 + T[0][0]))', {exact: false})).toBeInTheDocument();
    expect(screen.getByText('// T[1][3] = Max(0, 10)', {exact: false})).toBeInTheDocument();
    expect(screen.getByText('// T[1][3] = 10', {exact: false})).toBeInTheDocument();

    const expectedElseStatement = /\s*}else {\s*T\[i\]\[c\] = T\[i-1\]\[c\]\s*}/
    expect(screen.getByText(expectedElseStatement)).toBeInTheDocument();
  })

  test('the PseudoCode for an item that does not fit in the knapsack is displayed', () => {
    //@todo - implement this test!!!
    expect(screen.getByText('!!!implement this test!!!')).toBeInTheDocument();
  });
});