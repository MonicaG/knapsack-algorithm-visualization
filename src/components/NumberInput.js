 function NumberInput ({ value, onChange, name, ...rest }) {
  
  function handleChange(event){
    onChange(parseInt(event.target.value));
  };

  return (
    <input
      type="number"
      onChange={handleChange}
      value={value}
      name={name}
      id={name}
      {...rest}
    />
  );
};

export default NumberInput;

