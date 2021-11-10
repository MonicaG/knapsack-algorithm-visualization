import PropTypes from 'prop-types';
import {ItemPropType, KnapsackAlgorithmPropType} from '../helpers/PropTypesHelper'

function ItemsToUsePseudoCode({ previousItem, index, currentCapacity, knapsackAlgorithm }) {
  
 const isSolutionItem = knapsackAlgorithm.solutionTable[index][currentCapacity] !== knapsackAlgorithm.solutionTable[index-1][currentCapacity];

  function getCSS(isActive) {
    return  isActive ?
     "Bold" : "Muted";
  }
  return (
    <div>
    
        <pre>
          {`for i in items.size to 1 do `}<div className={getCSS(isSolutionItem)}>{`
      if (Table[i][currentCapacity] != Table[i-1][currentCapacity]) then // Table`}[{index}][{currentCapacity}] != Table[{index - 1}][{currentCapacity}]
          {`
        //item is part of the solution
        solution.add(items[i-1])
        currentCapacity = currentCapacity - items[i-1].weight
        //currentCapacity = `} {currentCapacity} - {previousItem.weight}
        </div>
        <div className={getCSS(!isSolutionItem)}>
        {`
      else 
        //no-op - item is not part of the solution
      end if`}</div>{`
    end for
    `}
        </pre>
     
    </div>
  )
}

ItemsToUsePseudoCode.propTypes = {
  previousItem: ItemPropType.isRequired,
  index: PropTypes.number.isRequired,
  currentCapacity: PropTypes.number.isRequired,
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired
};

export default ItemsToUsePseudoCode;