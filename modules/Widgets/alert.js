/**
 * Creates a pre-styled alert box element for the DomWizard library.
 * This function returns a standard HTMLElement, which is the expected
 * "DomWizard element" that can be manipulated by the library.
 *
 * @param {object} options - The options for the alert widget.
 * @param {string} options.text - The message text to display in the alert.
 * @param {string} options.type - Defines the alert type ('success', 'error', 'warning', 'info').
 * @param {function} [options.onClick] - Optional function called when the alert is clicked.
 * @param {object} [options.styles] - Optional object to override default alert styles.
 * @returns {HTMLElement} A fully-formed DOM element representing the alert.
 */
function Alert({ text, type = 'info', onClick, styles = {} }) {
  // --- 1. Define Base Styles and Type-Specific Configurations ---

  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    margin: '0.5rem 0',
    fontSize: '1rem',
    lineHeight: '1.5',
    borderRadius: '0.5rem',
    border: '1px solid',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease',
    maxWidth: '100%', // For responsiveness
  };

  const icons = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  };

  const typeConfig = {
    success: { backgroundColor: '#F0FFF4', borderColor: '#38A169', color: '#2F855A' },
    error: { backgroundColor: '#FFF5F5', borderColor: '#E53E3E', color: '#C53030' },
    warning: { backgroundColor: '#FFFAF0', borderColor: '#DD6B20', color: '#C05621' },
    info: { backgroundColor: '#EBF8FF', borderColor: '#3182CE', color: '#2B6CB0' },
  };

  // --- 2. Create and Assemble DOM Elements ---

  const alertElement = document.createElement('div');
  const iconContainer = document.createElement('div');
  const textContainer = document.createElement('div');

  const currentType = typeConfig[type] || typeConfig.info;

  // Icon Element
  iconContainer.innerHTML = icons[type] || icons.info;
  Object.assign(iconContainer.style, {
    marginRight: '0.75rem',
    flexShrink: '0',
    display: 'flex',
    alignItems: 'center',
  });

  // Text Element
  textContainer.textContent = text;

  // --- 3. Apply Styles (Base -> Type -> User Override) ---

  const finalStyles = { ...baseStyles, ...currentType, ...styles };
  Object.assign(alertElement.style, finalStyles);

  // --- 4. Add Interactivity ---

  if (typeof onClick === 'function') {
    alertElement.style.cursor = 'pointer';
    alertElement.addEventListener('click', onClick);
    alertElement.addEventListener('mouseover', () => {
      alertElement.style.transform = 'scale(1.01)';
      alertElement.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    });
    alertElement.addEventListener('mouseout', () => {
      alertElement.style.transform = 'scale(1)';
      alertElement.style.boxShadow = baseStyles.boxShadow;
    });
  }

  // --- 5. Assemble and Return the Final Element ---

  alertElement.appendChild(iconContainer);
  alertElement.appendChild(textContainer);

  // This HTMLElement is the "DomWizard element" to be returned.
  return alertElement;
}

