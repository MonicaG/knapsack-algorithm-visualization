import './App.css';
import React, { useReducer } from "react";
import Items from './components/Items';
import Capacity from './components/Capacity'
import capacityDefaults from './models/CapacityDefaults';
import SolutionController from './components/solution/SolutionController';
import Item from './models/Item';
import KnapsackAlgorithm from './models/KnapsackAlgorithm'

const actionTypes = {
  calculate: 1,
  updateCapacity: 2,
  reset: 3,
  updateItems: 4,
  addItem: 5
}

function App() {

  const initItems = [
    new Item('item 1', 4, 2),
    new Item('item 2', 3, 1),
    new Item('item 3', 5, 3)
  ];


  const initialState = {
    capacity: capacityDefaults.defaultValue,
    items: initItems,
    knapsack: null,
    showEntryForm: true,
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case actionTypes.calculate:
        return {
          ...state,
          knapsack: new KnapsackAlgorithm(state.items, state.capacity),
          showEntryForm: false
        };
      case actionTypes.updateCapacity:
        return {
          ...state,
          capacity: action.capacityValue
        };
      case actionTypes.reset:
        return {
          ...state,
          showEntryForm: true
        };
      case actionTypes.updateItems:
        return {
          ...state,
          items: action.items
        }
      case actionTypes.addItem:
        return {
          ...state,
          items: [...state.items, action.newItem]
        }
      default:
        //@todo should default do something else?
        throw new Error();
    }
  }

  function handleCapacityChange(event) {
    const newValue = capacityDefaults.parseCapacity(event);
    dispatch({ type: actionTypes.updateCapacity, capacityValue: newValue });
  }


  return (
    <div className="p-6 bg-white">
      <h1 className="text-center text-6xl text-gray-600 mb-10">Knapsack Algorithm</h1>
      <div className="m-4 p-8 md:p-2 bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="border bg-white p-6 md:max-w-2xl md:mx-auto ">
          {state.showEntryForm ?
            <div className="flex flex-col">
              <h2 className="text-center text-2xl mb-6">Step 1: Setup</h2>
              <div className="mb-4 flex flex-row items-baseline space-x-4">
                <Capacity
                  capacity={state.capacity}
                  onCapacityChange={handleCapacityChange}
                />
              </div>  
                <label className="label2">Available Items</label>
                <Items items={state.items}
                  dispatch={dispatch} />
                <input className="btnBlue max-w-max place-self-center" type="button" value="Calculate" onClick={() => dispatch({ type: actionTypes.calculate })} />
            </div>
            :
            <div>
              <SolutionController
                knapsackAlgorithm={state.knapsack}
              />
              <input className="btnBlue" type="button" value="Reset" onClick={() => dispatch({ type: actionTypes.reset })} />
            </div>
          }
        </div>
      </div>
      <div className="m-4 text-base max-w-prose">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat pretium nibh ipsum consequat nisl vel. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Pulvinar pellentesque habitant morbi tristique senectus et. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Felis eget velit aliquet sagittis id consectetur. Eget dolor morbi non arcu. Lacus sed viverra tellus in hac habitasse platea. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Vitae et leo duis ut diam quam nulla porttitor massa. Turpis nunc eget lorem dolor sed viverra ipsum. Est pellentesque elit ullamcorper dignissim cras tincidunt. Laoreet non curabitur gravida arcu ac tortor dignissim convallis.</p>
        <p>Tellus id interdum velit laoreet. Nulla malesuada pellentesque elit eget gravida cum sociis. Vestibulum mattis ullamcorper velit sed ullamcorper morbi. Quis eleifend quam adipiscing vitae. In nulla posuere sollicitudin aliquam ultrices. Netus et malesuada fames ac turpis egestas. Lacus viverra vitae congue eu consequat ac felis donec et. Neque aliquam vestibulum morbi blandit cursus. Ante in nibh mauris cursus mattis molestie a iaculis. Leo vel orci porta non pulvinar neque laoreet suspendisse. A cras semper auctor neque vitae tempus quam. Ornare arcu dui vivamus arcu felis. Morbi quis commodo odio aenean sed. Tellus mauris a diam maecenas. Laoreet suspendisse interdum consectetur libero. At quis risus sed vulputate odio.</p>
        <p>At tempor commodo ullamcorper a lacus vestibulum sed arcu. Ut aliquam purus sit amet luctus. Sed blandit libero volutpat sed cras. Elementum nisi quis eleifend quam adipiscing vitae. Viverra accumsan in nisl nisi. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum. Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Odio morbi quis commodo odio aenean sed adipiscing diam donec. Sem nulla pharetra diam sit amet nisl suscipit adipiscing. Lacus vel facilisis volutpat est velit. Odio eu feugiat pretium nibh ipsum consequat nisl. Nibh sit amet commodo nulla facilisi nullam.</p>
      </div>
    </div>
  );
}

export default App;
export { actionTypes };
