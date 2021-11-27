import PropTypes from 'prop-types';
import capacityDefaults from "../models/CapacityDefaults";

function Capacity({ capacity, onCapacityChange }) {
  return (
    <div>
      <label className="mb-3 font-bold text-gray-700 text-left" hmlfor="capacity">Knapsack Capacity: </label>
      <input type="number"
        aria-label="knapsack capacity"
        id="capacity" 
        name="capacity" 
        min={capacityDefaults.min} 
        max={capacityDefaults.max} 
        defaultValue={capacity}
        onChange={onCapacityChange} 
        className="w-min"
        />
    </div>
  );
};

Capacity.propTypes = {
  capacity: PropTypes.number.isRequired,
  onCapacityChange: PropTypes.func.isRequired,
};

export default Capacity;