import './App.css';
import React from "react";
import Items from './components/Items';
import Capacity from './components/Capacity'
import capacityDefaults from './models/CapacityDefaults';
import SolutionTable from './components/SolutionTable';
import Item from './models/Item';
import { knapsack, getItemsThatFit } from './models/KnapsackAlgorithm';

function App() {

  const initItems = [
    new Item('ring', 250, 1),
    new Item('TV', 600, 5),
    new Item('cell phone', 400, 2)
  ];

  console.log("redraw")
  const [capacity, setCapacity] = React.useState(capacityDefaults.defaultValue);
  const [items, setItems] = React.useState(initItems);
  
  const knapsackTable = knapsack(items, capacity);
  const solutionItems = getItemsThatFit(knapsackTable, items, capacity);


  function handleCapacityChange(event) {
    setCapacity(capacityDefaults.parseCapacity(event))
  }

  return (
    <div className="App">
      <Items items={items}
      setItems={setItems} />
      <Capacity
        capacity={capacity}
        onCapacityChange={handleCapacityChange}
      />
      <SolutionTable
        capacity={capacity}
        items={items}
        knapsackTable={knapsackTable}
        solutionItems={solutionItems}
      />
    </div>
  );
}

export default App;
