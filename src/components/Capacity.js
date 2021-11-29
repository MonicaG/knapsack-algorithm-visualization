import {capacityDefaults} from "../models/ValueDefaults";
import { useForm } from "react-hook-form";
import { actionTypes } from '../App';
import { ErrorMessage } from '@hookform/error-message';

function Capacity({ dispatch }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    criteriaMode: "all"
  });

  function displayErrorMsg(fieldName) {
    return( <ErrorMessage errors={errors} name={fieldName} as={<p className="errorMsg"/>}/>);
  }


  function onSubmit(event) {
    dispatch({ type: actionTypes.calculate, capacityValue: event.capacity });
  }


  return (
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
      </form>
    </div>
  );
};

export default Capacity;