import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { TITLE_STEP_2 } from './components/solution/SolutionController'

window.scrollTo = jest.fn()
const submitBtnNameQuery =  /Start/i;

describe('integration test between screens', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  
  it('should display the Knapsack Capacity element', () => {
    render(<App />);
    const capacity = screen.getByLabelText(/Knapsack Capacity/i);
    expect(capacity).toBeInTheDocument();
  });

  it('passes a modified Knapsack Capacity value to the Solutions Table', async () => {
    const user = userEvent.setup()
    render(<App />);

    expect(await screen.findByRole("spinbutton", { name: /knapsack capacity/i })).toHaveValue(5);

    await user.clear(screen.getByRole("spinbutton", { name: /knapsack capacity/i }));
    await user.type(screen.getByRole("spinbutton", { name: /knapsack capacity/i }), '4');


    expect(screen.getByRole("spinbutton", { name: /knapsack capacity/i })).toHaveValue(4);

    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }))

    expect(await screen.findByText(TITLE_STEP_2)).toBeInTheDocument();

    const allRows = screen.getAllByRole("row");
    const capacityRow = allRows[0];
    const capacityRowCells = within(capacityRow).getAllByRole("columnheader");

    expect(capacityRowCells.length).toBe(6);
    expect(within(capacityRowCells[0]).queryByText(/\S/)).not.toBeInTheDocument();
    expect(within(within(capacityRowCells[1]).getByLabelText("capacity value")).getByText(/0/)).toBeInTheDocument();
    expect(within(within(capacityRowCells[2]).getByLabelText("capacity value")).getByText(/1/)).toBeInTheDocument();
    expect(within(within(capacityRowCells[3]).getByLabelText("capacity value")).getByText(/2/)).toBeInTheDocument();
    expect(within(within(capacityRowCells[4]).getByLabelText("capacity value")).getByText(/3/)).toBeInTheDocument();
    expect(within(within(capacityRowCells[5]).getByLabelText("capacity value")).getByText(/4/)).toBeInTheDocument();
  });

  it('should add an item to the item list and pass the modified list to the next screen', async () => {
    const user = userEvent.setup()
    render(<App />);
    const addButton = screen.getByRole("button", { name: /Add new item/i });
    expect(addButton).not.toBeDisabled();

    await user.click(addButton);

    //number is index based, so one lower than item name
    await user.clear(screen.getByRole("spinbutton", { name: /weight for item 3/i }));
    await user.type(screen.getByRole("spinbutton", { name: /weight for item 3/i }), '5');

    await user.clear(screen.getByRole("spinbutton", { name: /value for item 3/i }));
    await user.type(screen.getByRole("spinbutton", { name: /value for item 3/i }), '6');

    expect(screen.getByDisplayValue(/item 1/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/item 2/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/item 3/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/item 4/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));

    expect(await screen.findByText(TITLE_STEP_2)).toBeInTheDocument();

    const allRows = screen.getAllByRole("row");
    expect(allRows.length).toBe(6);

    const firstItemRow = allRows[2];
    const firstItemRowCells = within(firstItemRow).getAllByRole("cell");
    expect(within(firstItemRowCells[0]).getByText(/\s*item 1\s*/i)).toBeInTheDocument();

    const thirdItemRow = allRows[3];
    const thirdItemRowCells = within(thirdItemRow).getAllByRole("cell");
    expect(within(thirdItemRowCells[0]).getByText(/\s*item 2\s*/i)).toBeInTheDocument();

    const fourthItemRow = allRows[4];
    const fourthItemRowCells = within(fourthItemRow).getAllByRole("cell");
    expect(within(fourthItemRowCells[0]).getByText(/\s*item 3\s*/i)).toBeInTheDocument();


    const fifthItemRow = allRows[5];
    const fifthItemRowCells = within(fifthItemRow).getAllByRole("cell");
    expect(within(fifthItemRowCells[0]).getByText(/\s*item 4\s*/i)).toBeInTheDocument();

  });

  it('should delete an item from the item list and pass the modified list to the next screen', async () => {
    const user = userEvent.setup()
    render(<App />);
    const deleteButton = screen.getByLabelText('Delete item item 2')

    await user.click(deleteButton)

    expect(screen.getByLabelText('Delete item item 1')).toBeInTheDocument();
    expect(screen.queryByLabelText('Delete item item 2')).toBeNull();
    expect(screen.getByLabelText('Delete item item 3')).toBeInTheDocument();


    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));

    expect(await screen.findByText(TITLE_STEP_2)).toBeInTheDocument();

    const allRows = screen.getAllByRole("row");
    expect(allRows.length).toBe(4);

    const firstItemRow = allRows[2];
    const firstItemRowCells = within(firstItemRow).getAllByRole("cell");
    expect(within(firstItemRowCells[0]).getByText(/\s*item 1\s*/i)).toBeInTheDocument();

    const secondItemRow = allRows[3];
    const secondItemRowCells = within(secondItemRow).getAllByRole("cell");
    expect(within(secondItemRowCells[0]).getByText(/\s*item 3\s*/i)).toBeInTheDocument();

  });

  it('should add and delete items from the item list and pass the modified list to the next screen', async () => {
    const user = userEvent.setup()
    render(<App />);
    const addButton = screen.getByRole("button", { name: /Add new item/i });
    expect(addButton).not.toBeDisabled();


    await user.click(addButton)

    //number is index based, so one lower than item name
    await user.clear(screen.getByRole("spinbutton", { name: /weight for item 3/i }));
    await user.type(screen.getByRole("spinbutton", { name: /weight for item 3/i }), '5');

    await user.clear(screen.getByRole("spinbutton", { name: /value for item 3/i }));
    await user.type(screen.getByRole("spinbutton", { name: /value for item 3/i }), '6');


    const deleteButton = screen.getByLabelText('Delete item item 3')

    await user.click(deleteButton)

    expect(await screen.findByLabelText('Delete item item 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete item item 2')).toBeInTheDocument();
    expect(screen.queryByLabelText('Delete item item 3')).toBeNull();
    expect(screen.getByLabelText('Delete item item 4')).toBeInTheDocument();


    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));
    expect(await screen.findByText(TITLE_STEP_2)).toBeInTheDocument();


    const allRows = screen.getAllByRole("row");
    expect(allRows.length).toBe(5);

    const firstItemRow = allRows[2];
    const firstItemRowCells = within(firstItemRow).getAllByRole("cell");
    expect(within(firstItemRowCells[0]).getByText(/\s*item 1\s*/i)).toBeInTheDocument();

    const secondItemRow = allRows[3];
    const secondItemRowCells = within(secondItemRow).getAllByRole("cell");
    expect(within(secondItemRowCells[0]).getByText(/\s*item 2\s*/i)).toBeInTheDocument();

    const thirdItemRow = allRows[4];
    const thirdItemRowCells = within(thirdItemRow).getAllByRole("cell");
    expect(within(thirdItemRowCells[0]).getByText(/\s*item 4\s*/i)).toBeInTheDocument();

  });

  it('should remember the values the user entered when the reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByRole("spinbutton", { name: /knapsack capacity/i })).toHaveValue(5);

    await user.clear(screen.getByRole("spinbutton", { name: /knapsack capacity/i }));
    await user.type(screen.getByRole("spinbutton", { name: /knapsack capacity/i }), '6');


    expect(screen.getByRole("spinbutton", { name: /knapsack capacity/i })).toHaveValue(6);
    const addButton = screen.getByRole("button", { name: /Add new item/i });
    expect(addButton).not.toBeDisabled();

    await user.click(addButton);

    //number is index based, so one lower than item name
    await user.clear(screen.getByRole("spinbutton", { name: /weight for item 3/i }));
    await user.type(screen.getByRole("spinbutton", { name: /weight for item 3/i }), '5');

    await user.clear(screen.getByRole("spinbutton", { name: /value for item 3/i }));
    await user.type(screen.getByRole("spinbutton", { name: /value for item 3/i }), '10');


    await user.click(screen.getByRole("button", { name: submitBtnNameQuery }));
    expect(await screen.findByText(TITLE_STEP_2)).toBeInTheDocument();

    const resetButton = screen.getByRole("button", {name: /Reset/i});
    await user.click(resetButton);
    expect(await screen.findByRole("spinbutton", { name: /knapsack capacity/i })).toHaveValue(6);
    
    expect(await screen.findByRole("spinbutton", { name: /weight for item 3/i })).toHaveValue(5);
    expect(await screen.findByRole("spinbutton", { name: /value for item 3/i })).toHaveValue(10);

    expect(await screen.findByRole("spinbutton", { name: /weight for item 2/i })).toHaveValue(3);
    expect(await screen.findByRole("spinbutton", { name: /value for item 2/i })).toHaveValue(5);

    expect(await screen.findByRole("spinbutton", { name: /weight for item 1/i })).toHaveValue(1);
    expect(await screen.findByRole("spinbutton", { name: /value for item 1/i })).toHaveValue(3);

    expect(await screen.findByRole("spinbutton", { name: /weight for item 0/i })).toHaveValue(2);
    expect(await screen.findByRole("spinbutton", { name: /value for item 0/i })).toHaveValue(4);
  });
});

