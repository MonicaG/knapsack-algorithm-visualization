import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import {docco} from 'react-syntax-highlighter/dist/cjs/styles/hljs'; 
import {HIGHLIGHT_COLOUR} from './CodeBlocksCommon'

SyntaxHighlighter.registerLanguage('javascript', js);

function TablePopulationCodeBlock({ item, capacity, index, solutionTable }) {

  function getIfComment(itemFitsInKnapsack) {
    return !itemFitsInKnapsack ? "" : 
`
/* 
T[${index}][${capacity}] = Math.max(T[${index - 1}][${capacity}], (${item.value} + T[${index - 1}][${capacity - item.weight}])) 
T[${index}][${capacity}] = Math.max(${solutionTable[index - 1][capacity]}, ${item.value + solutionTable[index - 1][capacity - item.weight]})
T[${index}][${capacity}] = ${solutionTable[index][capacity]}
*/`
  }

  function getElseComment(itemFitsInKnapsack) {
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
  T[i][c] = Math.max(T[i-1][c], (value + T[i - 1][c - w])) ${getIfComment(itemFitsInKnapsack)}
}else {
  T[i][c] = T[i-1][c] ${getElseComment(itemFitsInKnapsack)}
}`
    )
  }

  const itemFitsInKnapsack = item.weight <= capacity
  const itemFitsLineNum = [5,6,7,8,9,10,11]
  const itemDoesNotFitLineNum = [7,8,9,10,11,12]
  return (
    <SyntaxHighlighter 
     language="javascript" 
      style={docco}
      showLineNumbers={true}
      wrapLines={true}
      lineProps={lineNumber => {
                let style = { display: 'block' };
                if (itemFitsInKnapsack && itemFitsLineNum.includes(lineNumber)) {
                  style.backgroundColor = HIGHLIGHT_COLOUR
                }else if (!itemFitsInKnapsack && itemDoesNotFitLineNum.includes(lineNumber)) {
                  style.backgroundColor = HIGHLIGHT_COLOUR
                }
      
                return { style };
              }}
    >
      {getCode(itemFitsInKnapsack)}
    </SyntaxHighlighter>
  )
}
export default TablePopulationCodeBlock;