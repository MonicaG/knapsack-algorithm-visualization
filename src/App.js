import './App.css';
import React, { useReducer } from "react";
import SetupScreen from './components/SetupScreen';
import { capacityDefaults } from './models/ValueDefaults';
import SolutionController from './components/solution/SolutionController';
import Item from './models/Item';
import KnapsackAlgorithm from './models/KnapsackAlgorithm'

const actionTypes = {
  calculate: 1,
  reset: 2,
}

function App() {

  const initItems = [
    new Item('item 1', 4, 2),
    new Item('item 2', 3, 1),
    new Item('item 3', 5, 3),
    // new Item('item 1', 49.9, 2),
    // new Item('item 2', 3, 1),
    // new Item('item 3', 37.8, 3),
    // new Item('item 4', 21, 1),
    // new Item('item 5', 11.3, 1),
    // new Item('item 6', 4, 2),
    // new Item('item 7', 5, 5),
    // new Item('item 8', 3, 7),
    // new Item('item 9', 1, 1),
    // new Item('item 10', 15, 9),
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
          items: action.items,
          capacity: action.capacityValue,
          knapsack: new KnapsackAlgorithm(action.items, action.capacityValue),
          showEntryForm: false,
        };
      case actionTypes.reset:
        return {
          ...state,
          showEntryForm: true,
        };
      default:
        //@todo should default do something else?
        throw new Error();
    }
  }

  return (
    <div className="sm:p-6 bg-white">
      <h1 className="text-center text-3xl sm:text-6xl text-gray-600 mb-4 sm:mb-10">Knapsack Algorithm Visualization</h1>
      <div className="m-2 p-2 sm:m-4 sm:p-8 sm:bg-gradient-to-br sm:from-blue-50 sm:to-blue-200 bg-blue-100 rounded">
        <div className="border bg-white p-6 md:max-w-2xl md:mx-auto rounded ">
          {state.showEntryForm ?
            <SetupScreen 
              items={state.items} 
              dispatch={dispatch} 
            />
            :
            <div>
              <SolutionController
                knapsackAlgorithm={state.knapsack}
                appDispatch={dispatch}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
export { actionTypes };
