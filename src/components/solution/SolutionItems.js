import React from 'react';
import { SolutionItemsPropType } from './helpers/PropTypesHelper'

function SolutionItems({ solutionItems }) {
  const solutionItemsToUse = solutionItems.filter(x => x.inSolution)
  return (
    <div>
      <p>Items to take:</p>
      {solutionItemsToUse.length > 0 ?
        <ul>
          {solutionItemsToUse.map(element => {
            return <li key={element.item.name}>{element.item.name}</li>
          })}
        </ul>
        :
        <p>No items fit in the knapsack.</p>
      }
    </div>
  );
};

SolutionItems.propTypes = {
  solutionItems: SolutionItemsPropType.isRequired
};

export default SolutionItems;