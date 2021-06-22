import { render, screen, fireEvent, within } from '@testing-library/react';
import SolutionTable from './SolutionTable';
import knapsack from './../models/KnapsackAlgorithm'

describe('the knapsack solution table', () => {
  test('displays the items to use in the algorithm', () => {
    const capacity = 5;
    const items = [
      { name: 'item1', value: 10, weight: 3 },
      { name: 'item2', value: 20, weight: 1 },
      { name: 'item3', value: 25, weight: 2 },
    ];
    const knapsackTable = knapsack(items, capacity);

    render(<SolutionTable capacity={capacity} items={items} knapsackTable={knapsackTable} />);
    const item1 = screen.getByText(/item1/i);
    expect(item1).toBeInTheDocument();

    const item2 = screen.getByText(/item2/i);
    expect(item2).toBeInTheDocument();

    const item3 = screen.getByText(/item3/i);
    expect(item3).toBeInTheDocument();
  });

  test('is created with the correct dimensions', () => {
    const capacity = 6;
    const items = [
      { name: 'item1', value: 10, weight: 3 },
      { name: 'item2', value: 20, weight: 1 },
      { name: 'item3', value: 25, weight: 2 },
    ];
    const knapsackTable = knapsack(items, capacity);


    render(<SolutionTable capacity={capacity} items={items} knapsackTable={knapsackTable} />);
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

  test('is initialized with zeros', () => {
    const capacity = 4;
    const items = [
      { name: 'item1', value: 10, weight: 3 },
      { name: 'item2', value: 20, weight: 1 },
      { name: 'item3', value: 25, weight: 2 },
    ];
    const knapsackTable = knapsack(items, capacity);
    const { getAllByRole } = render(<SolutionTable capacity={capacity} items={items} knapsackTable={knapsackTable} />);

    const allRows = getAllByRole("row");
    const capacityRow = allRows[0];
    const capacityRowCells = within(capacityRow).getAllByRole("cell");
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
  test('4 times results in first solution row being updated up to capacity 4', () => {
    const capacity = 5;
    const items = [
      { name: 'item1', value: 10, weight: 3 },
      { name: 'item2', value: 20, weight: 1 },
      { name: 'item3', value: 25, weight: 2 },
    ];
    const knapsackTable = knapsack(items, capacity);

    const { getByRole, getAllByRole } = render(<SolutionTable capacity={capacity} items={items} knapsackTable={knapsackTable} />);

    for (let n = 0; n < 4; n++) {
      fireEvent.click(getByRole('button'))
    }

    const allRows = getAllByRole("row");
    const capacityRow = allRows[0];
    const capacityRowCells = within(capacityRow).getAllByRole("cell");
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
    expect(within(solutionRow1Cells[0]).getByText('item1')).toBeTruthy();
    expect(within(solutionRow1Cells[1]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[2]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[3]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[4]).getByText('1')).toBeTruthy();
    expect(within(solutionRow1Cells[5]).getByText('1')).toBeTruthy();
    expect(within(solutionRow1Cells[6]).getByText('0')).toBeTruthy();

    //all other row cells should be zero
    for (let i = 3; i < allRows.length; i++) {
      const cells = within(allRows[i]).getAllByRole("cell");
      for (let j = 1; j < cells.length; j++) {
        expect(within(cells[j]).getByText('0')).toBeTruthy();
      }
    }
  });
  
  test('7 times results in second solution row being updated up to capacity 2', () => {
    const capacity = 5;
    const items = [
      { name: 'item1', value: 10, weight: 3 },
      { name: 'item2', value: 20, weight: 1 },
      { name: 'item3', value: 25, weight: 2 },
    ];
    const knapsackTable = knapsack(items, capacity);

    const { getByRole, getAllByRole } = render(<SolutionTable capacity={capacity} items={items} knapsackTable={knapsackTable} />);
    for (let n = 0; n < 7; n++) {
      fireEvent.click(getByRole('button'))
    }

    const allRows = getAllByRole("row");
    const capacityRow = allRows[0];
    const capacityRowCells = within(capacityRow).getAllByRole("cell");
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
    expect(within(solutionRow1Cells[0]).getByText('item1')).toBeTruthy();
    expect(within(solutionRow1Cells[1]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[2]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[3]).getByText('0')).toBeTruthy();
    expect(within(solutionRow1Cells[4]).getByText('1')).toBeTruthy();
    expect(within(solutionRow1Cells[5]).getByText('1')).toBeTruthy();
    expect(within(solutionRow1Cells[6]).getByText('1')).toBeTruthy();

    const solutionRow2 = allRows[3];
    const solutionRow2Cells = within(solutionRow2).getAllByRole("cell");
    expect(within(solutionRow2Cells[0]).getByText('item2')).toBeTruthy();
    expect(within(solutionRow2Cells[1]).getByText('0')).toBeTruthy();
    expect(within(solutionRow2Cells[2]).getByText('1')).toBeTruthy();
    expect(within(solutionRow2Cells[3]).getByText('1')).toBeTruthy();
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
});
