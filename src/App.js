import './App.css';
import React from "react";
import Items from './components/Items';
import Capacity from './components/Capacity'
import capacityDefaults from './models/CapacityDefaults';
import SolutionTable from './components/SolutionTable';
import knapsack from './models/KnapsackAlgorithm';

function App() {

  const [capacity, setCapacity] = React.useState(capacityDefaults.defaultValue);
  const allItems = [
    { name: 'TV', value: 600, weight: 5 },
    { name: 'ring', value: 250, weight: 1 },
    { name: 'cell phone', value: 400, weight: 2 },
  ];
  const knapsackTable = knapsack(allItems, capacity);
  
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
      />
    </div>
  );
}

export default App;
