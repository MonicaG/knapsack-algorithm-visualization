import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import {docco} from 'react-syntax-highlighter/dist/cjs/styles/hljs'; 
import PropTypes from 'prop-types';
import {ItemPropType, KnapsackAlgorithmPropType} from '../helpers/PropTypesHelper'
import {HIGHLIGHT_COLOUR} from './CodeBlocksCommon'

SyntaxHighlighter.registerLanguage('javascript', js);

function ItemsToUseCodeBlock({ previousItem, index, currentCapacity, knapsackAlgorithm }) {
 
  const isSolutionItem = knapsackAlgorithm.solutionTable[index][currentCapacity] !== knapsackAlgorithm.solutionTable[index-1][currentCapacity];
  const inSolutionLineNums = [7,8,9,10]
  const noOpLineNums = [11]

  function getCode() {
    return (
`// items: array of item objects. An item has a value and weight property
let solution = []; 
let capacity = knapsack.capacity;
for (let i = items.length; i > 0; i--) {
  // i: index (${index})
  if (T[i][capacity] != Table[i-1][capacity]) { // T[${index}][${currentCapacity}] != T[${index - 1}][${currentCapacity}]
    //item is part of the solution
    solution.push(item);
    capacity = capacity - items[i-1].weight;  ${!isSolutionItem ? "": 
    `
    //capacity = ${currentCapacity} - ${previousItem.weight} = ${currentCapacity - previousItem.weight}`
  }
  }else {
    // no - op
  }
}`)
  }

  
  return (
    <SyntaxHighlighter 
      language="javascript" 
      style={docco}
      showLineNumbers={true}
      wrapLines={true}
      lineProps={lineNumber => {
                let style = { display: 'block' };
                if (isSolutionItem && inSolutionLineNums.includes(lineNumber)) {
                  style.backgroundColor = HIGHLIGHT_COLOUR
                }else if (!isSolutionItem && noOpLineNums.includes(lineNumber)) {
                  style.backgroundColor = HIGHLIGHT_COLOUR
                }
      
                return { style };
              }}
    >
      {getCode()}
    </SyntaxHighlighter>
  )
}

ItemsToUseCodeBlock.propTypes = {
  previousItem: ItemPropType.isRequired,
  index: PropTypes.number.isRequired,
  currentCapacity: PropTypes.number.isRequired,
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired
};

export default ItemsToUseCodeBlock;