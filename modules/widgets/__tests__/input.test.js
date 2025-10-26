import { Input } from '../input.js';

describe('Input widget', () => {
  test('creates an input element with correct structure', () => {
    const result = Input('text');
    expect(result).toHaveProperty('tagName', 'input');
    expect(result.options.type).toBe('text');
    expect(result.options.disabled).toBe(false);
    expect(result.options.style).toEqual({});
  });

  test('throws if input type is not a string', () => {
    expect(() => Input(123)).toThrow(TypeError);
    expect(() => Input(null)).toThrow('Input type must be a string.');
  });

  test('applies placeholder, value, and name correctly', () => {
    const result = Input('text', {
      placeholder: 'Enter name',
      value: 'John',
      name: 'username',
    });
    expect(result.options.placeholder).toBe('Enter name');
    expect(result.options.value).toBe('John');
    expect(result.options.name).toBe('username');
  });

  test('applies styles and disabled flag correctly', () => {
    const result = Input('text', {
      styles: { border: '1px solid red' },
      disabled: true,
    });
    expect(result.options.style).toEqual({ border: '1px solid red' });
    expect(result.options.disabled).toBe(true);
  });

  test('calls event handlers when defined', () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const result = Input('text', { onChange, onFocus, onBlur });

    result.options.oninput({ target: { value: 'a' } });
    result.options.onfocus({});
    result.options.onblur({});

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test('does not throw when event handlers are missing', () => {
    const result = Input('text');
    expect(() => {
      result.options.oninput({});
      result.options.onfocus({});
      result.options.onblur({});
    }).not.toThrow();
  });

  test('returns a new independent object each call', () => {
    const r1 = Input('text');
    const r2 = Input('text');
    expect(r1).not.toBe(r2);
    expect(r1.options).not.toBe(r2.options);
  });
});
