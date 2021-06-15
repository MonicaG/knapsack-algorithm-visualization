import capacityDefaults from './CapacityDefaults';


test('0 is not in range', () => {
  expect(capacityDefaults.isNotInRange(0)).toBe(true);
});

test('11 is not in range', () => {
  expect(capacityDefaults.isNotInRange(11)).toBe(true);
});

test('1 is in range', ()  => {
  expect(capacityDefaults.isNotInRange(1)).toBe(false);
});

test('10 is in range', ()  => {
  expect(capacityDefaults.isNotInRange(10)).toBe(false);
});
