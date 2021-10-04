function ItemsToUsePseudoCode({ solutionItems, index }) {
  return (
    <div>
    
        <pre>
          {`
    Where:
    items = {item_1, item_2...item_n}
    solution: {} // Empty to start. Will contain the items that fit into the knapsack
    int currentCapacity = knapsackCapacity //`} {solutionItems[index].column}
          {`


    for i in items.size to 1 do 
      int previousItemIndex = i - 1
      if (Table[i][currentCapacity] != Table[previousItemIndex][currentCapacity]) then 
      // Table`}[{index}][{solutionItems[index].column}] != Table[{index - 1}][{solutionItems[index].column}]
          {`
        solution.add(items[previousItemIndex])
        currentCapacity -= items[previousItemIndex].weight
      end if
    end for
    
    `}
        </pre>
     
    </div>
  )

}

export default ItemsToUsePseudoCode;