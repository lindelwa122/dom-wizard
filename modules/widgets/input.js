/**
 * Creates an input element with customizable options.
 *
 * @param {string} type - Defines the input type (e.g., "text", "email", "password", "number", etc.).
 * @param {Object} [options] - Optional input configuration.
 * @param {string} [options.placeholder] - Placeholder text displayed inside the input.
 * @param {string} [options.value] - Initial value of the input.
 * @param {function(Event): void} [options.onChange] - Called when the input value changes.
 * @param {function(Event): void} [options.onFocus] - Called when the input gains focus.
 * @param {function(Event): void} [options.onBlur] - Called when the input loses focus.
 * @param {Object} [options.styles] - Custom CSS style overrides.
 * @param {boolean} [options.disabled=false] - Whether the input should be disabled.
 * @param {string} [options.name] - Name attribute for form integration.
 * @throws {TypeError} If the input type is not a string.
 * @returns {DomWizardElement} A domManager element representing the input
 */

export const Input = (type, options = {}) => {
  if (typeof type != 'string') {
    throw new TypeError('Input type must be a string.');
  }

  const {
    placeholder = '',
    value = '',
    onChange,
    onFocus,
    onBlur,
    styles = {},
    disabled = false,
    name,
  } = options;

  return {
    tagName: 'input',
    options: {
      type,
      placeholder,
      value,
      name,
      style: styles,
      disabled,
      oninput: (e) => onChange && onChange(e),
      onfocus: (e) => onFocus && onFocus(e),
      onblur: (e) => onBlur && onBlur(e),
    },
  };
};
