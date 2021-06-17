import PropTypes from 'prop-types';
import SolutionTableRow from './SolutionTableRow';
import knapsack from '../models/KnapsackAlgorithm';

function SolutionTable({ capacity, items }) {
  const capacityRow = Array.from({length: capacity+1}, (e, i)=> i);
  const solutionTable = knapsack(items, capacity);
  return (
    <div className="SolutionTable">
      <table border="1">
        <tbody>
          <SolutionTableRow
            cellKey="capacityRowCell"
            row={capacityRow}
          />

          {solutionTable.map((row, index) => {
            const itemName = index === 0 ? " " : items[index-1].name;
            return <SolutionTableRow
              key={itemName}
              cellKey={itemName + "Cell"}
              row={row}
              firstCellValue={itemName}
            />
          })}
        </tbody>
      </table>
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