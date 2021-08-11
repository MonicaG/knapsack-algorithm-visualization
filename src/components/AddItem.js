import React from 'react';
import Item from '../models/Item';
import capacityDefaults from '../models/CapacityDefaults';
import itemValueDefaults from '../models/ItemValueDefaults';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
function AddItem({ items, setItems, setShowAddRow }) {

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

  React.useEffect(() => {
    setFocus("itemName");
  }, [setFocus]);

  function isItemNameUnique(itemName) {
    return items.filter(item => item.name === itemName).length === 0;
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
          <p key={type}>{message}</p>
        ))
      }
    />);
  }

  return (
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
  )
}

export default AddItem;