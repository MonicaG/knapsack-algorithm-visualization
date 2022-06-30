import Xarrow from 'react-xarrows';
import PropTypes from 'prop-types';
import { KnapsackAlgorithmPropType } from './helpers/PropTypesHelper';
import ArrowDetail from './helpers/ArrowDetail';
import { getTableHeaderCellId } from './helpers/TableHelper';


function Arrow({ knapsackAlgorithm, state, solutionTableRef }) {

  function shouldDisplayArrow(startCellId, endCellId) {
    if (startCellId && endCellId) {
      const startCellElem = document.getElementById(startCellId)?.getBoundingClientRect();
      const endCellElem = document.getElementById(endCellId)?.getBoundingClientRect();
      const headerCellElem = document.getElementById(getTableHeaderCellId(0))?.getBoundingClientRect();
      const solutionTableElem = solutionTableRef.current?.getBoundingClientRect();
      return (startCellElem?.y > headerCellElem?.y && endCellElem?.y < solutionTableElem?.bottom) &&
      (endCellElem?.x < solutionTableElem?.right && endCellElem?.right > solutionTableElem?.x);
    }
    return false;
  }

  const arrowDetail = new ArrowDetail(knapsackAlgorithm, state.currentItemIndex, state.currentCapacity);
  let startCellId = arrowDetail.getStartCell();
  let endCellId = arrowDetail.getEndCell();

  if (shouldDisplayArrow(startCellId, endCellId)) {
    const anchors = arrowDetail.getAnchorDetails(startCellId, endCellId);
    const startAnchor = anchors[0];
    const endAnchor = anchors[1];
    return (
      <Xarrow start={startCellId} end={endCellId} startAnchor={startAnchor} endAnchor={endAnchor} color="black" strokeWidth={2} />
    );
  }
}

Arrow.propTypes = {
  knapsackAlgorithm: KnapsackAlgorithmPropType.isRequired,
  state: PropTypes.shape({
    currentItemIndex: PropTypes.number.isRequired,
    currentCapacity: PropTypes.number.isRequired,
  }).isRequired,
  solutionTableRef: PropTypes.object,
};

export default Arrow;