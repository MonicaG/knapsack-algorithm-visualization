import PropTypes from 'prop-types';
import SolutionTableRow from './SolutionTableRow';
import TablePopulationPseudoCode from './TablePopulationPseudoCode';
import React from 'react';


function SolutionTable({ knapsackAlgorithm }) {
  const [currentItemIndex, setCurrentItemIndex] = React.useState(1);
  const [currentCapacity, setCurrentCapacity] = React.useState(1);
  const [currentCellIndex, setCurrentCellIndex] = React.useState(1);
  const capacityRow = Array.from({ length: knapsackAlgorithm.capacity + 1 }, (e, i) => i);

  function btnClick() {
      if (currentCapacity === knapsackAlgorithm.capacity) {
        setCurrentCapacity(1);
        setCurrentItemIndex(currentItemIndex + 1);
        setCurrentCellIndex(1);
      } else {
        setCurrentCapacity(currentCapacity + 1);
        setCurrentCellIndex(currentCellIndex+1);
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

          {knapsackAlgorithm.solutionTable.map((row, index) => {
            const indexOffset = index - 1;
            const item = index === 0 ? null : knapsackAlgorithm.items[indexOffset]
            const highlightCellIndex = index === currentItemIndex ? currentCellIndex : null;
            const formattedRow = row.map((element, rowIndex) => {
              return index < currentItemIndex || (index === currentItemIndex && rowIndex <= currentCapacity) ? element : 0;
            });
            return <SolutionTableRow
              key={item ? item.name : " "}
              cellKey={item ? item.name + "Cell" : "Cell"}
              row={formattedRow}
              item={item}
              currentCell={highlightCellIndex}
            />
          })}
        </tbody>
      </table>
      <input type="button" value="Step" onClick={btnClick} />
      <div>
        <p>current capacity is: {currentCapacity}</p>
        <p>current item Index is: {currentItemIndex}</p>
        {currentItemIndex > knapsackAlgorithm.items.length ?
        null
        :
        <TablePopulationPseudoCode
            item={knapsackAlgorithm.items[currentItemIndex - 1]}
            capacity={currentCapacity}
            index={currentItemIndex}
            solutionTable={knapsackAlgorithm.solutionTable}
          />
        }
      </div>
    </div>
  );
};

SolutionTable.propTypes = {
  knapsackAlgorithm: PropTypes.shape({   
     items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      weight: PropTypes.number.isRequired})).isRequired,
      capacity: PropTypes.number.isRequired,
}).isRequired};

export default SolutionTable;