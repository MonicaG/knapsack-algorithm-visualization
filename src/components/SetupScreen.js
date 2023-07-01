import { nanoid } from 'nanoid'
import { capacityDefaults, itemValueDefaults, maxNumOfItems } from "../models/ValueDefaults";
import { useForm, useFieldArray } from "react-hook-form";
import { actionTypes } from '../App';
import { ErrorMessage } from '@hookform/error-message';
import { TrashIcon } from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import eq1 from '../assets/equation_1.svg';
import eq2 from '../assets/equation_2.svg';
import eq3 from '../assets/equation_3.svg';
import AppContext from '../AppContext';

function SetupScreen({ items, capacity}) {

  const ariaLabelAddNewItem = "Add new item";
  const formName = "SetupForm";
  const submitBtnLabel = "Start";

  const appContext = useContext(AppContext);

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
      itemsArray: items,
      capacity: capacity,
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
    appContext.appDispatch({ type: actionTypes.calculate, capacityValue: value, items: event.itemsArray });
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
    <div>
    <h2 className="title">Knapsack Algorithm</h2>
    <div className="explanation">
    <p>The <a className="link" href="https://en.wikipedia.org/wiki/Knapsack_problem">knapsack problem</a> is usually described with a story. For example, a hiker needs to pack a knapsack for their expedition. There are many items the hiker would like to take: a tent, a sleeping bag, a frisbee, a selfie stick, a raincoat etc... But the knapsack can only carry a maximum amount of weight.</p>
    <p>The hiker gives a value to the potential items. An item that will be very beneficial, like a sleeping bag, will have a high value. An item that will be less beneficial, like a frisbee, will have a lower value. The hiker must prioritize which items to take based on the items' values and weights. The knapsack algorithm solves the hiker's dilema by finding the most valuable items that will fit in the knapsack.</p>
    <p>This app will step through the knapsack algorithm. Below, you may define the inputs to the algorithm. You can set the knapsack capacity (maximum weight) between {capacityDefaults.min} and {capacityDefaults.max}. You can enter up to {maxNumOfItems} items, with values between {itemValueDefaults.min} and {itemValueDefaults.max} and weight between {capacityDefaults.min} and {capacityDefaults.max}. Click the '{submitBtnLabel}' button to step through the algorithm.</p>
    <p>Below the setup fields on this screen is additional information about the knapsack algorithm.</p>
    </div>
      <h2 className="title mt-4">Step 1: Setup</h2>
      <div>
        <form id={formName} onSubmit={handleSubmit(onSubmit)} className="w-full my-4 flex flex-col justify-center gap-4">
          <div className="bg-gray-100 px-2 py-4 sm:px-6 sm:py-6 2xl:mx-auto rounded-lg">
            <label className="mb-3 font-bold text-gray-700" hmlfor="capacity">Knapsack Capacity</label>
            <input type="number"
              aria-label="knapsack capacity"
              min={capacityDefaults.min}
              max={capacityDefaults.max}
              defaultValue={capacityDefaults.defaultValue}
              className="w-min ml-4 mb-2"
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
            {displayErrorMsg("capacity")}
            {/* start items */}
            <div>
              <label className="label">Available Items</label>
              {controlledFields.map((item, index) => (
                <div key={item.id} className="border-2 m-2 rounded border-gray-200">
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 bg-gray-100 p-4 relative">
                    <div className="sm:col-span-4 col-span-2">
                      <label htmlFor={`itemsArray.${index}.name`} className="label">Item Name</label>
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

                    </div>
                    <div className="col-span-1">
                      <label htmlFor={`itemsArray.${index}.value`} className="label">Value</label>
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
                    </div>
                    <div className="col-span-1">
                      <label htmlFor={`itemsArray.${index}.weight`} className="label">Weight</label>
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
                    </div>
                    <button className="absolute -top-2 -right-2 bg-red-200 hover:bg-red-300 rounded-full" type="button" aria-label={`Delete item ${item.name}`} onClick={() => deleteItem(index)}>
                      <TrashIcon className="w-5 text-red-500" />
                    </button>
                    <div className="col-span-2 sm:col-span-6">
                      <div>
                        {displayErrorMsg(`itemsArray.${index}.name`)}
                      </div>
                      <div >
                        {displayErrorMsg(`itemsArray.${index}.value`)}
                      </div>
                      <div>
                        {displayErrorMsg(`itemsArray.${index}.weight`)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* end items */}
              <div className="ml-2 mt-4 ">
                <button type="button" className="max-w-max btnGreen whitespace-nowrap" disabled={shouldDisableButton()} aria-label={ariaLabelAddNewItem} onClick={() => addItem()}>
                  New Item
                </button>
              </div>
            </div>

          </div>
        </form>
        <div className="flex flex-col">
          <input className="btnBlue w-40 tracking-wide place-self-center" type="submit" form={formName} value={submitBtnLabel} aria-label="Start Algorithm Calculation" disabled={calculateBtn} />
        </div>
      </div>
      <h2 className="title mt-6">Algorithm Details</h2>
      <div className="explanation">
        <p>In this version of the story there are also two constraints:</p>
        <ol className="list-decimal ml-8">
          <li>The hiker cannot break an item into pieces and take some of the pieces</li>
          <li>The hiker cannot take multiples of an item</li>
        </ol>
        <p>This is known as the "0-1 knapsack problem"; an item is taken, or it is not. The mathematical representation of the 0-1 knapsack problem is: </p>
        <div>
          <span className="inline-flex items-center">where<img className="h-5 inline pl-1" src={eq3} alt="where x is either 0 or 1"></img></span>
        </div>
        <div>
          <span className="inline-flex items-center">maximize<img className="h-12 inline pl-1" src={eq1} alt="summation equation"></img></span>
        </div>
        <div>
          <span className="inline-flex items-center whitespace-nowrap">subject to<img className="h-12 inline pl-1" src={eq2} alt="equation constraints"></img></span>
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
        <p>The knapsack problem comes in many variations. For information about other versions, see <a className="link" href="http://www.or.deis.unibo.it/kp/Chapter1.pdf">"KNAPSACK PROBLEMS - Algorithms and Computer Implementations by Silvano Martello and Paolo Toth"</a>.</p>
      </div>
    </div>
  )
}

export default SetupScreen;