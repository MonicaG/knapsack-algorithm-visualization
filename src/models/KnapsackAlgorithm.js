import ItemToUse from "./ItemToUse";

function knapsack(items, capacity) {
  const table = [];
  for (let i = 0; i <= items.length; i++) {
    table.push(Array(capacity + 1).fill(0));
  }

  items.forEach((item, index) => {
    const offsetIndex = index + 1;
    for (let currentCapacity = 1; currentCapacity <= capacity; currentCapacity++) {
      const valueForCapacityInPreviousRow = table[offsetIndex - 1][currentCapacity]
      table[offsetIndex][currentCapacity] = item.weight <= currentCapacity ?
        Math.max(valueForCapacityInPreviousRow, (item.value + table[offsetIndex - 1][currentCapacity - item.weight])) :
        valueForCapacityInPreviousRow
    }
  });
  return table;
}

function getItemsThatFit(table, items, capacity) {
  var solution = [];
  var currentCapacity = capacity;
  for(let i=items.length; i > 0; i--) {
    const previousItemIndex = i - 1 ;
    if(table[i][currentCapacity] !== table[previousItemIndex][currentCapacity]) {
      solution.push(new ItemToUse(items[previousItemIndex], previousItemIndex, currentCapacity));
      currentCapacity -= items[previousItemIndex].weight;
    }
  }
  return solution;
}

export {knapsack, getItemsThatFit};