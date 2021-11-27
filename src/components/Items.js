import PropTypes from 'prop-types';
import React from 'react';
import AddItem from './AddItem';
import { actionTypes } from './../App'
import { TrashIcon } from '@heroicons/react/solid'

function Items({ items, dispatch }) {
  const ariaLabelAddNewItem = "Add new item";

  const [showAddRow, setShowAddRow] = React.useState(false);
  const maxNumberOfItems = 10;


  function handleAddButton(event) {
    setShowAddRow(true);
  }

  function handleDelete(item) {
    const filtered = items.filter(i => i !== item)
    dispatch({ type: actionTypes.updateItems, items: filtered });
  }

  function shouldDisableButton() {
    return items.length >= maxNumberOfItems;
  }
  
  return (
    <div className="flex flex-col place-items-end overflow-x-auto">
      <table className="table-auto px-10 py-3 w-full">
        <thead>
          <tr>
            <th className="header">Item Name</th>
            <th className="header">Value</th>
            <th className="header">Weight</th>
            <th className="header"></th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td className="cell">{item.name}</td>
              <td className="cell">{item.value}</td>
              <td className="cell">{item.weight}</td>
              <td className="cell">
                <button type="button" aria-label={`Delete item ${item.name}`} onClick={() => handleDelete(item)}>
                  <TrashIcon className="w-5 h- text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddRow ?
        <AddItem
          items={items}
          dispatch={dispatch}
          setShowAddRow={setShowAddRow}
        />
        :
        <button type="button" className="my-4 max-w-max btnGreen" disabled={shouldDisableButton()} aria-label={ariaLabelAddNewItem} onClick={handleAddButton}>
          Add Item
        </button>
      }
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