
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

export default knapsack;