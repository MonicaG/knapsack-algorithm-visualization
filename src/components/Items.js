import PropTypes from 'prop-types';
import React from 'react';
import Item from '../models/Item';
import capacityDefaults from './../models/CapacityDefaults';
import itemValueDefaults from '../models/ItemValueDefaults';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

function Items({ items, setItems }) {

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors }
  } = useForm({
    criteriaMode: "all"
  });

  function onSubmit(data) {
    console.log(data);
    setItems([...items, new Item(data.itemName, data.itemValue, data.itemWeight)]);
    resetAddForm();
  }; 

  const [showAddRow, setShowAddRow] = React.useState(false);
  const maxNumberOfItems = 10;

  React.useEffect(() => {
    if (showAddRow) {
      setFocus("itemName");
    }
  }, [setFocus, showAddRow]);

  function isItemNameUnique(itemName) {
    return items.filter(item => item.name === itemName).length === 0;
  }

  function resetAddForm() {
    setShowAddRow(false);
    reset({})
  }


  function handleAddButton(event) {
    setShowAddRow(true);
  }

  function handleDelete(item) {
    const filtered = items.filter(i => i !== item)
    setItems(filtered);
  }

  function shouldDisplayButton() {
     return items.length >= maxNumberOfItems

  }

  function displayErrorMsg(fieldName) {
    return (<ErrorMessage
      errors={errors}
      name={fieldName}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <p key={type}>{message}</p>
        ))
      }
    />);
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
          <form onSubmit={handleSubmit(onSubmit)} className="tr" role="row" >
            <span className="td" role="cell">
              <input
                placeholder="Enter item name"
                {...register("itemName", {
                  required: {
                    value: true,
                    message: "Please enter an item name"
                  },
                  validate: {
                    isUnique: v => isItemNameUnique(v) || "Please enter a unique item name."
                  }
                })}
              />
              {displayErrorMsg("itemName")}
            </span>
            <span className="td" role="cell">
              <input type="number"
                defaultValue={itemValueDefaults.defaultValue}
                min={itemValueDefaults.min}
                max={itemValueDefaults.max}
                step={itemValueDefaults.step}
                {...register("itemValue", {
                  valueAsNumber: true,
                  max: {
                    value: itemValueDefaults.max,
                    message: "Please enter a smaller number"
                  },
                  min: {
                    value: itemValueDefaults.min,
                    message: "Please enter a larger nuber",
                  },
                  required: {
                    value: true,
                    message: "Please enter a value"
                  }
                })}
              />
             {displayErrorMsg("itemValue")}
            </span>
            <span className="td" role="cell">
              <input type="number"
                defaultValue={capacityDefaults.defaultValue}
                min={capacityDefaults.min}
                max={capacityDefaults.max}
                {...register("itemWeight", {
                  valueAsNumber: true,
                  max: {
                    value: capacityDefaults.max,
                    message: "Please enter a smaller number"
                  },
                  min: {
                    value: capacityDefaults.min,
                    message: "Please enter a larger nuber",
                  },
                  required: {
                    value: true,
                    message: "Please enter a value"
                  }
                })}
              />
              {displayErrorMsg("itemWeight")}
            </span>
            <span className="td" role="cell">
              <button type="submit">Add Item</button>
            </span>
            <span className="td" role="cell">
              <button type="reset" onClick={resetAddForm}>Cancel</button>
            </span>
          </form>
          : null
        }
        {shouldDisplayButton() ?
          <button type="button" disabled>+</button> :
          <button type="button" onClick={handleAddButton}>+</button>
        }
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