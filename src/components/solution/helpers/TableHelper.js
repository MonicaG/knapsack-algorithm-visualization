function getCellId(base, index) {
  return `${base}${index}`;
}

function getCellIdBase(item) {
  return item ? item.id : "Cell";
}

function getTableHeaderCellId(index) {
  return getCellId("capacityRowCell", index);
}


export {getCellId, getCellIdBase, getTableHeaderCellId}