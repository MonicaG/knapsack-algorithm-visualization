import { nanoid } from 'nanoid'

class Item {

  constructor(name, value, weight) {
    this.id = nanoid();
    this.name = name;
    this.value = value;
    this.weight = weight
  }

  toString() {
    return `Item  id: ${this.id} name: ${this.name} value: ${this.value} weight: ${this.weight}`;
  }
}

export default Item;