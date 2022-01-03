import Items from './Items';
import { capacityDefaults } from "../models/ValueDefaults";
import { useForm } from "react-hook-form";
import { actionTypes } from '../App';
import { ErrorMessage } from '@hookform/error-message';

function SetupScreen({ items, dispatch, calculateBtnDisabled }) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    criteriaMode: "all"
  });

  function displayErrorMsg(fieldName) {
    return (<ErrorMessage errors={errors} name={fieldName} role="alert" as={<p className="errorMsg" />} />);
  }


  function onSubmit(event) {
    const value = event.capacity;
    dispatch({ type: actionTypes.calculate, capacityValue: value });
  }


  return (
    <div className="flex flex-col">
      <h2 className="text-center text-2xl mb-6">Step 1: Setup</h2>
      <div className="mb-4 flex flex-row items-baseline space-x-4">
        <div>
          {displayErrorMsg("capacity")}
          <form id="capacityForm" onSubmit={handleSubmit(onSubmit)}>
            <label className="mb-3 font-bold text-gray-700 text-left" hmlfor="capacity">Knapsack Capacity: </label>
            <input type="number"
              aria-label="knapsack capacity"
              min={capacityDefaults.min}
              max={capacityDefaults.max}
              defaultValue={capacityDefaults.defaultValue}
              className="w-min"
              {...register("capacity", {
                valueAsNumber: true,
                max: {
                  value: capacityDefaults.max,
                  message: `Please enter a number between ${capacityDefaults.min} and ${capacityDefaults.max}`,
                },
                min: {
                  value: capacityDefaults.min,
                  message: `Please enter a number between ${capacityDefaults.min} and ${capacityDefaults.max}`,
                },
                required: {
                  value: true,
                  message: "Please enter a knapsack capacity value"
                }
              })}
            />
          </form>
        </div>
      </div>
      <label className="label2">Available Items</label>
      <Items items={items}
        dispatch={dispatch} />
      <input className="btnBlue max-w-max place-self-center" type="submit" value="Calculate" form="capacityForm" disabled={calculateBtnDisabled}/>
    </div>
  )
}

export default SetupScreen;