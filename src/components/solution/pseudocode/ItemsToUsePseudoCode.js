import PropTypes from 'prop-types';
import {ItemPropType} from '../helpers/PropTypesHelper'

function ItemsToUsePseudoCode({ previousItem, index, currentCapacity }) {
  
  return (
    <div>
    
        <pre>
          {`
    Where:
    items = {item_1, item_2...item_n}
    solution: {} // Empty to start. Will contain the items that fit into the knapsack
    int currentCapacity = knapsackCapacity //`} {currentCapacity}
          {`


    for i in items.size to 1 do 
      if (Table[i][currentCapacity] != Table[i-1][currentCapacity]) then 
      // Table`}[{index}][{currentCapacity}] != Table[{index - 1}][{currentCapacity}]
          {`
          //item is part of the solution
        solution.add(items[i-1])
        currentCapacity = currentCapacity - items[i-1].weight
        //currentCapacity = `} {currentCapacity} - {previousItem.weight}
        {`
      else 
        //no-op - item is not part of the solution
      end if
    end for
    
    `}
        </pre>
     
    </div>
  )
}

ItemsToUsePseudoCode.propTypes = {
  previousItem: ItemPropType.isRequired,
  index: PropTypes.number.isRequired,
  currentCapacity: PropTypes.number.isRequired
};

export default ItemsToUsePseudoCode;