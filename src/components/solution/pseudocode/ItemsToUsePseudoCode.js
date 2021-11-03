function ItemsToUsePseudoCode({ solutionItems, index }) {
  const item = solutionItems[index]
  const row = item ? item.row : 0
  const column = item ? item.column : 0
  const previousItem = solutionItems[index + 1]
  const previousItemWeight = previousItem ? previousItem.item.weight : 0
  return (
    <div>
    
        <pre>
          {`
    Where:
    items = {item_1, item_2...item_n}
    solution: {} // Empty to start. Will contain the items that fit into the knapsack
    int currentCapacity = knapsackCapacity //`} {column}
          {`


    for i in items.size to 1 do 
      if (Table[i][currentCapacity] != Table[i-1][currentCapacity]) then 
      // Table`}[{row}][{column}] != Table[{row - 1}][{column}]
          {`
        solution.add(items[i-1])
        currentCapacity = currentCapacity - items[i-1].weight
        //currentCapacity = `} {column} - {previousItemWeight} 
        {`
      else 
        //no-op
      end if
    end for
    
    `}
        </pre>
     
    </div>
  )

}

export default ItemsToUsePseudoCode;