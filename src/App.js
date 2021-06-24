import './App.css';
import React from "react";
import Items from './components/Items';
import Capacity from './components/Capacity'
import capacityDefaults from './models/CapacityDefaults';
import SolutionTable from './components/SolutionTable';
import Item from './models/Item';
import {knapsack, getItemsThatFit} from './models/KnapsackAlgorithm';

function App() {

  const [capacity, setCapacity] = React.useState(capacityDefaults.defaultValue);
  const allItems = [
    new Item('ring', 250, 1 ),
    new Item('TV', 600, 5 ),
    new Item('cell phone', 400, 2 )
  ];

  
  const knapsackTable = knapsack(allItems, capacity);
  const solutionItems = getItemsThatFit(knapsackTable, allItems, capacity);
  
  function handleCapacityChange(event) {
    var numValue = parseInt(event.target.value, 10);
    if (isNaN(numValue)) {
      numValue = capacityDefaults.defaultValue
    } else if (capacityDefaults.isNotInRange(numValue)) {
      numValue = capacityDefaults.defaultValue
    }
    setCapacity(numValue)
  }
  return (
    <div className="App">
      <Items items={allItems} />
      <Capacity
        capacity={capacity}
        onCapacityChange={handleCapacityChange}
      />
      <SolutionTable
        capacity={capacity}
        items={allItems}
        knapsackTable={knapsackTable}
        solutionItems={solutionItems}
      />
    </div>
  );
}

export default App;
