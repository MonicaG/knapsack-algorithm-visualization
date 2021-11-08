function getCellId(base, index) {
  return `${base}${index}`;
}

function getItemCellId(item, index) {
  return getCellId(item.id, index);
}

export {getCellId, getItemCellId}