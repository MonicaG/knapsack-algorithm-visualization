import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { TITLE_STEP_2 } from './components/solution/SolutionController'


describe('integration test between screens', () => {
  it('should display the Knapsack Capacity element', () => {
    render(<App />);
    const capacity = screen.getByLabelText(/Knapsack Capacity/i);
    expect(capacity).toBeInTheDocument();
  });

  it('passes a modified Knapsack Capacity value to the Solutions Table', async () => {

    render(<App />);

    expect(await screen.findByRole("spinbutton", { name: /knapsack capacity/i })).toHaveValue(5);

    userEvent.clear(screen.getByRole("spinbutton", { name: /knapsack capacity/i }));
    userEvent.type(screen.getByRole("spinbutton", { name: /knapsack capacity/i }), '4');


    expect(screen.getByRole("spinbutton", { name: /knapsack capacity/i })).toHaveValue(4);

    userEvent.click(screen.getByRole("button", { name: /calculate/i }))

    expect(await screen.findByText(TITLE_STEP_2)).toBeInTheDocument();

    const allRows = screen.getAllByRole("row");
    const capacityRow = allRows[0];
    const capacityRowCells = within(capacityRow).getAllByRole("columnheader");

    expect(capacityRowCells.length).toBe(6);
    expect(within(capacityRowCells[0]).queryByText(/\S/)).not.toBeInTheDocument();
    expect(within(capacityRowCells[1]).getByText(/0/)).toBeInTheDocument();
    expect(within(capacityRowCells[2]).getByText(/1/)).toBeInTheDocument();
    expect(within(capacityRowCells[3]).getByText(/2/)).toBeInTheDocument();
    expect(within(capacityRowCells[4]).getByText(/3/)).toBeInTheDocument();
    expect(within(capacityRowCells[5]).getByText(/4/)).toBeInTheDocument();
  });

  it('should add an item to the item list and pass the modified list to the next screen', async () => {

    render(<App />);
    const addButton = screen.getByRole("button", { name: /Add new item/i });
    expect(addButton).not.toBeDisabled();

    userEvent.click(addButton);

    //number is index based, so one lower than item name
    userEvent.clear(screen.getByRole("spinbutton", { name: /weight for item 3/i }));
    userEvent.type(screen.getByRole("spinbutton", { name: /weight for item 3/i }), '5');

    userEvent.clear(screen.getByRole("spinbutton", { name: /value for item 3/i }));
    userEvent.type(screen.getByRole("spinbutton", { name: /value for item 3/i }), '6');

    expect(screen.getByDisplayValue(/item 1/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/item 2/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/item 3/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/item 4/)).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /calculate/i }));

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
    render(<App />);
    const deleteButton = screen.getByLabelText('Delete item item 2')

    userEvent.click(deleteButton)

    expect(screen.getByLabelText('Delete item item 1')).toBeInTheDocument();
    expect(screen.queryByLabelText('Delete item item 2')).toBeNull();
    expect(screen.getByLabelText('Delete item item 3')).toBeInTheDocument();


    userEvent.click(screen.getByRole("button", { name: /calculate/i }));

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
    render(<App />);
    const addButton = screen.getByRole("button", { name: /Add new item/i });
    expect(addButton).not.toBeDisabled();


    userEvent.click(addButton)

    //number is index based, so one lower than item name
    userEvent.clear(screen.getByRole("spinbutton", { name: /weight for item 3/i }));
    userEvent.type(screen.getByRole("spinbutton", { name: /weight for item 3/i }), '5');

    userEvent.clear(screen.getByRole("spinbutton", { name: /value for item 3/i }));
    userEvent.type(screen.getByRole("spinbutton", { name: /value for item 3/i }), '6');


    const deleteButton = screen.getByLabelText('Delete item item 3')

    userEvent.click(deleteButton)

    expect(await screen.findByLabelText('Delete item item 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete item item 2')).toBeInTheDocument();
    expect(screen.queryByLabelText('Delete item item 3')).toBeNull();
    expect(screen.getByLabelText('Delete item item 4')).toBeInTheDocument();


    userEvent.click(screen.getByRole("button", { name: /calculate/i }));
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
});

