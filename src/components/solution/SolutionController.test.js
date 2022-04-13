import { render, screen, fireEvent, within } from '@testing-library/react';
import SolutionController from './SolutionController';
import KnapSackAlgorithm from '../../models/KnapsackAlgorithm';
import Item from '../../models/Item';

describe('the knapsack solution table', () => {
  const items = [
    new Item('item1', 10, 3),
    new Item('item2', 20, 1),
    new Item('item3', 25, 2),
  ];

  test('displays the items to use in the algorithm', () => {
    const capacity = 5;
    const algorithm = new KnapSackAlgorithm(items, capacity);

    render(<SolutionController knapsackAlgorithm={algorithm} />);

    const rows = screen.getAllByRole("row");

    const item1Cells = within(rows[2]).getAllByRole("cell");
    expect(within(item1Cells[0]).getByText(/item1/i)).toBeInTheDocument();

    const item2Cells = within(rows[3]).getAllByRole("cell");
    expect(within(item2Cells[0]).getByText(/item2/i)).toBeInTheDocument();

    const item3Cells = within(rows[4]).getAllByRole("cell");
    expect(within(item3Cells[0]).getByText(/item3/i)).toBeInTheDocument();
  });

  test('is created with the correct dimensions', () => {
    const capacity = 6;
    const algorithm = new KnapSackAlgorithm(items, capacity);

    render(<SolutionController knapsackAlgorithm={algorithm} />);

    screen.getByRole("table");
    const rows = screen.getAllByRole("row");
    //5 rows (3 data rows, the header row, and the zero row)
    expect(rows.length).toBe(5);

    const cells = screen.getAllByRole("cell");
    //capacity is 6, plus the zero cell, plust the label cell, so 8 columns
    //Total number is number of columns multiplied by the  expected number of rows
    //so 8 * 5
    const headers = screen.getAllByRole("columnheader");
    expect(cells.length + headers.length).toBe(40);
  });

  test('is initialized with zeros', () => {
    const capacity = 4;
    const algorithm = new KnapSackAlgorithm(items, capacity);

    render(<SolutionController knapsackAlgorithm={algorithm} />);

    const allRows = screen.getAllByRole("row");
    const capacityRow = allRows[0];
    const capacityRowCells = within(capacityRow).getAllByRole("columnheader");
    expect(within(capacityRowCells[0]).getByText('')).toBeTruthy();
    expect(within(capacityRowCells[1]).getByText('0')).toBeTruthy();
    expect(within(capacityRowCells[2]).getByText('1')).toBeTruthy();
    expect(within(capacityRowCells[3]).getByText('2')).toBeTruthy();
    expect(within(capacityRowCells[4]).getByText('3')).toBeTruthy();
    expect(within(capacityRowCells[5]).getByText('4')).toBeTruthy();

    //all other rows should be zero filled
    for (let i = 1; i < allRows.length; i++) {
      const cells = within(allRows[i]).getAllByRole("cell");
      for (let j = 1; j < cells.length; j++) {
        //ignoring first cell as it's the label
        expect(within(cells[j]).getByText('0')).toBeTruthy();
      }
    }
  });
});

