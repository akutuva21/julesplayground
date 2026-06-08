import { describe, it, expect } from 'vitest';
import { formatValue } from './formatValue';

describe('formatValue', () => {
  it('should return "—" for undefined, null, and non-finite numbers', () => {
    expect(formatValue(undefined)).toBe('—');
    expect(formatValue(null)).toBe('—');
    expect(formatValue(NaN)).toBe('—');
    expect(formatValue(Infinity)).toBe('—');
    expect(formatValue(-Infinity)).toBe('—');
  });

  it('should return "0" for 0', () => {
    expect(formatValue(0)).toBe('0');
  });

  it('should use exponential notation for small numbers (< 1e-3)', () => {
    expect(formatValue(0.0009)).toBe('9.00e-4');
    expect(formatValue(-0.0009)).toBe('-9.00e-4');
  });

  it('should use exponential notation for large numbers (>= 1e4)', () => {
    expect(formatValue(10000)).toBe('1.00e+4');
    expect(formatValue(-10000)).toBe('-1.00e+4');
  });

  it('should return up to 4 decimal places without trailing zeros', () => {
    expect(formatValue(1.23456)).toBe('1.2346');
    expect(formatValue(1.2)).toBe('1.2');
    expect(formatValue(1.00001)).toBe('1');
    expect(formatValue(9999.9999)).toBe('9999.9999');
    expect(formatValue(9999.99999)).toBe('10000');
  });
});
