import PropTypes from 'prop-types';
import capacityDefaults from "../models/CapacityDefaults";

function Capacity({ capacity, onCapacityChange }) {
  return (
    <div>
      <label hmlfor="capacity">Knapsack Capacity: </label>
      <input type="number"
        aria-label="knapsack capacity"
        id="capacity" 
        name="capacity" 
        min={capacityDefaults.min} 
        max={capacityDefaults.max} 
        value={capacity}
        onChange={onCapacityChange} />
    </div>
  );
};

Capacity.propTypes = {
  capacity: PropTypes.number.isRequired,
  onCapacityChange: PropTypes.func.isRequired,
};

export default Capacity;