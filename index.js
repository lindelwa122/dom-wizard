import domManager from './modules/domManager';
import cssManager from './modules/cssManager';
import router from './modules/router';
import store from './modules/store';

// Apply global basic styles from the original file
cssManager.addRule({ body: 'transition: opacity .25s' });

// --- Widget Global Default Styles ---
// These rules define the base look for our list widgets and are injected once.
cssManager.addRule({
  '.domwizard-list': {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    border: '1px solid #eee',
    borderRadius: '4px',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    backgroundColor: '#fff',
  },
  '.domwizard-list-item': {
    padding: '10px 15px',
    transition: 'background-color 0.2s ease',
    borderBottom: '1px solid #eee', // All items get a bottom border by default
  },
  '.domwizard-list-item:last-child': {
    borderBottom: 'none', // Remove border from the last item
  },
  '.domwizard-list-item:hover': {
    backgroundColor: '#f0f0f0',
  },
  '.domwizard-list-item-clickable': {
    cursor: 'pointer',
  },
});

/**
 * Creates a DomWizard list item (<li>) element.
 * @param {string} text - The text content of the list item.
 * @param {function} [onClick] - Optional click handler for the item.
 * @param {Object.<string, string>} [styles] - Optional CSS styles to apply to the item, overriding defaults.
 * @returns {HTMLElement} The DomWizard <li> element.
 */
function Item(text, onClick, styles) {
  const li = domManager.createElement('li');
  domManager.addClass(li, 'domwizard-list-item'); // Apply default item styles

  li.innerText = text;

  if (onClick) {
    domManager.addClass(li, 'domwizard-list-item-clickable'); // Add clickable class
    domManager.addEventListener(li, 'click', onClick);
  }

  if (styles) {
    cssManager.applyStyles(li, styles); // Apply user-provided inline styles
  }
  return li;
}

/**
 * Creates a DomWizard ordered list (<ol>) element.
 * @param {HTMLElement[]} items - An array of DomWizard <li> elements created by `Item`.
 * @param {Object.<string, string>} [styles] - Optional CSS styles to apply to the ordered list, overriding defaults.
 * @returns {HTMLElement} The DomWizard <ol> element.
 */
function OrderedList(items, styles) {
  const ol = domManager.createElement('ol');
  domManager.addClass(ol, 'domwizard-list'); // Apply default list styles

  if (styles) {
    cssManager.applyStyles(ol, styles); // Apply user-provided inline styles
  }

  items.forEach(item => {
    domManager.appendChild(ol, item);
  });
  return ol;
}

/**
 * Creates a DomWizard unordered list (<ul>) element.
 * @param {HTMLElement[]} items - An array of DomWizard <li> elements created by `Item`.
 * @param {Object.<string, string>} [styles] - Optional CSS styles to apply to the unordered list, overriding defaults.
 * @returns {HTMLElement} The DomWizard <ul> element.
 */
function UnorderedList(items, styles) {
  const ul = domManager.createElement('ul');
  domManager.addClass(ul, 'domwizard-list'); // Apply default list styles

  if (styles) {
    cssManager.applyStyles(ul, styles); // Apply user-provided inline styles
  }

  items.forEach(item => {
    domManager.appendChild(ul, item);
  });
  return ul;
}

// --- Main DomWizard API Export ---
// Consolidate all modules and new widgets into a single DomWizard object.
const DomWizard = {
  domManager,
  cssManager,
  router,
  store,
  widget: {
    Item,
    List: {
      OrderedList,
      UnorderedList,
    },
  },
};

export default DomWizard;