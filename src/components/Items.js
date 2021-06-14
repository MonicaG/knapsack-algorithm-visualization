import React from "react"

function Items() {
  const allItems = [
    { name: 'TV', value: 600, weight: 5 },
    { name: 'ring', value: 250, weight: 1 },
    { name: 'cell phone', value: 400, weight: 2 },
  ]

  return (
    <div>
      <table>
        <tbody>
          <tr key="table-heading">
            <th>Item</th>
            <th>Value</th>
            <th>Weight</th>
          </tr>
          {allItems.map(item => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.value}</td>
              <td>{item.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Items;