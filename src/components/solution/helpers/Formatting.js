const MAX_DECIMAL_NUMS = 2;

// num formatting from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
function format(num) {
  return new Intl.NumberFormat('en-US', {useGrouping: false, maximumFractionDigits: MAX_DECIMAL_NUMS}).format(num)
} 

export {format};