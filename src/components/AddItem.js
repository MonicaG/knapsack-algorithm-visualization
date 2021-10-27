import React from 'react';
import Item from '../models/Item';
import capacityDefaults from '../models/CapacityDefaults';
import itemValueDefaults from '../models/ItemValueDefaults';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import {actionTypes} from '../App';

function AddItem({ items, dispatch, setShowAddRow }) {

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
    let newItem  =  new Item(data.itemName, data.itemValue, data.itemWeight);
    dispatch({type: actionTypes.addItem, newItem: newItem});
    resetAddForm();
  };

  React.useEffect(() => {
    setFocus("itemName");
  }, [setFocus]);

  function isItemNameUnique(itemName) {
    return items.filter(item => item.name.toLowerCase().trim() === itemName.toLowerCase().trim()).length === 0;
  }

  function resetAddForm() {
    setShowAddRow(false);
    reset({})
  }

  function displayErrorMsg(fieldName) {
    return (<ErrorMessage
      errors={errors}
      name={fieldName}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <p role="alert" key={type}>{message}</p>
        ))
      }
    />);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tr" role="row" >
      <span className="td" role="cell">
        <input
          placeholder="Enter item name"
          aria-label="new item name"
          {...register("itemName", {
            //Note on why 'required: true' option is not used here.  I wanted to check the case where only white space 
            //was entered as a name. That is checked in the isNotEmpty validation below.  When I set required: true
            //react-hooks-form would validate that plus the isNotEmpty valication.  So, I would get multiple error messages. 
            //The isNotEmpty covers the required scenario so it is used. 
            //See: https://github.com/react-hook-form/react-hook-form/issues/1650
            validate: {
              isUnique: v => isItemNameUnique(v) || "Please enter a unique item name",
              isNotEmpty: v => !!v.trim() || "Please enter an item name"
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
          aria-label="item value"
          {...register("itemValue", {
            valueAsNumber: true,
            max: {
              value: itemValueDefaults.max,
              message: "Please enter a smaller number"
            },
            min: {
              value: itemValueDefaults.min,
              message: "Please enter a larger number",
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
          aria-label="item weight"
          {...register("itemWeight", {
            valueAsNumber: true,
            max: {
              value: capacityDefaults.max,
              message: "Please enter a smaller number"
            },
            min: {
              value: capacityDefaults.min,
              message: "Please enter a larger number",
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
        <button aria-label="Save Item" type="submit">Save Item</button>
      </span>
      <span className="td" role="cell">
        <button aria-label="cancel" type="reset" onClick={resetAddForm}>Cancel</button>
      </span>
    </form>
  )
}

export default AddItem;