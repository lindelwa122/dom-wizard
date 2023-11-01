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

    if (element.link) {
      router.configureLink(Object.assign({}, element.link, { element: el }));
    }

    if (!element.options) return el;

    for (const [prop, value] of Object.entries(element.options)) {
      el[prop] = prop === 'classList' ? value.join(' ') : value;
    }

    if (element.options.style) {
      for (const [prop, value] of Object.entries(element.options.style)) {
        el.style[prop] = value;
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

    if (element.before) {
      if (typeof element.before !== 'function') {
        throw new Error("'before' must be a function'");
      }

      element.before(el);
    }

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

    if (element.after) {
      if (typeof element.after !== 'function') {
        throw new Error("'after' must be a function'");
      }

      element.after(el);
    }

    return parent;
  };

  /**
   * Retrieves information from the DOM based on the provided selector and property name.
   *
   * @param {string} selector - The CSS selector to query the DOM.
   * @param {string} propertyName - The property name to retrieve from the selected element(s).
   * @param {boolean} all - If true, retrieves the property from all matching elements; otherwise, retrieves from the first matching element.
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

  /**
   * Removes elements from the DOM based on the provided selector.
   *
   * @param {string} selector - The CSS selector to target elements for removal.
   * @param {boolean} all - If true, removes all matching elements; otherwise, removes the first matching element.
   *
   * @throws Throws an error if the selector doesn't match any elements or if removal fails.
   *
   * @returns {Array|HTMLElement} If all is true, an array of removed elements; otherwise, the removed element.
   */
  const remove = (selector, all = false) => {
    const el = !all
      ? document.querySelector(selector)
      : document.querySelectorAll(selector);

    if (!el || el.length === 0) {
      throw new Error(
        `${selector} is not found in the DOM. Ensure the spelling is correct.`,
      );
    }

    if (all) {
      el.forEach((x) => x.remove());
    } else {
      el.remove();
    }

    return el;
  };

  /**
   * Toggles a class in the classList of the provided element.
   *
   * @param {HTMLElement} element - The element to toggle the class on.
   * @param {Object} instr - An instruction object containing the class name in the 'className' property.
   *
   * @throws {Error} When 'className' is missing in the instruction object.
   */
  const _toggle = (element, instr) => {
    if (!instr.className) {
      throw new Error("The property 'className' is required for toggle.");
    }

    element.classList.toggle(instr.className);
  };

  /**
   * Replaces a specific attribute in the provided element.
   *
   * @param {HTMLElement} element - The element to replace the attribute in.
   * @param {Object} instr - An instruction object containing the attribute name in 'attribute', 'old' value, and 'new' value.
   *
   * @throws {Error} When 'attribute', 'old', or 'new' is missing in the instruction object.
   * @throws {Error} When the 'attribute' specified doesn't support replace.
   */
  const _replace = (element, instr) => {
    if (!instr.attribute) {
      throw new Error("The property 'attribute' is required for replace.");
    }

    if (!instr.old || !instr.new) {
      throw new Error(
        "The properties 'old' and 'new' are required for replace.",
      );
    }

    try {
      if (instr.attribute === 'classList') {
        element[instr.attribute].replace(instr.old, instr.new);
      } else {
        element[instr.attribute] = element[instr.attribute].replace(
          instr.old,
          instr.new,
        );
      }
    } catch (e) {
      throw new Error(
        `The attribute '${instr.attribute}' doesn't support replace.`,
      );
    }
  };

  /**
   * Replaces all occurrences of a specific value in the provided element.
   *
   * @param {HTMLElement} element - The element to perform the replacement on.
   * @param {Object} instr - An instruction object containing the attribute name in 'attribute', 'old' value, and 'new' value.
   *
   * @throws {Error} When 'attribute', 'old', or 'new' is missing in the instruction object.
   * @throws {Error} When the 'attribute' specified doesn't support replaceAll.
   */
  const _replaceAll = (element, instr) => {
    if (!instr.attribute) {
      throw new Error("The property 'attribute' is required for replaceAll.");
    }

    if (!instr.old || !instr.new) {
      throw new Error(
        "The properties 'old' and 'new' are required for replaceAll.",
      );
    }

    try {
      element[instr.attribute] = element[instr.attribute].replaceAll(
        instr.old,
        instr.new,
      );
    } catch (e) {
      throw new Error(
        `The attribute '${instr.attribute}' doesn't support replaceAll.`,
      );
    }
  };

  /**
   * Updates the element's properties and attributes based on the provided instruction.
   *
   * @param {HTMLElement} element - The element to be updated.
   * @param {Object} instr - An instruction object containing properties and values for updating.
   */
  const _update = (element, instr) => {
    if (instr.children) {
      for (const child of instr.children) {
        const el = _createDOMTree(child);
        element.appendChild(el);
      }
    }

    for (const [key, item] of Object.entries(instr)) {
      if (key !== 'selector' && key !== 'action' && key !== 'children') {
        element[key] = item;
      }
    }
  };

  /**
   * Adds a value to the specified attribute (e.g., class, dataset) in the provided element.
   *
   * @param {HTMLElement} element - The element to add the value to.
   * @param {Object} instr - An instruction object containing 'attribute' and 'value'.
   *
   * @throws {Error} When 'attribute' or 'value' is missing in the instruction object.
   * @throws {Error} When the 'attribute' specified doesn't support add.
   */
  const _add = (element, instr) => {
    if (!instr.attribute) {
      throw new Error(
        "The properties 'attribute' and 'value' are required for add.",
      );
    }

    try {
      element[instr.attribute].add(instr.value);
    } catch (e) {
      throw new Error(`The attribute '${instr.attribute}' doesn't support add`);
    }
  };

  /**
   * Removes a value from the specified attribute (e.g., class, dataset) in the provided element.
   *
   * @param {HTMLElement} element - The element to remove the value from.
   * @param {Object} instr - An instruction object containing 'attribute' and 'value'.
   *
   * @throws {Error} When 'attribute' or 'value' is missing in the instruction object.
   * @throws {Error} When the 'attribute' specified doesn't support remove.
   */
  const _remove = (element, instr) => {
    if (!instr.attribute) {
      throw new Error(
        "The properties 'attribute' and 'value' are required for remove.",
      );
    }

    try {
      element[instr.attribute].remove(instr.value);
    } catch (e) {
      throw new Error(
        `The attribute '${instr.attribute}' doesn't support remove.`,
      );
    }
  };

  /**
   * Applies CSS styles to the provided element.
   *
   * @param {HTMLElement} element - The element to apply styles to.
   * @param {Object} instr - An instruction object containing style properties and values.
   */
  const _style = (element, instr) => {
    for (const [prop, val] of Object.entries(instr)) {
      if (prop !== 'selector' && prop !== 'action') {
        element.style[prop] = val;
      }
    }
  };

  /**
   * Modifies the information and attributes of elements in the DOM based on the provided instructions.
   *
   * @param {Object} instr - Contains information of the element to be modified and how it should be modified.
   * @param {string} instr.selector - A string to select the element to be modified.
   * @param {'toggle' | 'replace' | 'replaceAll' | 'update' | 'add' | 'remove' | 'style'} instr.action - The action to be performed on the selected element.
   * @param {boolean} all - A boolean value to specify if the first or all items matching the selector should be updated
   *
   * @throws {Error} When the 'selector' property is missing in instr.
   * @throws {Error} When the 'action' property is missing in instr.
   * @throws {Error} When the element is not found in the DOM.
   */
  const update = (instr, all = false) => {
    if (!instr.selector) {
      throw new Error("The property 'selector' is required.");
    }

    if (!instr.action) {
      throw new Error("The property 'action' is required.");
    }

    const element = all
      ? document.querySelectorAll(instr.selector)
      : document.querySelector(instr.selector);

    if (!element) {
      throw new Error(`Element '${instr.selector}' does not exist in the DOM`);
    }

    const applyUpdate = (callback) => {
      if (all) {
        element.forEach((item) => {
          callback(item, instr);
        });
      } else {
        callback(element, instr);
      }
    };

    switch (instr.action) {
      case 'toggle':
        applyUpdate(_toggle);
        break;

      case 'replace':
        applyUpdate(_replace);
        break;

      case 'replaceAll':
        applyUpdate(_replaceAll);
        break;

      case 'update':
        applyUpdate(_update);
        break;

      case 'add':
        applyUpdate(_add);
        break;

      case 'remove':
        applyUpdate(_remove);
        break;

      case 'style':
        applyUpdate(_style);
        break;
    }
  };

  return { create, read, remove, update };
};

export default domManager();
