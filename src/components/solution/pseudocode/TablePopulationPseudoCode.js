function TablePopulationPseudoCode({ item, capacity, index, solutionTable }) {

  function getCSS(active) {
    return active ? "Bold" : "Muted"
  }

  function ifBlock(active) {
    const css = getCSS(active);
    return (
      <div className={css}>
        {`if w <= c then // ${item.weight} <= ${capacity} (${item.weight <= capacity ? "True" : "False"})
  T[i][c] = Max(T[i-1][c], (value + T[i - 1][c - w])) `}
        {active ?
          `
  // T[${index}][${capacity}] = Max(T[${index - 1}][${capacity}], (${item.value} + T[${index - 1}][${capacity - item.weight}])) 
  // T[${index}][${capacity}] = Max(${solutionTable[index - 1][capacity]}, ${item.value + solutionTable[index - 1][capacity - item.weight]})
  // T[${index}][${capacity}] = ${solutionTable[index][capacity]}`
          : null
        }
      </div>
    )
  }

  function elseBlock(active) {
    const css = getCSS(active);
    return (
      <div className={css}>
        {`else
  T[i][c] = T[i-1][c]  `}
        {active ?
          `
  // T[${index}][${capacity}] = T[${index - 1}][${capacity}]
  // T[${index}][${capacity}] = ${solutionTable[index][capacity]}`
          : null
        }
        {` 
end if`}
      </div>
    )
  }
  const itemFitsInKnapsack = item.weight <= capacity
  return (
      <pre>
        {ifBlock(itemFitsInKnapsack)}
        {elseBlock(!itemFitsInKnapsack)}
      </pre>
  )
}
export default TablePopulationPseudoCode;