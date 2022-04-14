import { nanoid } from 'nanoid'
import { capacityDefaults, itemValueDefaults, maxNumOfItems } from "../models/ValueDefaults";
import { useForm, useFieldArray } from "react-hook-form";
import { actionTypes } from '../App';
import { ErrorMessage } from '@hookform/error-message';
import { TrashIcon } from '@heroicons/react/solid';
import React from 'react';

function SetupScreen({ items, dispatch }) {

  const ariaLabelAddNewItem = "Add new item";

  const [calculateBtn, setcalculateBtn] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    defaultValues: {
      itemsArray: items
    }
  });

  const { fields, remove, append } = useFieldArray({ control, name: "itemsArray" });

  const watchFieldArray = watch("itemsArray");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index]
    };
  });

  function displayErrorMsg(fieldName) {
    return (<ErrorMessage errors={errors} name={fieldName} role="alert" as={<p className="errorMsg" />} />);
  }

  function deleteItem(index) {
    remove(index)
    if (controlledFields.length <= 1) {
      setcalculateBtn(true);
    }
  }

  function addItem() {
    append({
      id: nanoid(),
      name: `item ${controlledFields.length + 1}`,
      value: itemValueDefaults.defaultValue,
      weight: capacityDefaults.defaultValue,
    })
    if (calculateBtn) {
      setcalculateBtn(false);
    }
  }

  function shouldDisableButton() {
    return controlledFields.length >= maxNumOfItems;
  }

  function onSubmit(event) {
    const value = event.capacity;
    dispatch({ type: actionTypes.calculate, capacityValue: value, items: event.itemsArray });
  }

  function getCSS(index, fieldName) {
    if (errors.itemsArray && errors.itemsArray[index] && errors.itemsArray[index] && errors.itemsArray[index][fieldName]) {
      return "border-1 border-red-500 focus:border-2 focus:border-red-500 focus:ring-0 focus:ring-red-500 focus:ring-offset-red-300 ";
    }
  }

  function isItemNameUnique(itemName) {
    return controlledFields.filter(item => item.name.toLowerCase().trim() === itemName.toLowerCase().trim()).length <= 1;
  }


  return (
    <div className="flex flex-col">
      <h2 className="title">Step 1: Setup</h2>
      <div className="mb-4 flex flex-row items-baseline space-x-4">
        {displayErrorMsg("capacity")}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
          {/* start items */}
          <div>
            <label className="label2">Available Items</label>
            <div className="flex flex-col place-items-end overflow-x-auto">
              <table className="table-auto px-10 py-3 w-full" role="table">
                <thead>
                  <tr>
                    <th className="header">Item Name</th>
                    <th className="header">Value</th>
                    <th className="header">Weight</th>
                    <th className="header"></th>
                  </tr>
                </thead>
                <tbody>
                  {controlledFields.map((item, index) => (
                    <tr key={item.id}>
                      <td className="cell">
                        <input type="text"
                          placeholder="Enter item name"
                          aria-label={`name for item ${index}`}
                          className={getCSS(index, "name")}
                          key={item.id}
                          {...register(`itemsArray.${index}.name`, {
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
                        {displayErrorMsg(`itemsArray.${index}.name`)}
                      </td>
                      <td className="cell">
                        <input type="number"
                          defaultValue={itemValueDefaults.defaultValue}
                          min={itemValueDefaults.min}
                          max={itemValueDefaults.max}
                          step={itemValueDefaults.step}
                          aria-label={`value for item ${index}`}
                          className={getCSS(index, "value")}
                          key={item.id}
                          {...register(`itemsArray.${index}.value`, {
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
                        {displayErrorMsg(`itemsArray.${index}.value`)}
                      </td>
                      <td className="cell">
                        <input type="number"
                          defaultValue={capacityDefaults.defaultValue}
                          min={capacityDefaults.min}
                          max={capacityDefaults.max}
                          className={getCSS(index, "weight")}
                          aria-label={`weight for item ${index}`}
                          key={item.id}
                          {...register(`itemsArray.${index}.weight`, {
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
                          })} />
                        {displayErrorMsg(`itemsArray.${index}.weight`)}
                      </td>
                      <td className="cell">
                        <button type="button" aria-label={`Delete item ${item.name}`} onClick={() => deleteItem(index)}>
                          <TrashIcon className="w-5 h- text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button type="button" className="my-4 max-w-max btnGreen" disabled={shouldDisableButton()} aria-label={ariaLabelAddNewItem} onClick={() => addItem()}>
                Add Item
              </button>
              <input className="btnBlue max-w-max place-self-center" type="submit" value="Calculate" disabled={calculateBtn} />
            </div>
          </div>
          {/* end items */}
        </form>
      </div>
      <div className="explanation">
        <p>The <a className="link" href="https://en.wikipedia.org/wiki/Knapsack_problem">knapsack problem</a> is usually described with a story. For example, a hiker needs to pack a knapsack for their expedition. There are many items the hiker would like to take: a tent, a sleeping bag, a frisbee, a selfie stick, a raincoat etc... But the knapsack can only carry a maximum amount of weight.</p>
        <p>The hiker has given a value to the potential items. An item that will be very beneficial, like a sleeping bag, will have a high value. An item that will be less beneficial, like a frisbee, will have a lower value. The hiker must prioritize which items to take based on the items' values and weights.</p>
        <p>In this version of the story there are also two constraints:</p>
        <ol className="list-decimal ml-8">
          <li>The hiker cannot break an item into pieces and take some of the pieces</li>
          <li>The hiker cannot take multiples of an item</li>
        </ol>
        <p>This is known as the "0-1 knapsack problem"; an item is taken, or it is not. The mathematical representation of the 0-1 knapsack problem is: </p>
        <div>
          <span className="inline-flex items-center">where<img className="h-5 inline pl-1" src="/img/equation_3.svg" alt="where x is either 0 or 1"></img></span>
        </div>
        <div>
          <span className="inline-flex items-center">maximize<img className="h-12 inline pl-1" src="/img/equation_1.svg" alt="summation equation"></img></span>
        </div>
        <div>
          <span className="inline-flex items-center whitespace-nowrap">subject to<img className="h-12 inline pl-1" src="/img/equation_2.svg" alt="equation constraints"></img></span>
        </div>
        <p>Where <em>i</em> is an item <em>v<sub>i</sub></em> is the item's value, <em>w<sub>i</sub></em> is the item's weight and <em>c</em> is the capacity of the knapsack. </p>
        <p>How does the hiker choose which items to pack?</p>
        <p>The brute force solution is to consider every possible combination of items. However, this would take O(2<sup>N</sup>) time. Why? The list of items is a set. <a className="link" href="https://en.wikipedia.org/wiki/Power_set">The number of subsets a set has is 2<sup>N</sup></a>. For example, given a set with 3 elements there are 8 subsets, 2<sup>3</sup> = 8. For the set [A, B, C] the possible subsets are:</p>
        <ol className="list-decimal ml-8">
          <li>[]</li>
          <li>[A]</li>
          <li>[B]</li>
          <li>[C]</li>
          <li>[A,B]</li>
          <li>[A,C]</li>
          <li>[B,C]</li>
          <li>[A,B,C]</li>
        </ol>
        <p>Instead, <a className="link" href="https://en.wikipedia.org/wiki/Dynamic_programming">dynamic programming</a> is used to solve the problem. Dynamic programming breaks the problem into subproblems. The solution to each subproblem is stored and used to solve other, larger, subproblems. The final solution is built up from these subproblems.</p>
        <p>In this case, an in-memory table stores the max value at different weights and number of items. Those values are used to build up a table that last's cell will contain the max value the knapsack can contain. The algorithm then walks through the table to get the items that make up that max value.</p>
        <p>This app will step through the algorithm. Above, you may define the inputs to the algorithm. You can set the knapsack capacity (maximum weight) between {capacityDefaults.min} and {capacityDefaults.max}. You can define up to {maxNumOfItems} items, with values between {itemValueDefaults.min} and {itemValueDefaults.max} and weight between {capacityDefaults.min} and {capacityDefaults.max}.</p>
        <p>The second screen steps through building the dynamic programming table.</p>
        <p>The third screen steps through choosing the optimal items.</p>
        <p>The knapsack problem comes in many variations. For information about other versions, see <a className="link" href="http://www.or.deis.unibo.it/kp/Chapter1.pdf">"KNAPSACK PROBLEMS - Algorithms and Computer Implementations by Silvano Martello and Paolo Toth"</a>.</p>
      </div>
    </div>
  )
}

export default SetupScreen;