import { render, screen, within} from '@testing-library/react';
import SolutionTable from './SolutionTable';

test('items are present', () => {
  const capacity = 5;
  const items = [
    { name: 'item1', value: 10, weight: 3 },
    { name: 'item2', value: 20, weight: 1 },
    { name: 'item3', value: 25, weight: 2 },
  ];
  render(<SolutionTable capacity={capacity} items={items} />);
  const item1 = screen.getByText(/item1/i);
  expect(item1).toBeInTheDocument();

  const item2 = screen.getByText(/item1/i);
  expect(item2).toBeInTheDocument();

  const item3 = screen.getByText(/item1/i);
  expect(item3).toBeInTheDocument();
});

test('table size', () => {
  const capacity = 6;
  const items = [
    { name: 'item1', value: 10, weight: 3 },
    { name: 'item2', value: 20, weight: 1 },
    { name: 'item3', value: 25, weight: 2 },
  ];
  const {debug} = render(<SolutionTable capacity={capacity} items={items} />);
  screen.getByRole("table");
  const rows = screen.getAllByRole("row");
  //5 rows (3 data rows, the header row, and the zero row)
  expect(rows.length).toBe(5);

  const cells = screen.getAllByRole("cell");
  //capacity is 6, plus the zero cell, plust the label cell, so 8 columns
  //Total number is number of columns multiplied by the  expected number of rows
  //so 8 * 5
  expect(cells.length).toBe(40);
});