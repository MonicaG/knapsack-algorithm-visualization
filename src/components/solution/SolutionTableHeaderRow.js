import PropTypes from 'prop-types';
import { getCellId } from './helpers/TableHelper';
import React, {useRef} from 'react'
import { solutionTableActionTypes as types} from './SolutionController';

function SolutionTableHeaderRow ({cellKey, row, dispatch}) {

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
          return <th id={id} key={id} className="header" ref={el => itemsRef.current[index] = el} >{cell}</th> 
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