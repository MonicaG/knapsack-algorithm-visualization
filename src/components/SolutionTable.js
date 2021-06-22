import PropTypes from 'prop-types';
import SolutionTableRow from './SolutionTableRow';
import React from 'react';

function SolutionTable({ capacity, items, knapsackTable}) {
  const [currentItemIndex, setCurrentItemIndex] = React.useState(1);
  const [currentCapacity, setCurrentCapacity] = React.useState(0);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const capacityRow = Array.from({length: capacity+1}, (e, i)=> i);

  function btnClick() {
    if(currentCapacity === capacity) {
      setCurrentCapacity(1);
      setCurrentItemIndex(currentItemIndex+1);
      if(currentItemIndex === items.length) {
        setButtonDisabled(true);
      }
    }else {
      setCurrentCapacity(currentCapacity+1);
    } 
  }

  return (
    <div className="SolutionTable">
      <table border="1">
        <tbody>
          <SolutionTableRow
            cellKey="capacityRowCell"
            row={capacityRow}
          />

          {knapsackTable.map((row, index) => {
            const itemName = index === 0 ? " " : items[index-1].name;
            const formattedRow = row.map((element, rowIndex) => {
              return index < currentItemIndex || (index === currentItemIndex && rowIndex <= currentCapacity) ? element : 0;
            });
            return <SolutionTableRow
              key={itemName}
              cellKey={itemName + "Cell"}
              row={formattedRow}
              firstCellValue={itemName}
            />
          })}
        </tbody>
      </table>
      <input type="button" value="Step" onClick={btnClick} disabled={buttonDisabled}/>
        <div>
          <p>current capacity is: {currentCapacity}</p>
          <p>current item Index is: {currentItemIndex}</p>
      </div>
    </div>
  );
};

SolutionTable.propTypes = {
  capacity: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
    weight: PropTypes.number,
  }).isRequired),
};

export default SolutionTable;