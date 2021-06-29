import capacityDefaults from './CapacityDefaults';
import Item from './Item';

describe('item weight', () => {
  test('if it sets low value to minimum acceptable value', () => {
      let item = new Item("item1", 5, 6);
      expect(item.weight).toBe(6);
      item.weight = capacityDefaults.min - 1;
      expect(item.weight).toBe(1);
    });

    test('if it sets low value to minimum acceptable value in constructor', () => {
      let item = new Item("item1", 5, capacityDefaults.min - 1);
      expect(item.weight).toBe(1);
    });
});

describe('item name', () => {
  test('if setting name to an empty string throws an error', () => {
    expect(() => {
      let item = new Item("item 1", 5, capacityDefaults.max);
      item.name = ''
    }).toThrow();
  });

  test('if setting name to a string with empty spaces throws an error', () => {
    expect(() => {
      let item = new Item("item 1", 5, capacityDefaults.max);
      item.name = '  ';
    }).toThrow();
  });

  test('if setting name to a non-empty string works', () => {
    let item = new Item("item 1", 5, capacityDefaults.max);
    expect(item.name).toBe("item 1");
    item.name = "item 6";
    expect(item.name).toBe("item 6");
  });
});

