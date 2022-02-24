import { format } from "./Formatting";

describe('number format test', () => {
  it('formats a number without decimals to have no decimals', () => {
    expect(format(54)).toBe("54");     
  });
  it('formats a number with 1 decimal place to have 1 decimal place', () => {
    expect(format(54.9)).toBe("54.9");     
  });
  it('formats a number with 2 decimal places to have 2 decimal places', () => {
    expect(format(54.98)).toBe("54.98");     
  });
  it('formats a number with more than 2 decimal places to have 2 decimal places', () => {
    expect(format(54.634)).toBe("54.63");     
  });
  it('formats a number with more than 2 decimal places to have 2 decimal places and rounds up', () => {
    expect(format(54.735)).toBe("54.74");     
  });

});