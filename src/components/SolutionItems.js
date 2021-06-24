function SolutionItems({ solutionItems }) {
    return (
      <div>
        <p>Items that fit</p>
        <ul>
        {solutionItems.map(element => {
          return <li key={element.item.name}>{element.item.name}</li>
        })}
        </ul>
      </div>
    );
};

export default SolutionItems;