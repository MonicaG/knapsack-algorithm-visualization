import SolutionTableRow from "./SolutionTableRow";
import { screen, render, within } from '@testing-library/react';
import Item from "../../models/Item";
import { CellType, RetValue } from "../../models/tablestate/TableStateReturnValue";
import BuildTableState from "../../models/tablestate/BuildTableState";


describe('SolutionTableRow tests', () => {

  it('should highlight the current cell', () => {
    const item = new Item('item 1', 3, 5);
    const row = [0, 5, 6, 0, 0];
    const hightlightCell = new RetValue(3, BuildTableState.CSS_SELECTED, CellType.hightlightedCell);
    const ref = jest.fn();
    render(<table><tbody><SolutionTableRow
      cellKey="key"
      row={row}
      item={item}
      highlightcells={hightlightCell}
      currentItem={item}
      measureCellRef={ref}
      rowIndex={1}
    /></tbody></table>);

    const trRow = screen.queryAllByRole("row");
    const cells = within(trRow[0]).getAllByRole("cell");
    expect(cells).toHaveLength(6);
    expect(cells[0]).toHaveTextContent("item 1(v: 3 w: 5)");
    expect(cells[1].classList).toHaveLength(2);
    expect(cells[1].classList).toContain("muted");
    expect(cells[1].classList).toContain("cell");
    expect(cells[1]).toHaveTextContent("0");
    expect(cells[2].classList).toHaveLength(1);
    expect(cells[2].classList).toContain("cell");
    expect(cells[2]).toHaveTextContent("5");
    expect(cells[3].classList).toHaveLength(1);
    expect(cells[3].classList).toContain("cell");
    expect(cells[3]).toHaveTextContent("6");
    expect(cells[4].classList).toHaveLength(2);
    expect(cells[4].classList).toContain("cell");
    expect(cells[4].classList).toContain("highlighted");
    expect(cells[4]).toHaveTextContent("0");
    expect(cells[5].classList).toHaveLength(1);
    expect(cells[5].classList).toContain("cell");
    expect(cells[5]).toHaveTextContent("0");
  });

  it('should highlight the contributing cell, when there is only one', () => {
    const item1 = new Item('item 1', 3, 5);
    const item2 = new Item('item 2', 2, 4);
    const row = [0, 1, 2, 3, 4];
    const hightlightCell = new RetValue(4, BuildTableState.CSS_CONTRIBUTING, CellType.contributingCellAbove);
    const ref = jest.fn();
    render(<table><tbody><SolutionTableRow
      cellKey="key"
      row={row}
      item={item1}
      highlightcells={hightlightCell}
      currentItem={item2}
      measureCellRef={ref}
      rowIndex={1}
    /></tbody></table>);

    const trRow = screen.queryAllByRole("row");
    const cells = within(trRow[0]).getAllByRole("cell");
    expect(cells).toHaveLength(6);
    expect(cells[0]).toHaveTextContent("item 1(v: 3 w: 5)");
    expect(cells[1].classList).toHaveLength(2);
    expect(cells[1].classList).toContain("muted");
    expect(cells[1].classList).toContain("cell");
    expect(cells[1]).toHaveTextContent("0");
    expect(cells[2].classList).toHaveLength(1);
    expect(cells[2].classList).toContain("cell");
    expect(cells[2]).toHaveTextContent("1");
    expect(cells[3].classList).toHaveLength(1);
    expect(cells[3].classList).toContain("cell");
    expect(cells[3]).toHaveTextContent("2");
    expect(cells[4].classList).toHaveLength(1);
    expect(cells[4].classList).toContain("cell");
    expect(cells[4]).toHaveTextContent("3");
    expect(cells[5].classList).toHaveLength(2);
    expect(cells[5].classList).toContain("cell");
    expect(cells[5].classList).toContain("highlighted-contributor");
    expect(cells[5]).toHaveTextContent("4");
  });

  it('should highlight two contributing cells, when there are two', () => {
    const item1 = new Item('item 1', 3, 5);
    const item2 = new Item('item 2', 2, 4);
    const row = [0, 1, 2, 3, 4];
    const hightlightCell = [
      new RetValue(4, BuildTableState.CSS_CONTRIBUTING, CellType.contributingCellAbove), 
      new RetValue(2, BuildTableState.CSS_CONTRIBUTING, CellType.contributingCellLeftOverCapacity)];
    const ref = jest.fn();
    render(<table><tbody><SolutionTableRow
      cellKey="key"
      row={row}
      item={item1}
      highlightcells={hightlightCell}
      currentItem={item2}
      measureCellRef={ref}
      rowIndex={1}
    /></tbody></table>);

    const trRow = screen.queryAllByRole("row");
    const cells = within(trRow[0]).getAllByRole("cell");
    expect(cells).toHaveLength(6);
    expect(cells[0]).toHaveTextContent("item 1(v: 3 w: 5)");
    expect(cells[1].classList).toHaveLength(2);
    expect(cells[1].classList).toContain("muted");
    expect(cells[1].classList).toContain("cell");
    expect(cells[1]).toHaveTextContent("0");
    expect(cells[2].classList).toHaveLength(1);
    expect(cells[2].classList).toContain("cell");
    expect(cells[2]).toHaveTextContent("1");
    expect(cells[3].classList).toHaveLength(2);
    expect(cells[3].classList).toContain("cell");
    expect(cells[3].classList).toContain("highlighted-contributor");
    expect(cells[3]).toHaveTextContent("2");
    expect(cells[4].classList).toHaveLength(1);
    expect(cells[4].classList).toContain("cell");
    expect(cells[4]).toHaveTextContent("3");
    expect(cells[5].classList).toHaveLength(2);
    expect(cells[5].classList).toContain("cell");
    expect(cells[5].classList).toContain("highlighted-contributor");
    expect(cells[5]).toHaveTextContent("4");
  });

  it('should format float values to one decimal place', () => {
    const item = new Item('item 1', 3, 5);
    const row = [0, 1.9876, 2.41, 3.1, 4];
    const hightlightCell = 
      new RetValue(4, BuildTableState.CSS_CONTRIBUTING, CellType.contributingCellAbove);
    const ref = jest.fn();
    render(<table><tbody><SolutionTableRow
      cellKey="key"
      row={row}
      item={item}
      highlightcells={hightlightCell}
      currentItem={item}
      measureCellRef={ref}
      rowIndex={1}
    /></tbody></table>);

    const trRow = screen.queryAllByRole("row");
    const cells = within(trRow[0]).getAllByRole("cell");
    expect(cells).toHaveLength(6);
    expect(cells[0]).toHaveTextContent("item 1(v: 3 w: 5)");
    expect(cells[1]).toHaveTextContent("0");
    expect(cells[2]).toHaveTextContent("1.9");
    expect(cells[3]).toHaveTextContent("2.4");
    expect(cells[4]).toHaveTextContent("3.1");
    expect(cells[5]).toHaveTextContent("4");
  });
})
