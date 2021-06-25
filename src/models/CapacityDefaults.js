const capacityDefaults = {
  defaultValue: 5,
  max: 10,
  min: 1,
  isNotInRange : function(value) {
    return (value < this.min || value > this.max);
  },
  //@TODO - can i unit test this function?
  parseCapacity : function(event) {
    var numValue = parseInt(event.target.value, 10);
    if (isNaN(numValue)) {
      numValue = this.defaultValue
    } else if (this.isNotInRange(numValue)) {
      numValue = this.defaultValue
    }
    return numValue
  }
};

export default capacityDefaults;