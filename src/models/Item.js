import { nanoid } from 'nanoid'

class Item {

  constructor(name, value, weight) {
    this.id = nanoid();
    this.name = name;
    this.value = value;
    this.weight = weight
  }
}

export default Item;