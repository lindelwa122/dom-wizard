import { Label } from '../label.js';

describe('Label widget', () => {
  test('creates a label element with correct structure', () => {
    const result = Label('Username');
    expect(result.tagName).toBe('label');
    expect(result.options.textContent).toBe('Username');
    expect(result.options.style).toEqual({});
    expect(result.options.hidden).toBe(false);
  });

  test('throws if text is not a string', () => {
    expect(() => Label(123)).toThrow(TypeError);
    expect(() => Label(null)).toThrow('Label text must be a string.');
  });

  test('applies styles correctly', () => {
    const styles = { color: 'blue', fontSize: '14px' };
    const result = Label('Styled', { styles });
    expect(result.options.style).toEqual(styles);
  });

  test('sets htmlFor correctly', () => {
    const result = Label('Email', { for: 'email-input' });
    expect(result.options.htmlFor).toBe('email-input');
  });

  test('assigns onClick handler correctly', () => {
    const onClick = jest.fn();
    const result = Label('Clickable', { onClick });
    expect(result.options.onclick).toBe(onClick);
  });

  test('calls onClick handler when invoked', () => {
    const onClick = jest.fn();
    const result = Label('Click label', { onClick });
    result.options.onclick({});
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('sets title and hidden options correctly', () => {
    const result = Label('Hover me', { title: 'Tooltip', hidden: true });
    expect(result.options.title).toBe('Tooltip');
    expect(result.options.hidden).toBe(true);
  });

  test('returns unique independent objects per call', () => {
    const a = Label('A');
    const b = Label('B');
    expect(a).not.toBe(b);
    expect(a.options).not.toBe(b.options);
  });
});
