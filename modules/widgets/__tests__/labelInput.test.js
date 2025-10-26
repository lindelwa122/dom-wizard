import { LabelInput } from '../labelInput.js';

describe('LabelInput widget', () => {
  const mockLabel = { tagName: 'label', options: { textContent: 'Name' } };
  const mockInput = { tagName: 'input', options: { type: 'text' } };

  test('creates a container combining label and input', () => {
    const result = LabelInput(mockLabel, mockInput);

    expect(result.children).toEqual([mockLabel, mockInput]);
    expect(result.options.style.display).toBe('flex');
    expect(result.options.style.flexDirection).toBe('column');
    expect(result.options.style.gap).toBe('6px');
    expect(result.options.style.marginBottom).toBe('12px');
  });

  test('applies custom styles correctly', () => {
    const result = LabelInput(mockLabel, mockInput, {
      gap: '10px',
      color: 'red',
    });
    expect(result.options.style.gap).toBe('10px');
    expect(result.options.style.color).toBe('red');
    expect(result.options.style.display).toBe('flex'); // still includes defaults
  });

  test('does not mutate default styles object', () => {
    const customStyles = { gap: '20px' };
    const result = LabelInput(mockLabel, mockInput, customStyles);

    expect(customStyles).toEqual({ gap: '20px' }); // unchanged
    expect(result.options.style.gap).toBe('20px');
  });

  test('returns unique independent objects per call', () => {
    const first = LabelInput(mockLabel, mockInput);
    const second = LabelInput(mockLabel, mockInput);
    expect(first).not.toBe(second);
    expect(first.options).not.toBe(second.options);
  });

  test('supports empty style override gracefully', () => {
    const result = LabelInput(mockLabel, mockInput, {});
    expect(result.options.style.width).toBe('100%');
    expect(Object.keys(result.options.style)).toContain('display');
  });
});
