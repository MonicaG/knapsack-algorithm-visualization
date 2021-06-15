const capacityDefaults = {
  defaultValue: 5,
  max: 10,
  min: 1,
  isNotInRange : function(value) {
    return (value < this.min || value > this.max);
  },
};

export default capacityDefaults;