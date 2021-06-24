import PropTypes from 'prop-types';
import SolutionTableRow from './SolutionTableRow';
import SolutionItems from './SolutionItems';
import PseudoCode from './PseudoCode';
import React from 'react';


function SolutionTable({ capacity, items, knapsackTable, solutionItems }) {
  const [currentItemIndex, setCurrentItemIndex] = React.useState(1);
  const [currentCapacity, setCurrentCapacity] = React.useState(1);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [solutionItemIndex, setSolutionItemIndex] = React.useState(0);
  const [showSolutionItems, setShowSolutionItems] = React.useState(false);
  const [currentCellIndex, setCurrentCellIndex] = React.useState(1);
  const capacityRow = Array.from({ length: capacity + 1 }, (e, i) => i);

  function btnClick() {
    if (!showSolutionItems) {
      if (currentCapacity === capacity) {
        setCurrentCapacity(1);
        setCurrentItemIndex(currentItemIndex + 1);
        setCurrentCellIndex(1);
        if (currentItemIndex === items.length) {
          setShowSolutionItems(true);
        }
      } else {
        setCurrentCapacity(currentCapacity + 1);
        setCurrentCellIndex(currentCellIndex+1);
      }
    } else {
      setSolutionItemIndex(solutionItemIndex + 1);
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
            const indexOffset = index - 1;
            const itemName = index === 0 ? " " : items[indexOffset].name;
            const filtered = solutionItems.filter( item => ( item.row === (indexOffset))).map( item => (item.column));
            const selectedColumnIndex = showSolutionItems && filtered.length === 1 ? filtered[0] : null;
            const highlightCellIndex = index === currentItemIndex ? currentCellIndex : null;
            const formattedRow = row.map((element, rowIndex) => {
              return index < currentItemIndex || (index === currentItemIndex && rowIndex <= currentCapacity) ? element : 0;
            });
            return <SolutionTableRow
              key={itemName}
              cellKey={itemName + "Cell"}
              row={formattedRow}
              firstCellValue={itemName}
              selectedColumnIndex={selectedColumnIndex}
              currentCell={highlightCellIndex}
            />
          })}
        </tbody>
      </table>
      <input type="button" value="Step" onClick={btnClick} disabled={buttonDisabled} />
      <div>
        <p>current capacity is: {currentCapacity}</p>
        <p>current item Index is: {currentItemIndex}</p>
        {showSolutionItems
          ? <SolutionItems solutionItems={solutionItems} />
          : null}
          <PseudoCode
            item={items[currentItemIndex - 1]}
            capacity={currentCapacity}
          />
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