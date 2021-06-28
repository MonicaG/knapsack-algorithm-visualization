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
    new Item('ring', 250, 1),
    new Item('TV', 600, 5),
    new Item('cell phone', 400, 2)
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
          <Items items={items}
            setItems={setItems} />
          <Capacity
            capacity={capacity}
            onCapacityChange={handleCapacityChange}
          />
          <input type="button" value="Calculate" onClick={calculate} />
        </div>
        :
        <div>
          <SolutionTable
            capacity={capacity}
            items={items}
            knapsackTable={knapsackAlgorithm.solutionTable}
            solutionItems={knapsackAlgorithm.solutionItems}
          />
          <input type="button" value="Reset" onClick={() => { setShowEntryForm(true) }} />
        </div>
      }
    </div>
  );
}

export default App;
