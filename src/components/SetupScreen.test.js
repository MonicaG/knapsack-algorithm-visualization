import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SetupScreen from './SetupScreen';
import Item from './../models/Item'


describe('test the setup screen', () => {
  let initItems = [
    new Item('item 1', 11, 1),
    new Item('item 2', 7, 5),
    new Item('item 3', 9, 2)
  ];
  
  const submitBtnNameQuery =  /Start/i;

  it('should invalidate the capacity element when the number is too low', async () => {
    const user = userEvent.setup();;
    const mockDispatch = jest.fn();
    render(<SetupScreen items={initItems} dispatch={mockDispatch} />);

    await user.type(screen.getByRole("spinbutton", { name: /knapsack capacity/i }), '0')
    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));
    
    expect(await screen.findByRole("spinbutton", { name: /knapsack capacity/i })).toBeInvalid();
    expect(await screen.findByRole("button", {name: submitBtnNameQuery})).toBeEnabled();
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
  });

  it('should invalidate the capacity element when the number is too high', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();
    render(<SetupScreen items={initItems} dispatch={mockDispatch} />);

    await user.type(screen.getByRole("spinbutton", { name: /knapsack capacity/i }), '11')
    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));

    expect(await screen.findByRole("spinbutton", { name: /knapsack capacity/i })).toBeInvalid();
    expect(await screen.findByRole("button", {name: submitBtnNameQuery})).toBeEnabled();
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });

  });

  it('should call the dispatch on the happy path', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();
    render(<SetupScreen items={initItems} dispatch={mockDispatch} />);
    expect(screen.getByRole("spinbutton", { name: /knapsack capacity/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('item 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('item 2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('item 3')).toBeInTheDocument();
   
    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
  });

  it('should disable the add button once the max number of items is reached', () => {
    const mockDispatch = jest.fn();
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
    render(<SetupScreen items={maxItems} dispatch={mockDispatch}  />);
    expect(screen.getByRole("button", {name: /Add new item/i})).toBeDisabled();
  });

  it('should disable the start button if all items are deleted', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();

    render(<SetupScreen items={initItems} dispatch={mockDispatch}  />);

    await user.click(screen.getByLabelText('Delete item item 1'))
    await user.click(screen.getByLabelText('Delete item item 2'))
    await user.click(screen.getByLabelText('Delete item item 3'))

    expect(screen.queryByLabelText('Delete item item 1')).toBeNull();
    expect(screen.queryByLabelText('Delete item item 2')).toBeNull();
    expect(screen.queryByLabelText('Delete item item 3')).toBeNull();

    expect(screen.getByRole("button", {name: submitBtnNameQuery})).toBeDisabled();
  });

  it('should add a new default item when the add new item button is clicked', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();

    render(<SetupScreen items={initItems} dispatch={mockDispatch}  />);
    expect(screen.queryByDisplayValue('item 4')).toBeNull();
    await user.click(screen.getByRole("button", {name: /Add new item/i}));
    expect(screen.getByDisplayValue('item 4')).toBeInTheDocument();

  });

  it('should not allow values that exceed the item weight and value limits', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();

    render(<SetupScreen items={initItems} dispatch={mockDispatch}  />);
  
    await user.clear(screen.getByRole("spinbutton", { name: /weight for item 2/i }));
    await user.type(screen.getByRole("spinbutton", { name: /weight for item 2/i }),  '11' )

    await user.clear(screen.getByRole("spinbutton", { name: /value for item 2/i }));
    await user.type(screen.getByRole("spinbutton", { name: /value for item 2/i }),  '51' )
  
    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));


    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
    for(let i=0; i < alerts.length; i++) {
      expect(within(alerts[i]).getByText(/Please enter a smaller number/i)).toBeInTheDocument();
    }

    expect(await screen.findByRole("spinbutton", { name: /weight for item 2/i })).toBeInvalid();
    expect(await screen.findByRole("spinbutton", { name: /value for item 2/i })).toBeInvalid();
   
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
  });

  it('should not allow values that are less than the minimum amounts for item weight and value', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();
    
    render(<SetupScreen items={initItems} dispatch={mockDispatch}  />);

    await user.clear(screen.getByRole("spinbutton", { name: /weight for item 2/i }));
    await user.type(screen.getByRole("spinbutton", { name: /weight for item 2/i }),  '0' )
    
    await user.clear(screen.getByRole("spinbutton", { name: /value for item 2/i }));
    await user.type(screen.getByRole("spinbutton", { name: /value for item 2/i }),  '-1' )

    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);

    for(let i=0; i < alerts.length; i++) {
      expect(within(alerts[i]).getByText(/Please enter a larger number/i)).toBeInTheDocument();
    }

    expect(await screen.findByRole("spinbutton", { name: /weight for item 2/i })).toBeInvalid();
    expect(await screen.findByRole("spinbutton", { name: /value for item 2/i })).toBeInvalid();
    
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
    
  });

  it('should not allow duplicate item names', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();

    render(<SetupScreen items={initItems} dispatch={mockDispatch}  />);

    let itemNameField = screen.getByDisplayValue("item 2");
    await user.clear(itemNameField);
    await user.type(itemNameField, "item 1")

    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);

    for(let i=0; i < alerts.length; i++) {
      expect(within(alerts[i]).getByText(/Please enter a unique item name/i)).toBeInTheDocument();
    }
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
    
  });

  it('should treat item names that are the same but with different cases as duplicates', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();

    render(<SetupScreen items={initItems} dispatch={mockDispatch}  />);
    let itemNameField = screen.getByDisplayValue("item 1");
    await user.clear(itemNameField);
    await user.type(itemNameField, "ITEM 2")

    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);

    for(let i=0; i < alerts.length; i++) {
      expect(within(alerts[i]).getByText(/Please enter a unique item name/i)).toBeInTheDocument();
    }
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
    
  });

  it('should treat item names that are the same but with leading/trailing spaces as duplicates', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();
    
    render(<SetupScreen items={initItems} dispatch={mockDispatch}  />);

    let itemNameField = screen.getByDisplayValue("item 1");
    await user.clear(itemNameField);
    await user.type(itemNameField, " item 2 ")

    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);

    for(let i=0; i < alerts.length; i++) {
      expect(within(alerts[i]).getByText(/Please enter a unique item name/i)).toBeInTheDocument();
    }
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
   
  });

  it('should not accept missing item name', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();
    
    render(<SetupScreen items={initItems} dispatch={mockDispatch}  />);

    let itemNameField = screen.getByDisplayValue("item 1");
    await user.clear(itemNameField);

    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
    expect(within(alerts[0]).getByText(/Please enter an item name/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });

  });

  it('should not accept items names consisting only of white space', async () => {
    const user = userEvent.setup();
    const mockDispatch = jest.fn();

    render(<SetupScreen items={initItems} dispatch={mockDispatch}  />);

    let itemNameField = screen.getByDisplayValue("item 1");
    await user.clear(itemNameField);
    await user.type(itemNameField, "  ")

    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
    expect(within(alerts[0]).getByText(/Please enter an item name/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(0);
    });
  });

});

