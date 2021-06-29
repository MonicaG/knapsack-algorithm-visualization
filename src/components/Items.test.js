import Items from "./Items";
import Item from './../models/Item'
import { render, fireEvent, within } from '@testing-library/react';


describe('the initial screen', () => {

  let initItems = [
    new Item('item 1', 11, 1),
    new Item('item 2', 7, 5),
    new Item('item 3', 9, 2)
  ];

  test('if the initial screen does not show the add item form', () => {
    const { getByText, getAllByRole } = render(<Items items={initItems} setItems={()=>{}} />);
    const rows = getAllByRole("row");
    expect(rows.length).toBe(4);
    const headerCells = within(rows[0]).getAllByRole("cell");
    expect(headerCells.length).toBe(3);
    expect(within(headerCells[0]).getByText('Item Name')).toBeTruthy();
    expect(within(headerCells[1]).getByText('Value')).toBeTruthy();
    expect(within(headerCells[2]).getByText('Weight')).toBeTruthy();
    
    const firstItemCells = within(rows[1]).getAllByRole("cell");
    expect(firstItemCells.length).toBe(4);
    expect(within(firstItemCells[0]).getByText('item 1')).toBeTruthy();
    expect(within(firstItemCells[1]).getByText('11')).toBeTruthy();
    expect(within(firstItemCells[2]).getByText('1')).toBeTruthy();
    expect(within(firstItemCells[3]).getByRole('button')).toBeTruthy();

    const secondItemCells = within(rows[2]).getAllByRole("cell");
    expect(secondItemCells.length).toBe(4);
    expect(within(secondItemCells[0]).getByText('item 2')).toBeTruthy();
    expect(within(secondItemCells[1]).getByText('7')).toBeTruthy();
    expect(within(secondItemCells[2]).getByText('5')).toBeTruthy();
    expect(within(secondItemCells[3]).getByRole('button')).toBeTruthy();

    const thirdItemCells = within(rows[3]).getAllByRole("cell");
    expect(thirdItemCells.length).toBe(4);
    expect(within(thirdItemCells[0]).getByText('item 3')).toBeTruthy();
    expect(within(thirdItemCells[1]).getByText('9')).toBeTruthy();
    expect(within(thirdItemCells[2]).getByText('2')).toBeTruthy();
    expect(within(thirdItemCells[3]).getByRole('button')).toBeTruthy();
    
    expect(getByText("+")).toBeInTheDocument();

    expect(getAllByRole('button').length).toBe(4);
    
  });
});

describe('clicking buttons', () => {

  let initItems = [
    new Item('item 1', 11, 1),
    new Item('item 2', 7, 5),
    new Item('item 3', 9, 2)
  ];

  let setItems = ()=>{};

  test('if clicking the plus button displays the form', () => {
    const { getByText, getAllByRole, getByRole } = render(<Items items={initItems} setItems={setItems}  />);
    fireEvent.click(getByText('+'))
    expect(getByRole("textbox")).toBeInTheDocument();
    expect(getAllByRole("spinbutton").length).toBe(2);
    expect(getAllByRole("button").length).toBe(6)
  });

  test('if clicking the "cancel" button removes the form', () => {
    const { getByText, queryByRole, queryAllByRole, getAllByRole} = render(<Items items={initItems} setItems={setItems}  />);
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('cancel'));
    expect(queryByRole('textbox')).not.toBeInTheDocument();
    expect(queryAllByRole('spinbutton').length).toBe(0);
    expect(getAllByRole("button").length).toBe(4)
  });

});