import PropTypes from 'prop-types';
import { getCellId } from './helpers/TableHelper';
import React, {useRef} from 'react'
import { solutionTableActionTypes as types} from './SolutionController';

function SolutionTableHeaderRow ({cellKey, row, maxCellLengthItem, dispatch}) {

  const itemsRef = useRef([]);

  React.useEffect(() => {
   const cellDimensions = itemsRef.current.map((ref) => {
      return {width: ref.clientWidth, height: ref.clientHeight}
    })
    dispatch({
      type: types.CELL_DIMENSIONS,
      cellDimensions: cellDimensions
    });
  }, [dispatch]);

  return (
    <thead>
      <tr>
        <th className="header"></th>
        {row.map((cell, index) => {

          const id = getCellId(cellKey, index);
          return <th id={id} key={id} className="header" ref={el => itemsRef.current[index] = el}>
          {/* Make all the cells the size of the length of the longest value in the table. This is because at the start all 0 are shown. But if a cell contains a value with multiple digits the cells width changes
            (from 1 digit to 3 digits for example), which causes a jumping motion in the table as it expands the cell. So, make all the cells the max width at the start to avoid this behaviour.
           */}
          <div className="relative"><div className='z-1 invisible'>{maxCellLengthItem}</div>
          <div className="absolute text-center inset-x-0 inset-y-0" aria-label="capacity value">{cell}</div></div>
          </th> 
        })}

      </tr>
    </thead>
  );
};


SolutionTableHeaderRow.propTypes = {
  cellKey: PropTypes.string.isRequired,
  row: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default SolutionTableHeaderRow;