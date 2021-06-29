import capacityDefaults from "./CapacityDefaults";

class Item {

  constructor(name, value, weight) {
    this.validateName(name);
    this._name = name;
    this._value = value;
    this._weight = this.getValueInRange(weight, capacityDefaults.min, capacityDefaults.max);
  }

  getValueInRange(value, min, max) {
    if(value < min) {
      return min;
    }else if (value > max ) {
      return max;
    }else {
      return value;
    }
  }

  validateName(nameValue) {
    if(!nameValue.trim()) {
      throw new Error("Name must not be empty");
    }
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this.validateName(newName);
    this._name = newName.trim();
  }

  get weight() {
    return this._weight;
  }

  set weight(newWeight) {
   this._weight = this.getValueInRange(newWeight, capacityDefaults.min, capacityDefaults.max);
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }
}

export default Item;