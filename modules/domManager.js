import router from './router';

/**
 * The domManager module is responsible for creating, updating, reading, and deleting DOM elements.
 */
const domManager = () => {
  /**
   * Creates an HTML element based on the provided element information.
   *
   * This function creates an HTML element based on the information provided in the 'element' object.
   * The 'element' object should have a 'tagName' property specifying the type of HTML element to create.
   *
   * @param {Object} element - An object with information about the element to be created (property: 'tagName' is required).
   * @returns {HTMLElement} A newly created HTML element.
   * @throws Throws an error if 'tagName' is missing, indicating that an element cannot be created without a tagName.
   */
  const _createElement = (element) => {
    if (!element.tagName) {
      throw new Error(
        'tagName is undefined. An element cannot be created without a tagName.',
      );
    }

    const el = document.createElement(element.tagName);

    if (!element.options) return el;

    if (element.link) {
      router.configureLink(element.link);
    }

    if (element.options) {
      for (const [prop, value] of Object.entries(element.options)) {
        el[prop] = prop === 'classList' ? value.join(' ') : value;
      }
    }

    return el;
  };

  /**
   * Creates a DOM tree based on the provided element information.
   *
   * This function recursively creates an HTML element and its children based on the
   * information provided in the 'element' object. The 'element' object should have a 'tagName' property
   * specifying the type of HTML element to create.
   *
   * @param {Object} element - An object with information about the element to be created (property: 'tagName' is required).
   * @returns {Element} A newly created HTML element and its children.
   * @throws Throws an error if 'element' is undefined.
   */
  const _createDOMTree = (element) => {
    if (!element) {
      throw new Error('Element parameter is undefined.');
    }

    const el = _createElement(element);

    if (element.children) {
      element.children.forEach((child) => {
        const childEl = _createDOMTree(child);
        el.appendChild(childEl);
      });
    }

    return el;
  };

  /**
   * Creates a new HTML element and appends it to a specified parent element.
   *
   * @param {Object} element - An object with information about the element to be created (property: tagName is required).
   * @param {string} selector - Selector of the parent to append the newly created element into.
   * @param {boolean} append - Indicates whether to append the new element as a child or replace existing content.
   * @throws Throws an error if the parent element specified by the selector is not found in the document.
   * @returns {Element} The parent element with the new child element appended to it.
   */
  const create = (element, selector = '#root', append = false) => {
    const el = _createDOMTree(element);
    const parent = document.querySelector(selector);
    if (!parent) {
      throw Error(
        `Element ${selector} is not found. Please ensure ${selector} exists in your HTML.`,
      );
    }

    if (!append) {
      parent.innerHTML = '';
    }

    parent.appendChild(el);
    return parent;
  };

  /**
   * Retrieves information from the DOM based on the provided selector and property name.
   *
   * @param {string} selector - The CSS selector to query the DOM.
   * @param {string} propertyName - The property name to retrieve from the selected element(s).
   * @param {boolean} all- If true, retrieves the property from all matching elements; otherwise, retrieves from the first matching element.
   *
   * @throws Throws an error if retrieving the element was not possible or if the selector didn't match any elements.
   *
   * @returns {Array|string|undefined} If all is true and propertyName is provided, an array of property values from all matching elements; if propertyName is provided, the property value from the first matching element; otherwise, the DOM element(s) matching the selector.
   */
  const read = (selector, propertyName = undefined, all = false) => {
    const el = !all
      ? document.querySelector(selector)
      : document.querySelectorAll(selector);

    if (!el || el.length === 0) {
      throw new Error(
        'Retrieving of the element was not possible. Please check your selector.',
      );
    }

    if (all && propertyName) {
      const props = [];
      el.forEach((element) => {
        props.push(element[propertyName]);
      });
      return props;
    } else if (propertyName) {
      return el[propertyName];
    } else {
      return el;
    }
  };

  return { create, read };
};

export default domManager();
