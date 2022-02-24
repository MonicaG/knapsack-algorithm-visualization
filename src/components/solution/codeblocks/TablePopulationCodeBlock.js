import {buildSyntaxHighlight} from './CodeBlocksCommon';

function TablePopulationCodeBlock({ item, capacity, index, solutionTable }) {

  function getIfComment() {
    return !itemFitsInKnapsack ? "" : 
`
/* 
T[${index}][${capacity}] = Math.max(T[${index - 1}][${capacity}], (${item.value} + T[${index - 1}][${capacity - item.weight}])) 
T[${index}][${capacity}] = Math.max(${solutionTable[index - 1][capacity]}, ${item.value + solutionTable[index - 1][capacity - item.weight]})
T[${index}][${capacity}] = ${solutionTable[index][capacity]}
*/`
  }

  function getElseComment() {
    return itemFitsInKnapsack ? "" :
`
/* 
T[${index}][${capacity}] = T[${index - 1}][${capacity}]
T[${index}][${capacity}] = ${solutionTable[index][capacity]}
*/`    
  }

  function getCode() {
    return (
`// w: item weight (${item.weight})
// value: item value (${item.value})
// c: current capacity (${capacity})
// i: index (${index})
if (w <= c) { // ${item.weight} <= ${capacity}
  T[i][c] = Math.max(T[i-1][c], (value + T[i - 1][c - w])) ${getIfComment()}
}else {
  T[i][c] = T[i-1][c] ${getElseComment()}
}`
    )
  }

  const itemFitsInKnapsack = item.weight <= capacity
  const itemFitsLineNum = [5,6,7,8,9,10,11]
  const itemDoesNotFitLineNum = [7,8,9,10,11,12]
  return (
    buildSyntaxHighlight(getCode(), itemFitsInKnapsack, itemFitsLineNum, itemDoesNotFitLineNum)
  )
}
export default TablePopulationCodeBlock;