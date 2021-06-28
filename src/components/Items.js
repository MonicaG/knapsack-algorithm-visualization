import PropTypes from 'prop-types';
import React from 'react';
import Item from '../models/Item';
import capacityDefaults from './../models/CapacityDefaults';

function Items({ items, setItems }) {

  const [itemName, setItemName] = React.useState('');
  const [itemWeight, setItemWeight] = React.useState(capacityDefaults.defaultValue);
  const [itemValue, setItemValue] = React.useState(5);
  const maxNumberOfItems = 10;

  function handleNameChange(event) {
    setItemName(event.target.value.toLowerCase());
  }

  function handleItemWeightChange(event) {
    setItemWeight(capacityDefaults.parseCapacity(event));
  }

  function handleItemValueChange(event) {
    setItemValue(capacityDefaults.parseCapacity(event));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setItems([...items, new Item(itemName, itemValue, itemWeight)]);
  }


  return (
    <div>
      <div id="itemForm">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="itemName">Item Name:</label>
            <input id="itemName"
              type="text"
              value={itemName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            {/* TODO: CAN THIS USE THE Capacity Component instead */}
            <label hmlfor="itemWeight">Item Weight: </label>
            <input type="number"
              id="itemWeight"
              name="itemWeight"
              min={capacityDefaults.min}
              max={capacityDefaults.max}
              value={itemWeight}
              onChange={handleItemWeightChange} />
          </div>
          <div>
          <label hmlfor="itemValue">Item Value: </label>
            <input type="number"
              id="itemValue"
              name="itemValue"
              min={capacityDefaults.min}
              max={capacityDefaults.max}
              value={itemValue}
              onChange={handleItemValueChange} />
          </div>
          <button type="submit" disabled={items.length >= maxNumberOfItems.length}>
            add item
          </button>
        </form>

      </div>
      <table border="1">
        <tbody>
          <tr key="table-heading">
            <th>Item</th>
            <th>Value</th>
            <th>Weight</th>
          </tr>
          {items.map(item => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.value}</td>
              <td>{item.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Items.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
    weight: PropTypes.number,
  })),
};

export default Items;