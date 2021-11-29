import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import App from './App';


describe('test the initial screen', () => {
  it('should display the Knapsack Capacity element', () => {
    render(<App />);
    const capacity = screen.getByText(/Knapsack Capacity:/i);
    expect(capacity).toBeInTheDocument();
  });

  it('passes a modified Knapsack Capacity value to the Solutions Table', async () => {
    const { getByLabelText, getByText, getAllByRole } = render(<App />);
    const capacityInput = getByLabelText('knapsack capacity')
    await waitFor(() => 
      fireEvent.change(capacityInput, { target: { value: '4' } })
    );
    expect(capacityInput.value).toBe('4');
    await waitFor(() => 
      fireEvent.click(getByText('Calculate'))
    );
    const allRows = getAllByRole("row");
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

  it('should add an item to the item list and pass the modified list to the next screen', async () => {

    render(<App />);
    const addButton = screen.getByRole("button", { name: /Add new item/i });
    expect(addButton).not.toBeDisabled();
    
    await waitFor(() =>
      fireEvent.click(addButton)
    );

    fireEvent.input(screen.getByPlaceholderText("Enter item name"), {
      target: { value: "item 4" }
    });

    fireEvent.input(screen.getByRole("spinbutton", { name: /item weight/i }), {
      target: { value: 5 }
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: /item value/i }), {
      target: { value: 6 }
    });

    await waitFor(() =>
      fireEvent.submit(screen.getByRole("button", { name: /Save Item/i }))
    );

    expect(screen.getByText(/item 1/)).toBeInTheDocument();
    expect(screen.getByText(/item 2/)).toBeInTheDocument();
    expect(screen.getByText(/item 3/)).toBeInTheDocument();
    expect(screen.getByText(/item 4/)).toBeInTheDocument();

    await waitFor(() =>
      fireEvent.click(screen.getByText('Calculate'))
    );
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

  it('should delete an item from the item list and pass the modified list to the next screen', async () => {
    render(<App />);
    const deleteButton = screen.getByLabelText('Delete item item 2')
    await waitFor(() =>
      fireEvent.click(deleteButton)
    );

    expect(screen.getByLabelText('Delete item item 1')).toBeInTheDocument();
    expect(screen.queryByLabelText('Delete item item 2')).toBeNull();
    expect(screen.getByLabelText('Delete item item 3')).toBeInTheDocument();

    await waitFor(() =>
      fireEvent.click(screen.getByText('Calculate'))
    );
    const allRows = screen.getAllByRole("row");
    expect(allRows.length).toBe(4);

    const firstItemRow = allRows[2];
    const firstItemRowCells = within(firstItemRow).getAllByRole("cell");
    expect(within(firstItemRowCells[0]).getByText(/\s*item 1\s*/i)).toBeTruthy();

    const secondItemRow = allRows[3];
    const secondItemRowCells = within(secondItemRow).getAllByRole("cell");
    expect(within(secondItemRowCells[0]).getByText(/\s*item 3\s*/i)).toBeTruthy();

  });

  it('should add and delete items from the item list and pass the modified list to the next screen', async () => {
    render(<App />);
    const addButton = screen.getByRole("button", { name: /Add new item/i });
    expect(addButton).not.toBeDisabled();

    await waitFor(() =>
      fireEvent.click(addButton)
    );

    fireEvent.input(screen.getByPlaceholderText("Enter item name"), {
      target: { value: "item 4" }
    });

    fireEvent.input(screen.getByRole("spinbutton", { name: /item weight/i }), {
      target: { value: 5 }
    });
    fireEvent.input(screen.getByRole("spinbutton", { name: /item value/i }), {
      target: { value: 6 }
    });

    await waitFor(() =>
      fireEvent.submit(screen.getByRole("button", { name: /Save Item/i }))
    );

    const deleteButton = screen.getByLabelText('Delete item item 3')
    await waitFor(() =>
      fireEvent.click(deleteButton)
    );

    expect(screen.getByLabelText('Delete item item 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete item item 2')).toBeInTheDocument();
    expect(screen.queryByLabelText('Delete item item 3')).toBeNull();
    expect(screen.getByLabelText('Delete item item 4')).toBeInTheDocument();

    await waitFor(() =>
      fireEvent.click(screen.getByText('Calculate'))
    );
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

