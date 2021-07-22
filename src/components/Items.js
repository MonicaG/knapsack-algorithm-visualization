import PropTypes from 'prop-types';
import React from 'react';
import Item from '../models/Item';
import capacityDefaults from './../models/CapacityDefaults';
import NumberInput from './NumberInput';
import { useForm, Controller } from "react-hook-form";

function Items({ items, setItems }) {

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm();
  
  
  function onSubmit(data) {
    console.log(data);
    setItems([...items, new Item(data.itemName, data.itemValue, data.itemWeight)]);
    resetAddForm();
  }; // your form submit function which will invoke after successful validation



  const [showAddRow, setShowAddRow] = React.useState(false);
  const maxNumberOfItems = 10;

  // function handleNameChange(event) {
  //     setItemName(event.target.value.toLowerCase());
  // }

  // function handleItemWeightChange(event) {
  //   setItemWeight(capacityDefaults.parseCapacity(event));
  // }

  // function handleItemValueChange(event) {
  //   setItemValue(capacityDefaults.parseCapacity(event));
  // }

  // function checkForDuplicateName() {
  //   if(items.filter(item => item.name === itemName).length > 0) {
  //     throw new Error("Name must be unique"); 
  //   }
  // }

  function resetAddForm() {
    setShowAddRow(false);
    reset({})
    //     setItemName('');
    //     setItemValue(5);
    //     setItemWeight(capacityDefaults.defaultValue);
    //     setErrorMsg('');
  }

  // function myHandleSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     checkForDuplicateName();
  //     setItems([...items, new Item(itemName, itemValue, itemWeight)]);
  //     resetAddForm()
  //   }catch(error) {
  //     setErrorMsg(error.message);
  //   }
  // }

  function handleAddButton(event) {
    setShowAddRow(true);
  }

  function handleDelete(item) {

    const filtered = items.filter(i => i !== item)
    setItems(filtered);
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
                // onChange={handleNameChange}
                placeholder="Enter item name"
                defaultValue=""
                {...register("itemName", { required: true })} />
            </span>
            <span className="td" role="cell">
              <Controller
                control={control}
                name="itemValue"
                defaultValue={5}
                rules={{ max: capacityDefaults.max, min: capacityDefaults.min, required: true }}
                render={({
                  field: { onChange, value, name}
                }) => (
                  <NumberInput
                    onChange={onChange}
                    value={value}
                    name={name}
                  />
                )}
              />
            </span>
            <span className="td" role="cell">
              <Controller
                control={control}
                name="itemWeight"
                defaultValue={capacityDefaults.defaultValue}
                rules={{ max: capacityDefaults.max, min: capacityDefaults.min, required: true }}
                render={({
                  field: { onChange, value, name, ref }
                }) => (
                  <NumberInput
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
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