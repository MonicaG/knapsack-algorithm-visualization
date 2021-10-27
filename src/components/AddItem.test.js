import AddItem from "./AddItem";
import Item from './../models/Item'
import { screen, render, fireEvent, within, waitFor, act} from '@testing-library/react';
import "@testing-library/jest-dom";
import {actionTypes} from '../App';


describe('AddItem Form', () => {

  let initItems = [
    new Item('item 1', 11, 1),
    new Item('item 2', 7, 5),
    new Item('item 3', 9, 2)
  ];


  it('should display the default fields', () => {
    render(<AddItem  />);
    expect(screen.getByPlaceholderText("Enter item name")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: /item value/i })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: /item weight/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save Item/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  it('should not allow values that exceed the item weight and value limits', async () => {
    const mockDispatch = jest.fn();
    const mockSetShowAddRow = jest.fn();

    render(<AddItem items={initItems} dispatch={mockDispatch} setShowAddRow={mockSetShowAddRow}/>);
    
    fireEvent.input(screen.getByPlaceholderText("Enter item name"), {
      target: {value: "item 4"}
    });

    fireEvent.input(screen.getByRole("spinbutton", { name: /item weight/i }), {
      target: { value: 11 }
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: /item value/i }), {
      target: { value: 51 }
    });
  
    fireEvent.submit(screen.getByRole("button", { name: /Save Item/i }));
    
    expect(await screen.findAllByRole("alert")).toHaveLength(2);
    expect(mockDispatch).not.toBeCalled();
    expect(mockSetShowAddRow).not.toBeCalled();
  });

  it('should not allow values that are less than the minimum amounts for item weight and value', async () => {
    const mockDispatch = jest.fn();
    const mockSetShowAddRow = jest.fn();

    render(<AddItem items={initItems} dispatch={mockDispatch} setShowAddRow={mockSetShowAddRow}/>);
    
    fireEvent.input(screen.getByPlaceholderText("Enter item name"), {
      target: {value: "item 4"}
    });

    fireEvent.input(screen.getByRole("spinbutton", { name: /item weight/i }), {
      target: { value: 0 }
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: /item value/i }), {
      target: { value: -1 }
    });
  
    fireEvent.submit(screen.getByRole("button", { name: /Save Item/i }));
    
    expect(await screen.findAllByRole("alert")).toHaveLength(2);
    expect(mockDispatch).not.toBeCalled();
    expect(mockSetShowAddRow).not.toBeCalled();
  });

  it('should not allow duplicate item names', async () => {
    const mockDispatch = jest.fn();
    const mockSetShowAddRow = jest.fn();

    render(<AddItem items={initItems} dispatch={mockDispatch} setShowAddRow={mockSetShowAddRow}/>);
    
    fireEvent.input(screen.getByPlaceholderText("Enter item name"), {
      target: {value: "item 2"}
    });

    fireEvent.input(screen.getByRole("spinbutton", { name: /item weight/i }), {
      target: { value: 5 }
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: /item value/i }), {
      target: { value: 6 }
    });
  
    fireEvent.submit(screen.getByRole("button", { name: /Save Item/i }));
    
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);

    const alert = alerts[0];
    expect(within(alert).getByText(/Please enter a unique item name/i)).toBeInTheDocument();
    expect(mockDispatch).not.toBeCalled();
    expect(mockSetShowAddRow).not.toBeCalled();
  });

  it('should treat item names that are the same but with different cases as duplicates', async () => {
    const mockDispatch = jest.fn();
    const mockSetShowAddRow = jest.fn();

    render(<AddItem items={initItems} dispatch={mockDispatch} setShowAddRow={mockSetShowAddRow}/>);
    
    fireEvent.input(screen.getByPlaceholderText("Enter item name"), {
      target: {value: "ITEM 1"}
    });

    fireEvent.input(screen.getByRole("spinbutton", { name: /item weight/i }), {
      target: { value: 5 }
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: /item value/i }), {
      target: { value: 6 }
    });
  
    fireEvent.submit(screen.getByRole("button", { name: /Save Item/i }));
    
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);

    const alert = alerts[0];
    expect(within(alert).getByText(/Please enter a unique item name/i)).toBeInTheDocument();
    expect(mockDispatch).not.toBeCalled();
    expect(mockSetShowAddRow).not.toBeCalled();
  });

  it('should treat item names that are the same but with leading/trailing spaces as duplicates', async () => {
    const mockDispatch = jest.fn();
    const mockSetShowAddRow = jest.fn();

    render(<AddItem items={initItems} dispatch={mockDispatch} setShowAddRow={mockSetShowAddRow}/>);
    
    fireEvent.input(screen.getByPlaceholderText("Enter item name"), {
      target: {value: " item 1 "}
    });

    fireEvent.input(screen.getByRole("spinbutton", { name: /item weight/i }), {
      target: { value: 5 }
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: /item value/i }), {
      target: { value: 6 }
    });
  
    fireEvent.submit(screen.getByRole("button", { name: /Save Item/i }));
    
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);

    const alert = alerts[0];
    expect(within(alert).getByText(/Please enter a unique item name/i)).toBeInTheDocument();
    expect(mockDispatch).not.toBeCalled();
    expect(mockSetShowAddRow).not.toBeCalled();
  });

  it('should not accept missing item name', async () => {
    const mockDispatch = jest.fn();
    const mockSetShowAddRow = jest.fn();

    render(<AddItem items={initItems} dispatch={mockDispatch} setShowAddRow={mockSetShowAddRow}/>);
    

    fireEvent.input(screen.getByRole("spinbutton", { name: /item weight/i }), {
      target: { value: 5 }
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: /item value/i }), {
      target: { value: 6 }
    });
  
    fireEvent.submit(screen.getByRole("button", { name: /Save Item/i }));
    
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);

    const alert = alerts[0];
    expect(within(alert).getByText(/Please enter an item name/i)).toBeInTheDocument();
    expect(mockDispatch).not.toBeCalled();
    expect(mockSetShowAddRow).not.toBeCalled();
  });

  it('should not accept items names consisting only of white space', async () => {
    const mockDispatch = jest.fn();
    const mockSetShowAddRow = jest.fn();

    render(<AddItem items={initItems} dispatch={mockDispatch} setShowAddRow={mockSetShowAddRow}/>);
    

    fireEvent.input(screen.getByPlaceholderText("Enter item name"), {
      target: {value: " \r\n \t "}
    });

    fireEvent.input(screen.getByRole("spinbutton", { name: /item weight/i }), {
      target: { value: 5 }
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: /item value/i }), {
      target: { value: 6 }
    });
  
    fireEvent.submit(screen.getByRole("button", { name: /Save Item/i }));
    
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);

    const alert = alerts[0];
    expect(within(alert).getByText(/Please enter an item name/i)).toBeInTheDocument();
    expect(mockDispatch).not.toBeCalled();
    expect(mockSetShowAddRow).not.toBeCalled();
  });

  it('should submit validated form', async () => {
    const mockDispatch = jest.fn();
    const mockSetShowAddRow = jest.fn();

    render(<AddItem items={initItems} dispatch={mockDispatch} setShowAddRow={mockSetShowAddRow}/>);

    fireEvent.input(screen.getByPlaceholderText("Enter item name"), {
      target: {value: "new item"}
    });

    fireEvent.input(screen.getByRole("spinbutton", { name: /item weight/i }), {
      target: { value: 5 }
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: /item value/i }), {
      target: { value: 6 }
    });
  
    fireEvent.submit(screen.getByRole("button", { name: /Save Item/i }));
    
    const alerts = screen.queryAllByRole("alert");
    expect(alerts).toHaveLength(0);
    let newItem = new Item('new item', 6, 5);
    await waitFor(() =>
    expect(mockDispatch).toHaveBeenCalledWith({
      type: actionTypes.addItem, newItem: newItem
    }));
    await waitFor(() =>
    expect(mockSetShowAddRow).toHaveBeenCalledWith(false));
  });
});
