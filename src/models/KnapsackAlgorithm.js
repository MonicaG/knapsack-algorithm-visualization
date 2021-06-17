
function knapsack(items, capacity) {
  const table = [];
  for(let i=0; i<=items.length; i++) {
    table.push(Array(capacity + 1).fill(0));
  }

  items.forEach((item, index) => {
    const offsetIndex = index + 1;
    for(let currentCapacity = 1; currentCapacity<=capacity; currentCapacity++) {
      // const previousItemValue = table[offsetIndex-1][currentCapacity]
      if(item.weight <= currentCapacity) {
        table[offsetIndex][currentCapacity] = 1
      }
    }
  });
  return table;
}

export default knapsack;