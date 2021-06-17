import PropTypes from 'prop-types';

function Items({items}) {
  return (
    <div>
      <table>
        <tbody>
          <tr key="table-heading">
            <th>Item</th>
            <th>Value</th>
            <th>Weight</th>
          </tr>
          {items.map(item => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.value}</td>
              <td>{item.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
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