import PropTypes from 'prop-types';
import SolutionTableRow from './SolutionTableRow';

function SolutionTable({ capacity, items }) {
  let row = Array(capacity + 1).fill(0)
  return (
    <div className="SolutionTable">
      <table border="1">
        <tbody>
          <SolutionTableRow
            cellKey="capacityRowCell"
            row={row}
            useIndex={true}
          />
          <SolutionTableRow
            cellKey="emptyRowCell"
            row={row}
            useIndex={false}
          />
          {items.map(item => (
            <SolutionTableRow
              key={item.name}
              cellKey={item.name + "Cell"}
              row={row}
              firstCellValue={item.name}
              useIndex={false}
            />
          ))}
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