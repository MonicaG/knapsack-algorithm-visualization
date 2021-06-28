import './App.css';
import React from "react";
import Items from './components/Items';
import Capacity from './components/Capacity'
import capacityDefaults from './models/CapacityDefaults';
import SolutionTable from './components/SolutionTable';
import Item from './models/Item';
import KnapsackAlgorithm from './models/KnapsackAlgorithm'

function App() {

  const initItems = [
    new Item('item 1', 11, 1),
    new Item('item 2', 7, 5),
    new Item('item 3', 9, 2)
  ];

  const [capacity, setCapacity] = React.useState(capacityDefaults.defaultValue);
  const [items, setItems] = React.useState(initItems);
  const [showEntryForm, setShowEntryForm] = React.useState(true);
  const [knapsackAlgorithm, setKnapsackAlgorithm] = React.useState();
  
  function calculate() {
    setKnapsackAlgorithm(new KnapsackAlgorithm(items, capacity));
    setShowEntryForm(false);
  }

  function handleCapacityChange(event) {
    setCapacity(capacityDefaults.parseCapacity(event))
  }

  return (
    <div className="App">
      {showEntryForm ?
        <div>
          <Capacity
            capacity={capacity}
            onCapacityChange={handleCapacityChange}
          />
          <Items items={items}
            setItems={setItems} />
          <input type="button" value="Calculate" onClick={calculate} />
        </div>
        :
        <div>
          <SolutionTable
            knapsackAlgorithm={knapsackAlgorithm}
          />
          <input type="button" value="Reset" onClick={() => { setShowEntryForm(true) }} />
        </div>
      }
    </div>
  );
}

export default App;
