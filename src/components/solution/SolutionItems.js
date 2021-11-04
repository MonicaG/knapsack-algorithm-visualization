import React from 'react';
function SolutionItems({ solutionItems }) {
  return (
    <div>
      <p>Items that fit:</p>
      {solutionItems ?
        <ul>
          {solutionItems.map(element => {
            return <li key={element.item.name}>{element.item.name}</li>
          })}
        </ul>
        :
        null
      }
    </div>
  );
};

export default SolutionItems;