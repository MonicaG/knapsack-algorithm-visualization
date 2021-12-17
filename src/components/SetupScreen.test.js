import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SetupScreen from './SetupScreen';
import Item from './../models/Item'


describe('test the setup screen', () => {
  let initItems = [
    new Item('item 1', 11, 1),
    new Item('item 2', 7, 5),
    new Item('item 3', 9, 2)
  ];
  it('should invalidate the capacity element when the number is too low', async () => {
    const mockDispatch = jest.fn();
    const calculateBtnDisabled = false;
    render(<SetupScreen items={initItems} dispatch={mockDispatch} calculateBtnDisable={calculateBtnDisabled} />);

    userEvent.type(screen.getByRole("spinbutton", { name: /knapsack capacity/i }), '0')
    userEvent.click(screen.getByRole("button", { name: /calculate/i }));
    
    expect(await screen.findByRole("spinbutton", { name: /knapsack capacity/i })).toBeInvalid();
    expect(await screen.findByRole("button", {name: /calculate/i})).toBeEnabled();
    expect(mockDispatch).not.toBeCalled();
    

  });

  it('should invalidate the capacity element when the number is too high', async () => {
    const mockDispatch = jest.fn();
    const calculateBtnDisabled = false;
    render(<SetupScreen items={initItems} dispatch={mockDispatch} calculateBtnDisable={calculateBtnDisabled} />);

    userEvent.type(screen.getByRole("spinbutton", { name: /knapsack capacity/i }), '11')
    userEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(await screen.findByRole("spinbutton", { name: /knapsack capacity/i })).toBeInvalid();
    expect(await screen.findByRole("button", {name: /calculate/i})).toBeEnabled();
    expect(mockDispatch).not.toBeCalled();

  });

  it('should call the dispatch on the happy path', async () => {
    const mockDispatch = jest.fn();
    const calculateBtnDisabled = false;
    render(<SetupScreen items={initItems} dispatch={mockDispatch} calculateBtnDisable={calculateBtnDisabled} />);
    expect(screen.getByRole("spinbutton", { name: /knapsack capacity/i })).toBeInTheDocument();
    expect(screen.getByText(/item 1/)).toBeInTheDocument();
    expect(screen.getByText(/item 2/)).toBeInTheDocument();
    expect(screen.getByText(/item 3/)).toBeInTheDocument();
   
    userEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(await screen.findByRole("spinbutton", { name: /knapsack capacity/i })).toBeValid();
    expect(await screen.findByRole("button", {name: /calculate/i})).toBeEnabled();
    expect(mockDispatch).toBeCalled();
  });
})