describe('clicking the button', () => {
  const capacity = 5;
  const items = [
    new Item('item1', 11, 3),
    new Item('item2', 7, 1),
    new Item('item3', 9, 2),
  ];
  const algorithm = new KnapSackAlgorithm(items, capacity);

  test('3 times results in first solution row being updated to capacity 4 (inclusive)', () => {

    render(<SolutionController knapsackAlgorithm={algorithm} />);

    for (let n = 0; n < 3; n++) {
      fireEvent.click(screen.getByRole('button', { name: /Step/i }))
    }

    const allRows = screen.getAllByRole("row");
    const capacityRow = allRows[0];
    const capacityRowCells = within(capacityRow).getAllByRole("columnheader");
    expect(within(capacityRowCells[0]).getByText('')).toBeTruthy();
    expect(within(capacityRowCells[1]).getByText('0')).toBeTruthy();
    expect(within(capacityRowCells[2]).getByText('1')).toBeTruthy();
    expect(within(capacityRowCells[3]).getByText('2')).toBeTruthy();
    expect(within(capacityRowCells[4]).getByText('3')).toBeTruthy();
    expect(within(capacityRowCells[5]).getByText('4')).toBeTruthy();
    expect(within(capacityRowCells[6]).getByText('5')).toBeTruthy();

    const zeroRow = allRows[1];
    const zeroRowCells = within(zeroRow).getAllByRole("cell");
    expect(within(zeroRowCells[0]).getByText('')).toBeTruthy();
    for (let i = 1; i < zeroRowCells.length; i++) {
      expect(within(zeroRowCells[i]).getByText('0')).toBeTruthy();
    }

    const solutionRow1 = allRows[2];
    const solutionRow1Cells = within(solutionRow1).getAllByRole("cell");
    expect(within(solutionRow1Cells[0]).getByText(/item1/i)).toBeTruthy();
    expect(within(solutionRow1Cells[1]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[2]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[3]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[4]).getByText('11')).toBeTruthy();
    expect(within(solutionRow1Cells[5]).getByText('11')).toBeTruthy();
    expect(within(solutionRow1Cells[6]).getByText('0')).toBeTruthy();

    //all other row cells should be zero
    for (let i = 3; i < allRows.length; i++) {
      const cells = within(allRows[i]).getAllByRole("cell");
      for (let j = 1; j < cells.length; j++) {
        expect(within(cells[j]).getByText('0')).toBeTruthy();
      }
    }
  });

  test('6 times results in second solution row being updated up to capacity 2 (inclusive)', () => {
    render(<SolutionController knapsackAlgorithm={algorithm} />);
    for (let n = 0; n < 6; n++) {
      fireEvent.click(screen.getByRole('button', { name: /Step/i }))
    }

    const allRows = screen.getAllByRole("row");
    const capacityRow = allRows[0];
    const capacityRowCells = within(capacityRow).getAllByRole("columnheader");
    expect(within(capacityRowCells[0]).getByText('')).toBeTruthy();
    expect(within(capacityRowCells[1]).getByText('0')).toBeTruthy();
    expect(within(capacityRowCells[2]).getByText('1')).toBeTruthy();
    expect(within(capacityRowCells[3]).getByText('2')).toBeTruthy();
    expect(within(capacityRowCells[4]).getByText('3')).toBeTruthy();
    expect(within(capacityRowCells[5]).getByText('4')).toBeTruthy();
    expect(within(capacityRowCells[6]).getByText('5')).toBeTruthy();

    const zeroRow = allRows[1];
    const zeroRowCells = within(zeroRow).getAllByRole("cell");
    expect(within(zeroRowCells[0]).getByText('')).toBeTruthy();
    for (let i = 1; i < zeroRowCells.length; i++) {
      expect(within(zeroRowCells[i]).getByText('0')).toBeTruthy();
    }

    const solutionRow1 = allRows[2];
    const solutionRow1Cells = within(solutionRow1).getAllByRole("cell");
    expect(within(solutionRow1Cells[0]).getByText(/item1/i)).toBeTruthy();
    expect(within(solutionRow1Cells[1]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[2]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[3]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[4]).getByText('11')).toBeTruthy();
    expect(within(solutionRow1Cells[5]).getByText('11')).toBeTruthy();
    expect(within(solutionRow1Cells[6]).getByText('11')).toBeTruthy();

    const solutionRow2 = allRows[3];
    const solutionRow2Cells = within(solutionRow2).getAllByRole("cell");
    expect(within(solutionRow2Cells[0]).getByText(/item2/i)).toBeTruthy();
    expect(within(solutionRow2Cells[1]).getByText('0')).toBeTruthy();
    expect(within(solutionRow2Cells[2]).getByText('7')).toBeTruthy();
    expect(within(solutionRow2Cells[3]).getByText('7')).toBeTruthy();
    expect(within(solutionRow2Cells[4]).getByText('0')).toBeTruthy();
    expect(within(solutionRow2Cells[5]).getByText('0')).toBeTruthy();
    expect(within(solutionRow2Cells[6]).getByText('0')).toBeTruthy();

    //all other row cells should be zero
    for (let i = 4; i < allRows.length; i++) {
      const cells = within(allRows[i]).getAllByRole("cell");
      for (let j = 1; j < cells.length; j++) {
        expect(within(cells[j]).getByText('0')).toBeTruthy();
      }
    }
  });

  test('14 times results in table being filled in', () => {
    render(<SolutionController knapsackAlgorithm={algorithm} />);

    for (let n = 0; n < 15; n++) {
      fireEvent.click(screen.getByRole('button', { name: /Step/i }))
    }

    const allRows = screen.getAllByRole("row");
    const capacityRow = allRows[0];
    const capacityRowCells = within(capacityRow).getAllByRole("columnheader");
    expect(within(capacityRowCells[0]).getByText('')).toBeTruthy();
    expect(within(capacityRowCells[1]).getByText('0')).toBeTruthy();
    expect(within(capacityRowCells[2]).getByText('1')).toBeTruthy();
    expect(within(capacityRowCells[3]).getByText('2')).toBeTruthy();
    expect(within(capacityRowCells[4]).getByText('3')).toBeTruthy();
    expect(within(capacityRowCells[5]).getByText('4')).toBeTruthy();
    expect(within(capacityRowCells[6]).getByText('5')).toBeTruthy();

    const zeroRow = allRows[1];
    const zeroRowCells = within(zeroRow).getAllByRole("cell");
    expect(within(zeroRowCells[0]).getByText('')).toBeTruthy();
    for (let i = 1; i < zeroRowCells.length; i++) {
      expect(within(zeroRowCells[i]).getByText('0')).toBeTruthy();
    }

    const solutionRow1 = allRows[2];
    const solutionRow1Cells = within(solutionRow1).getAllByRole("cell");
    expect(within(solutionRow1Cells[0]).getByText(/item1/i)).toBeTruthy();
    expect(within(solutionRow1Cells[1]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[2]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[3]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[4]).getByText('11')).toBeTruthy();
    expect(within(solutionRow1Cells[5]).getByText('11')).toBeTruthy();
    expect(within(solutionRow1Cells[6]).getByText('11')).toBeTruthy();

    const solutionRow2 = allRows[3];
    const solutionRow2Cells = within(solutionRow2).getAllByRole("cell");
    expect(within(solutionRow2Cells[0]).getByText(/item2/i)).toBeTruthy();
    expect(within(solutionRow2Cells[1]).getByText('0')).toBeTruthy();
    expect(within(solutionRow2Cells[2]).getByText('7')).toBeTruthy();
    expect(within(solutionRow2Cells[3]).getByText('7')).toBeTruthy();
    expect(within(solutionRow2Cells[4]).getByText('11')).toBeTruthy();
    expect(within(solutionRow2Cells[5]).getByText('18')).toBeTruthy();
    expect(within(solutionRow2Cells[6]).getByText('18')).toBeTruthy();

    const solutionRow3 = allRows[4];
    const solutionRow3Cells = within(solutionRow3).getAllByRole("cell");
    expect(within(solutionRow3Cells[0]).getByText(/item3/i)).toBeTruthy();
    expect(within(solutionRow3Cells[1]).getByText('0')).toBeTruthy();
    expect(within(solutionRow3Cells[2]).getByText('7')).toBeTruthy();
    expect(within(solutionRow3Cells[3]).getByText('9')).toBeTruthy();
    expect(within(solutionRow3Cells[4]).getByText('16')).toBeTruthy();
    expect(within(solutionRow3Cells[5]).getByText('18')).toBeTruthy();
    expect(within(solutionRow3Cells[6]).getByText('20')).toBeTruthy();
  });
});
