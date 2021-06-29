import PropTypes from 'prop-types';
import React from 'react';
import Item from '../models/Item';
import capacityDefaults from './../models/CapacityDefaults';

function Items({ items, setItems }) {

  const [itemName, setItemName] = React.useState('');
  const [itemWeight, setItemWeight] = React.useState(capacityDefaults.defaultValue);
  const [itemValue, setItemValue] = React.useState(5);
  const [showAddRow, setShowAddRow] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState();
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

  function checkForDuplicateName() {
    if(items.filter(item => item.name === itemName).length > 0) {
      throw new Error("Name must be unique"); 
    }
  }

  function resetAddForm() {
    setShowAddRow(false);
      setItemName('');
      setItemValue(5);
      setItemWeight(capacityDefaults.defaultValue);
      setErrorMsg('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      checkForDuplicateName();
      setItems([...items, new Item(itemName, itemValue, itemWeight)]);
      resetAddForm()
    }catch(error) {
      setErrorMsg(error.message);
    }
  }

  function handleAddButton(event) {
    console.log("add")
    setShowAddRow(true);
  }

  function handleDelete(item) {

    const filtered = items.filter(i => i !== item)
    setItems(filtered);
    console.log("deleted")
  }

  return (
    <div>
      <div className="table">
        <div className="tr" role="row">
          <span className="td" role="cell">Item Name</span>
          <span className="td" role="cell">Value</span>
          <span className="td" role="cell">Weight</span>
        </div>
        {items.map(item => (
          <div className="tr" role="row" key={item.name}>
            <span className="td" role="cell">{item.name}</span>
            <span className="td" role="cell">{item.value}</span>
            <span className="td" role="cell">{item.weight}</span>
            <span className="td" role="cell">
              <button type="button" onClick={() => handleDelete(item)}>-</button>
            </span>
          </div>
        ))}
        {showAddRow ?
          <form onSubmit={handleSubmit} className="tr" role="row" >
            <span className="td" role="cell">
              <input id="itemName"
                name="itemName"
                type="text"
                placeholder="item name"
                value={itemName}
                onChange={handleNameChange} />
            </span>
            <span className="td" role="cell">
              <input type="number"
                id="itemWeight"
                name="itemWeight"
                min={capacityDefaults.min}
                max={capacityDefaults.max}
                value={itemWeight}
                onChange={handleItemWeightChange} />
            </span>
            <span className="td" role="cell">
              <input type="number"
                id="itemValue"
                name="itemValue"
                min={capacityDefaults.min}
                max={capacityDefaults.max}
                value={itemValue}
                onChange={handleItemValueChange} />
            </span>
            <span className="td" role="cell">
              <button type="button" onClick={handleSubmit} disabled={items.length >= maxNumberOfItems.length}>
                add item
              </button>
            </span>
            <span className="td" role="cell">
              <button type="button" onClick={resetAddForm}>
                cancel
              </button>
            </span>
            {errorMsg ?
            <span className="td" role="cell">{errorMsg}</span>
            : null
            }
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