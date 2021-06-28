import PropTypes from 'prop-types';
import React from 'react';
import Item from '../models/Item';
import capacityDefaults from './../models/CapacityDefaults';

function Items({ items, setItems }) {

  const [itemName, setItemName] = React.useState('');
  const [itemWeight, setItemWeight] = React.useState(capacityDefaults.defaultValue);
  const [itemValue, setItemValue] = React.useState(5);
  const [showAddRow, setShowAddRow] = React.useState(false);
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
    setShowAddRow(false);
    setItemName('');
    setItemValue(5);
    setItemWeight(capacityDefaults.defaultValue);
  }

  function handleAddButton(event) {
    console.log("add")
    setShowAddRow(true);
  }

  function handleDelete(item) {
  
    const filtered = items.filter( i => i !== item)
     setItems(filtered);
    console.log("deleted")
  }

 

  return (
    <div>
      <div className="table">
        <div className="tr">
          <span className="td">Item Name</span>
          <span className="td">Value</span>
          <span className="td">Weight</span>
        </div>
        {items.map(item => (
          <div className="tr" key={item.name}>
            <span className="td">{item.name}</span>
            <span className="td">{item.value}</span>
            <span className="td">{item.weight}</span>
            <span className="td">
              <button type="button" onClick={() => handleDelete(item)}>-</button>
            </span>
          </div>
        ))}
        {showAddRow ?
          <form onSubmit={handleSubmit} className="tr" >
            <span className="td">
              <input id="itemName"
                type="text"
                value={itemName}
                onChange={handleNameChange} />
            </span>
            <span className="td">
              <input type="number"
                id="itemWeight"
                name="itemWeight"
                min={capacityDefaults.min}
                max={capacityDefaults.max}
                value={itemWeight}
                onChange={handleItemWeightChange} />
            </span>
            <span className="td">
              <input type="number"
                id="itemValue"
                name="itemValue"
                min={capacityDefaults.min}
                max={capacityDefaults.max}
                value={itemValue}
                onChange={handleItemValueChange} />
            </span>
            <span className="td">
              <button type="button" onClick={handleSubmit} disabled={items.length >= maxNumberOfItems.length}>
                add item
              </button>
            </span>
          </form>
          : null
        }
        <button type="button" onClick={handleAddButton}>+</button>
      </div>
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