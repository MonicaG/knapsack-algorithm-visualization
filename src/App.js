import './App.css';
import React, { useReducer } from "react";
import Items from './components/Items';
import Capacity from './components/Capacity'
import capacityDefaults from './models/CapacityDefaults';
import SolutionTable from './components/solution/SolutionTable';
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
      case actionTypes.calculate :
        return { 
          ...state, 
          knapsack: new KnapsackAlgorithm(state.items, state.capacity),
          showEntryForm: false
        };
      case actionTypes.updateCapacity :
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
    dispatch({type: actionTypes.updateCapacity, capacityValue: newValue});
  }


  return (
    <div className="App">
      {state.showEntryForm ?
        <div>
          <Capacity
            capacity={state.capacity}
            onCapacityChange={handleCapacityChange}
          />
          <Items items={state.items}
            dispatch={dispatch} /> 
          <input type="button" value="Calculate" onClick={() => dispatch({type: actionTypes.calculate})} />
        </div>
        :
        <div>
          <SolutionTable
            knapsackAlgorithm={state.knapsack}
          />
          <input type="button" value="Reset" onClick={() => dispatch({type: actionTypes.reset})} />
        </div>
      }
    </div>
  );
}

export default App;
export {actionTypes};
