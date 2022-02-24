import PropTypes from 'prop-types';
import {ItemPropType, KnapsackAlgorithmPropType} from '../helpers/PropTypesHelper'
import {buildSyntaxHighlight} from './CodeBlocksCommon';
import {format} from '../helpers/Formatting';

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
    //capacity = ${currentCapacity} - ${previousItem.weight} = ${format(currentCapacity - previousItem.weight)}`
  }
  }else {
    // no - op
  }
}`)
  }

  
  return (
    buildSyntaxHighlight(getCode(), isSolutionItem, inSolutionLineNums, noOpLineNums)
  )
}

ItemsToUseCodeBlock.propTypes = {
  previousItem: ItemPropType.isRequired,
  index: PropTypes.number.isRequired,
  currentCapacity: PropTypes.number.isRequired,
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired
};

export default ItemsToUseCodeBlock;