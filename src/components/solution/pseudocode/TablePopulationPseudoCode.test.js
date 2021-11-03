import { render, screen } from '@testing-library/react';
import TablePopulationPseudoCode from './TablePopulationPseudoCode';
import KnapSackAlgorithm from '../../../models/KnapsackAlgorithm';
import Item from '../../../models/Item';

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

        
    expect(screen.getByText(/if w <= c then \/\/ 3 <= 3 \(True\)/)).toBeInTheDocument();
    expect(screen.getByText(/T\[i\]\[c\] = Max\(T\[i-1\]\[c\], \(value \+ T\[i - 1\]\[c - w\]\)\)/)).toBeInTheDocument();
    expect(screen.getByText(/\/\/ T\[1\]\[3\] = Max\(T\[0\]\[3\], \(10 \+ T\[0\]\[0\]\)\)/)).toBeInTheDocument();
    expect(screen.getByText(/\/\/ T\[1\]\[3\] = Max\(0, 10\)/)).toBeInTheDocument();
    expect(screen.getByText(/\/\/ T\[1\]\[3\] = 10/)).toBeInTheDocument();
    expect(screen.getByText(/\s*else/)).toBeInTheDocument();
    expect(screen.getByText(/\s*T\[i\]\[c\] = T\[i-1\]\[c\]\s*end if/)).toBeInTheDocument();
  })

  test('the PseudoCode for an item that does not fit in the knapsack is displayed', () => {
    const capacity = 2
    render(<TablePopulationPseudoCode
      item={item1}
      capacity={capacity}
      index={1}
      solutionTable={solutionTable} />);

    expect(screen.getByText(/if w <= c then \/\/ 3 <= 2/)).toBeInTheDocument();
    expect(screen.getByText(/T\[i\]\[c\] = Max\(T\[i-1\]\[c\], \(value \+ T\[i - 1\]\[c - w\]\)\)/)).toBeInTheDocument();
    expect(screen.getByText(/\s*else /)).toBeInTheDocument();
    expect(screen.getByText(/T\[i\]\[c\] = T\[i-1\]\[c\]/)).toBeInTheDocument();
    expect(screen.getByText(/\/\/ T\[1\]\[2\] = T\[0\]\[2\]/)).toBeInTheDocument();
    expect(screen.getByText(/\/\/ T\[1\]\[2\] = 0\s*end if/)).toBeInTheDocument();
  
  });
});