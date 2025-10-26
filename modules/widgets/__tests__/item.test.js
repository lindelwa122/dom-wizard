import { Item } from '../item.js';

describe('Item widget', () => {
  test('creates an li element with correct structure', () => {
    const result = Item('Hello');
    expect(result).toHaveProperty('tagName', 'li');
    expect(result.options.textContent).toBe('Hello');
    expect(result.options.style).toEqual({});
    expect(result.options.onclick).toBeUndefined();
  });

  test('throws if text is not a string', () => {
    expect(() => Item(123)).toThrow(TypeError);
    expect(() => Item(null)).toThrow('Item text must be a string.');
  });

  test('applies styles correctly', () => {
    const styles = { color: 'red', fontWeight: 'bold' };
    const result = Item('Styled', { styles });
    expect(result.options.style).toEqual(styles);
  });

  test('assigns onClick callback correctly', () => {
    const onClick = jest.fn();
    const result = Item('Click me', { onClick });
    expect(result.options.onclick).toBe(onClick);
  });

  test('calls onClick handler when invoked', () => {
    const onClick = jest.fn();
    const result = Item('Click test', { onClick });
    result.options.onclick({});
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('does not throw when no onClick is provided', () => {
    const result = Item('No click');
    expect(
      () => result.options.onclick && result.options.onclick({}),
    ).not.toThrow();
  });

  test('returns a new independent object each call', () => {
    const r1 = Item('A');
    const r2 = Item('B');
    expect(r1).not.toBe(r2);
    expect(r1.options).not.toBe(r2.options);
  });
});
