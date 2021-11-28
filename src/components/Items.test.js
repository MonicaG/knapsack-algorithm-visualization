import Items from "./Items";
import Item from './../models/Item'
import { render, fireEvent, within } from '@testing-library/react';


describe('the initial screen', () => {

  let initItems = [
    new Item('item 1', 11, 1),
    new Item('item 2', 7, 5),
    new Item('item 3', 9, 2)
  ];

  it('does not show the add item form', () => {
    const { getByRole, getAllByRole } = render(<Items items={initItems} setItems={()=>{}} />);
    const rows = getAllByRole("row");
    expect(rows.length).toBe(4);
    const headerCells = within(rows[0]).getAllByRole("columnheader");
    expect(headerCells.length).toBe(4);
    expect(within(headerCells[0]).getByText('Item Name')).toBeTruthy();
    expect(within(headerCells[1]).getByText('Value')).toBeTruthy();
    expect(within(headerCells[2]).getByText('Weight')).toBeTruthy();
    expect(headerCells[3]).toBeEmptyDOMElement();
    
    const firstItemCells = within(rows[1]).getAllByRole("cell");
    expect(firstItemCells.length).toBe(4);
    expect(within(firstItemCells[0]).getByText('item 1')).toBeTruthy();
    expect(within(firstItemCells[1]).getByText('11')).toBeTruthy();
    expect(within(firstItemCells[2]).getByText('1')).toBeTruthy();
    expect(within(firstItemCells[3]).getByRole('button', {name: /Delete item item 1/i})).toBeTruthy();

    const secondItemCells = within(rows[2]).getAllByRole("cell");
    expect(secondItemCells.length).toBe(4);
    expect(within(secondItemCells[0]).getByText('item 2')).toBeTruthy();
    expect(within(secondItemCells[1]).getByText('7')).toBeTruthy();
    expect(within(secondItemCells[2]).getByText('5')).toBeTruthy();
    expect(within(secondItemCells[3]).getByRole('button', {name: /Delete item item 2/i})).toBeTruthy();

    const thirdItemCells = within(rows[3]).getAllByRole("cell");
    expect(thirdItemCells.length).toBe(4);
    expect(within(thirdItemCells[0]).getByText('item 3')).toBeTruthy();
    expect(within(thirdItemCells[1]).getByText('9')).toBeTruthy();
    expect(within(thirdItemCells[2]).getByText('2')).toBeTruthy();
    expect(within(thirdItemCells[3]).getByRole('button', {name: /Delete item item 3/i})).toBeTruthy();
    
    expect(getByRole("button", { name: /Add new item/i })).toBeInTheDocument();

    expect(getAllByRole('button').length).toBe(4);
    
  });
});

describe('iteracting with the buttons', () => {

  let initItems = [
    new Item('item 1', 11, 1),
    new Item('item 2', 7, 5),
    new Item('item 3', 9, 2)
  ];

  let dispatch = ()=>{};

  it('displays the add form when the Add Button is clicked and removes the form when Cancel Button is clicked', () => {
    const { getAllByRole, getByRole, queryByRole, queryAllByRole } = render(<Items items={initItems} dispatch={dispatch}  />);
    const addButton = getByRole("button", { name: /Add new item/i });
    expect(addButton).not.toBeDisabled();
    fireEvent.click(addButton);
    expect(getByRole("textbox", {name: /new item name/i})).toBeInTheDocument();
    expect(getByRole("spinbutton", {name:/item value/i})).toBeInTheDocument();
    expect(getByRole("spinbutton", {name:/item weight/i})).toBeInTheDocument();
    expect(getAllByRole("button").length).toBe(5)
    expect(getByRole("button", {name: /Save Item/i})).toBeInTheDocument();
    expect(getByRole("button", {name: /Cancel/i})).toBeInTheDocument();
    expect(getAllByRole("button", {name: /Delete item item [123]/i}).length).toBe(3);
    expect(queryByRole("button", {name: /Add new item/i})).not.toBeInTheDocument();
    fireEvent.click(getByRole("button", {name: /Cancel/i}));
    expect(queryByRole('textbox')).not.toBeInTheDocument();
    expect(queryAllByRole('spinbutton').length).toBe(0);
    expect(getAllByRole("button").length).toBe(4)
    expect(getAllByRole("button", {name: /Delete item item [123]/i}).length).toBe(3);
    expect(getByRole("button", {name:/Add new item/i})).toBeInTheDocument();

  });

  it('should disable the add button once the max number of items is reached', () => {
    let maxItems = [
      ...initItems, 
      new Item('item 4', 2.5, 1),
      new Item('item 5', 1.2, 1),
      new Item('item 6', 3, 1),
      new Item('item 7', 3.7, 1),
      new Item('item 8', 2.1, 1),
      new Item('item 9', 4, 1),
      new Item('item 10', 5, 1)
    ]
    const { getByRole } = render(<Items items={maxItems} dispatch={dispatch}  />);
    expect(getByRole("button", {name: /Add new item/i})).toBeDisabled();
  });
});