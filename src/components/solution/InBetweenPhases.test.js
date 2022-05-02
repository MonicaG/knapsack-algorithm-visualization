import { render, screen, fireEvent } from "@testing-library/react";
import InBetweenPhases from "./InBetweenPhases";
import Item from "../../models/Item";
import KnapSackAlgorithm from "../../models/KnapsackAlgorithm";
import { solutionTableActionTypes as types } from './SolutionController';
import renderer from 'react-test-renderer';

describe('InBetweenPhases tests', () => {
  const mockDispatch = jest.fn();
  const items = [
    new Item('item1', 10, 3),
    new Item('item2', 20, 1),
    new Item('item3', 25, 2),
  ];
  const capacity = 5;
  const algorithm = new KnapSackAlgorithm(items, capacity);
  const state = {
    solutionIndex: 5,
    currentItemIndex: 3
  }

  it('should dispatch when the button is clicked', () => {
    render(<InBetweenPhases
      state={state}
      dispatch={mockDispatch}
      knapsackAlgorithm={algorithm} />);

    fireEvent.click(screen.getByRole('button', { name: /Find Solution Items/i }))
    expect(mockDispatch).toHaveBeenCalledWith({
      type: types.STEP_FIND_NEXT_SOLUTION_ITEM,
      currentCapacity: capacity,
      solutionIndex: state.solutionIndex,
      instructions: "Press the \"Step\" button to find the items.",
      title: "Step 3: Find Solution",
    });
  });

  it('displays the explanation text', () => {
    const tree = renderer
      .create(<InBetweenPhases
        state={state}
        dispatch={mockDispatch}
        knapsackAlgorithm={algorithm} />)
      .toJSON();

    expect(tree).toMatchSnapshot()
  });

});