function PseudoCode({ item, capacity }) {
  if (item) {
    const fitsCSS = item.weight <= capacity ? "Bold" : "Muted"
    const toBigCSS = item.weight > capacity ? "Bold" : "Muted";
    return (
      <div className="PseudoCode">
        {/* <ul>
        <li>T = Knapsack Solution Table</li>
        <li>c = Capacity</li>
        <li>i = row number</li>
        <li>w = Item weight</li>
        <li>v = Item value</li>
      </ul> */}
{/* @todo - use <code></code> tag instead? */}
        <blockquote>
          <div className={fitsCSS}>
            {`if w <= c {`} <br />
            &nbsp;&nbsp;{` T[i][c] = Max(T[i-1][c], (value + table[i - 1][c - w]))`} <br />
          </div>
          <div className={toBigCSS}>
            {`}else {`} <br />
            &nbsp;&nbsp;{` T[i][c] = T[i-1][c]`} <br />
          </div>
          {`}`}

        </blockquote>

      </div>
    )
  } else {
    return null;
  }
}
export default PseudoCode;