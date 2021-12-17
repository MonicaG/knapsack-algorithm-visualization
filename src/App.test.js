import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';


describe('integration test between screens', () => {
  it('should display the Knapsack Capacity element', () => {
    render(<App />);
    const capacity = screen.getByText(/Knapsack Capacity:/i);
    expect(capacity).toBeInTheDocument();
  });

  it('passes a modified Knapsack Capacity value to the Solutions Table', async () => {

    render(<App />);

    expect(await screen.findByRole("spinbutton", { name: /knapsack capacity/i })).toHaveValue(5);

    userEvent.clear(screen.getByRole("spinbutton", { name: /knapsack capacity/i }));
    userEvent.type(screen.getByRole("spinbutton", { name: /knapsack capacity/i }), '4');


    expect(screen.getByRole("spinbutton", { name: /knapsack capacity/i })).toHaveValue(4);

    userEvent.click(screen.getByRole("button", { name: /calculate/i }))

    await waitFor(() => {
      const allRows = screen.getAllByRole("row");
      const capacityRow = allRows[0];
      const capacityRowCells = within(capacityRow).getAllByRole("cell");
      expect(capacityRowCells.length).toBe(6);
      expect(within(capacityRowCells[0]).getByText('')).toBeTruthy();
      expect(within(capacityRowCells[1]).getByText('0')).toBeTruthy();
      expect(within(capacityRowCells[2]).getByText('1')).toBeTruthy();
      expect(within(capacityRowCells[3]).getByText('2')).toBeTruthy();
      expect(within(capacityRowCells[4]).getByText('3')).toBeTruthy();
      expect(within(capacityRowCells[5]).getByText('4')).toBeTruthy();
    });
  });

  it('should add an item to the item list and pass the modified list to the next screen', async () => {

    render(<App />);
    const addButton = screen.getByRole("button", { name: /Add new item/i });
    expect(addButton).not.toBeDisabled();

    userEvent.click(addButton);

    userEvent.type(screen.getByPlaceholderText("Enter item name"), 'item 4');

    userEvent.clear(screen.getByRole("spinbutton", { name: /item weight/i }));
    userEvent.type(screen.getByRole("spinbutton", { name: /item weight/i }), '5');

    userEvent.clear(screen.getByRole("spinbutton", { name: /item value/i }));
    userEvent.type(screen.getByRole("spinbutton", { name: /item value/i }), '6');

    userEvent.click(screen.getByRole("button", { name: /Save Item/i }));

    await waitFor(() => {
      expect(screen.getByText(/item 1/)).toBeInTheDocument();
      expect(screen.getByText(/item 2/)).toBeInTheDocument();
      expect(screen.getByText(/item 3/)).toBeInTheDocument();
      expect(screen.getByText(/item 4/)).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('Calculate'));

    await waitFor(() => {
      const allRows = screen.getAllByRole("row");
      expect(allRows.length).toBe(6);

      const firstItemRow = allRows[2];
      const firstItemRowCells = within(firstItemRow).getAllByRole("cell");
      expect(within(firstItemRowCells[0]).getByText(/\s*item 1\s*/i)).toBeTruthy();

      const thirdItemRow = allRows[3];
      const thirdItemRowCells = within(thirdItemRow).getAllByRole("cell");
      expect(within(thirdItemRowCells[0]).getByText(/\s*item 2\s*/i)).toBeTruthy();

      const fourthItemRow = allRows[4];
      const fourthItemRowCells = within(fourthItemRow).getAllByRole("cell");
      expect(within(fourthItemRowCells[0]).getByText(/\s*item 3\s*/i)).toBeTruthy();


      const fifthItemRow = allRows[5];
      const fifthItemRowCells = within(fifthItemRow).getAllByRole("cell");
      expect(within(fifthItemRowCells[0]).getByText(/\s*item 4\s*/i)).toBeTruthy();
    });
  });

  it('should delete an item from the item list and pass the modified list to the next screen', async () => {
    render(<App />);
    const deleteButton = screen.getByLabelText('Delete item item 2')

    userEvent.click(deleteButton)

    expect(screen.getByLabelText('Delete item item 1')).toBeInTheDocument();
    expect(screen.queryByLabelText('Delete item item 2')).toBeNull();
    expect(screen.getByLabelText('Delete item item 3')).toBeInTheDocument();


    userEvent.click(screen.getByText('Calculate'))

    await waitFor(() => {
      const allRows = screen.getAllByRole("row");
      expect(allRows.length).toBe(4);

      const firstItemRow = allRows[2];
      const firstItemRowCells = within(firstItemRow).getAllByRole("cell");
      expect(within(firstItemRowCells[0]).getByText(/\s*item 1\s*/i)).toBeTruthy();

      const secondItemRow = allRows[3];
      const secondItemRowCells = within(secondItemRow).getAllByRole("cell");
      expect(within(secondItemRowCells[0]).getByText(/\s*item 3\s*/i)).toBeTruthy();
    });
  });

  it('should add and delete items from the item list and pass the modified list to the next screen', async () => {
    render(<App />);
    const addButton = screen.getByRole("button", { name: /Add new item/i });
    expect(addButton).not.toBeDisabled();


    userEvent.click(addButton)


    userEvent.type(screen.getByPlaceholderText("Enter item name"), 'item 4');

    userEvent.clear(screen.getByRole("spinbutton", { name: /item weight/i }));
    userEvent.type(screen.getByRole("spinbutton", { name: /item weight/i }), '5');

    userEvent.clear(screen.getByRole("spinbutton", { name: /item value/i }));
    userEvent.type(screen.getByRole("spinbutton", { name: /item value/i }), '6');

    userEvent.click(screen.getByRole("button", { name: /Save Item/i }));


    const deleteButton = screen.getByLabelText('Delete item item 3')

    userEvent.click(deleteButton)

    await waitFor(() => {
      expect(screen.getByLabelText('Delete item item 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Delete item item 2')).toBeInTheDocument();
      expect(screen.queryByLabelText('Delete item item 3')).toBeNull();
      expect(screen.getByLabelText('Delete item item 4')).toBeInTheDocument();
    });


    userEvent.click(screen.getByText('Calculate'))
    await waitFor(() => {
      const allRows = screen.getAllByRole("row");
      expect(allRows.length).toBe(5);

      const firstItemRow = allRows[2];
      const firstItemRowCells = within(firstItemRow).getAllByRole("cell");
      expect(within(firstItemRowCells[0]).getByText(/\s*item 1\s*/i)).toBeTruthy();

      const secondItemRow = allRows[3];
      const secondItemRowCells = within(secondItemRow).getAllByRole("cell");
      expect(within(secondItemRowCells[0]).getByText(/\s*item 2\s*/i)).toBeTruthy();

      const thirdItemRow = allRows[4];
      const thirdItemRowCells = within(thirdItemRow).getAllByRole("cell");
      expect(within(thirdItemRowCells[0]).getByText(/\s*item 4\s*/i)).toBeTruthy();
    });
  });

  // it('should disable the calculate button when the Add Item form is present.', async () => {
  //   render(<App />);

  //   expect(screen.getByRole("button", { name: /calculate/i })).toBeEnabled();
  //   userEvent.click(screen.getByRole("button", { name: /Add new item/i }))

  //   await waitFor(() => {
  //     expect(screen.getByPlaceholderText(/Enter item name/i)).toBeInTheDocument();
  //     expect(screen.getByRole("spinbutton", { name: /item weight/i })).toBeInTheDocument();
  //     expect(screen.getByRole("spinbutton", { name: /item value/i })).toBeInTheDocument();
  //     expect(screen.getByRole("button", { name: /calculate/i })).toBeDisabled();
  //   });
  // });

  // it('should close the add item form when the cancel button is pressed', async () => {
  //   render(<App />);

  //   expect(screen.getByRole("button", { name: /calculate/i })).toBeEnabled();
  //   userEvent.click(screen.getByRole("button", { name: /Add new item/i }));

  //   expect(screen.getByPlaceholderText(/Enter item name/i)).toBeInTheDocument();
  //   expect(screen.getByRole("spinbutton", { name: /item weight/i })).toBeInTheDocument();
  //   expect(screen.getByRole("spinbutton", { name: /item value/i })).toBeInTheDocument();
  //   expect(await screen.findByRole("button", { name: /calculate/i })).toBeDisabled();

  //   userEvent.click(screen.getByRole("button", { name: /cancel/i }))


  //   expect(screen.queryByPlaceholderText(/Enter item name/i)).not.toBeInTheDocument();
  //   expect(screen.queryByRole("spinbutton", { name: /item weight/i })).not.toBeInTheDocument();
  //   expect(screen.queryByRole("spinbutton", { name: /item value/i })).not.toBeInTheDocument();
  //   expect(screen.queryByRole("button", { name: /calculate/i })).toBeEnabled();
  // });

});

