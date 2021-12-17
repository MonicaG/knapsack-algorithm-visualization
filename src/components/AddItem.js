import React from 'react';
import Item from '../models/Item';
import {itemValueDefaults, capacityDefaults} from '../models/ValueDefaults';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { actionTypes } from '../App';
import { XCircleIcon } from '@heroicons/react/solid'

function AddItem({ items, dispatch, setShowAddRow }) {

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors }
  } = useForm({
    shouldUseNativeValidation: true,
  });

  function onSubmit(data) {
    let newItem = new Item(data.itemName, data.itemValue, data.itemWeight);
    dispatch({ type: actionTypes.addItem, newItem: newItem });
    resetAddForm();
  };

  React.useEffect(() => {
    setFocus("itemName");
  }, [setFocus]);

  function isItemNameUnique(itemName) {
    return items.filter(item => item.name.toLowerCase().trim() === itemName.toLowerCase().trim()).length === 0;
  }

  function handleResetAddForm() {
    dispatch({ type: actionTypes.cancelAddItem});
    resetAddForm();
  }

  function resetAddForm() {
    setShowAddRow(false);
    reset({})
  }

  function displayErrorMsg(fieldName) {
    return( <ErrorMessage errors={errors} name={fieldName} as={<p role="alert" className="errorMsg"/>}/>);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="my-4">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 bg-gray-100 p-6 relative">
          <div className="sm:col-span-6 col-span-2">
            {displayErrorMsg("itemName")}
            {displayErrorMsg("itemValue")}
            {displayErrorMsg("itemWeight")}
          </div>
          <div className="sm:col-span-3 col-span-2">
            <label htmlFor="itemName" className="label">Item Name</label>
            <input type="text"
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
          </div>
          <div className="col-span-1">
            <label htmlFor="itemValue" className="label">Value</label>
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
          </div>
          <div className="col-span-1">
            <label htmlFor="itemWeight" className="label">Weight</label>
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

          </div>
          <div className="sm:col-span-1 col-span-2 sm:place-self-end place-self-center">
            <button className="btnGreen" aria-label="Save Item" type="submit">Save</button>
          </div>
          <button className="absolute top-1 right-1 text-gray-500 hover:bg-gray-300 rounded-full" aria-label="cancel" type="reset" onClick={handleResetAddForm}>
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddItem;