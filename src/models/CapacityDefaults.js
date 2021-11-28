const capacityDefaults = {
  defaultValue: 5,
  max: 10,
  min: 1,
  isNotInRange(value) {
    return (value < this.min || value > this.max);
  },
  parseCapacity(event) {
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