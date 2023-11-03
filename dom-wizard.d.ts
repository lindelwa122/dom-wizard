declare module 'dom-wizard' {
  type ElementOptions = {
    className?: string;
    id?: string;
    classList?: Array<string>;
  };

  type LinkConfig = {
    name: string;
    to: string;
  };

  type ElementDefinition = {
    tagName?: string;
    options?: ElementOptions;
    link?: LinkConfig;
    children?: Array<ElementDefinition>;
  };

  type UpdateInstruction = {
    selector: string;
    action:
      | 'toggle'
      | 'replace'
      | 'replaceAll'
      | 'update'
      | 'add'
      | 'remove'
      | 'style';
    className?: string;
    attribute?: string;
    new?: any;
    old?: any;
    value?: any;
    chidren: Array<ElementDefinition>;
  };

  /**
   * The domManager module is responsible for creating, updating, reading, and deleting DOM elements.
   */
  export declare const domManager: {
    /**
     * Creates a new HTML element and appends it to a specified parent element.
     *
     * @param {Object} element - An object with information about the element to be created (property: tagName is required).
     * @param {string} [selector='#root'] - Selector of the parent to append the newly created element into.
     * @param {boolean} [append=false] - Indicates whether to append the new element as a child or replace existing content.
     * @throws Throws an error if the parent element specified by the selector is not found in the document.
     * @returns {Element} The parent element with the new child element appended to it.
     */
    create(
      element: ElementDefinition,
      selector?: string,
      append?: boolean,
    ): Element;

    /**
     * Retrieves information from the DOM based on the provided selector and property name.
     *
     * @param {string} selector - The CSS selector to query the DOM.
     * @param {string} [propertyName=undefined] - The property name to retrieve from the selected element(s).
     * @param {boolean} [all=false] - If true, retrieves the property from all matching elements; otherwise, retrieves from the first matching element.
     *
     * @throws Throws an error if retrieving the element was not possible or if the selector didn't match any elements.
     *
     * @returns {Array|string|undefined} If all is true and propertyName is provided, an array of property values from all matching elements; if propertyName is provided, the property value from the first matching element; otherwise, the DOM element(s) matching the selector.
     */
    read(
      selector: string,
      propertyName?: string,
      all?: boolean,
    ): string | Array<string>;

    /**
     * Removes elements from the DOM based on the provided selector.
     *
     * @param {string} selector - The CSS selector to target elements for removal.
     * @param {boolean} [all=false] - If true, removes all matching elements; otherwise, removes the first matching element.
     *
     * @throws Throws an error if the selector doesn't match any elements or if removal fails.
     *
     * @returns {Array|HTMLElement} If all is true, an array of removed elements; otherwise, the removed element.
     */
    remove(selector: string, all?: boolean): Array<HTMLElement> | HTMLElement;

    /**
     * Modifies the information and attributes of elements in the DOM based on the provided instructions.
     *
     * @param {Object} instr - Contains information of the element to be modified and how it should be modified.
     * @param {string} instr.selector - A string to select the element to be modified.
     * @param {'toggle' | 'replace' | 'replaceAll' | 'update' | 'add' | 'remove' | 'style'} instr.action - The action to be performed on the selected element.
     *
     * @throws {Error} When the 'selector' property is missing in instr.
     * @throws {Error} When the 'action' property is missing in instr.
     * @throws {Error} When the element is not found in the DOM.
     */
    update(instr: UpdateInstruction): void;
  };

  /**
   * The cssManager module facilitates the creation and application of CSS styles to elements. It's important to note that this module isn't intended to replace traditional CSS, but rather to provide an API for efficiently adding CSS rules to elements using JavaScript when it's the most suitable approach.
   */
  export declare const cssManager: {
    /**
     * Adds a CSS rule to the stylesheet.
     *
     * @param {Object} rule - An object with a selector as its key and a declaration as its value.
     *
     * @throws an error if rule is not an Object with key and value pairs
     *
     * @returns {number} The index of the added rule, which can be used to remove the rule.
     *
     * @example
     * const ruleIndex = cssManager.addRule({ 'body': 'background-color: red' });
     * // Use the index to remove the rule:
     * cssManager.removeRule(ruleIndex);
     */
    addRule(rule: Object): number;

    /**
     * Removes a CSS rule from the stylesheet using the specified index.
     *
     * @param {number} index - The index of the rule to be removed.
     *
     * @throws an error if index is not a number
     *
     * @example
     * // Remove a CSS rule by its index
     * cssManager.removeRule(ruleIndex);
     */
    removeRule(index: number): void;

    /**
     * Adds multiple CSS rules to the page.
     *
     * @param {Array<Object>} rules - An array containing CSS rules, where each rule is an object
     * with a selector as its key and a declaration as its value.
     *
     * @throws an error if rules is not an array
     * @throws an error if rules doesn't contain object(s) with key(s) and value(s)
     *
     * @example
     * // Add CSS rules for different screen sizes and background colors
     * cssManager.createCSSRules([
     *   {
     *     '@media screen and (min-width: 480px)': `
     *       body {
     *         background-color: blue;
     *       }
     *     `
     *   },
     *   {
     *     'body': `
     *       min-height: 100vh;
     *       background-color: red;
     *     `
     *   }
     * ]);
     */
    createCSSRules(rules: Array<Object>): void;
  };

  type Route = {
    id: string;
    route: ElementDefinition;
  };

  type LinkDefinition = {
    name: string;
    to: string;
    element: HTMLElement;
    host?: string;
    animate?: boolean;
  };

  /**
   * The router module is responsible for registering routes, linking pages, and configuring URLs.
   */
  export declare const router: {
    /**
     * Registers the provided routes, allowing them to be used later for navigation.
     *
     * @param {Array<Object>} routes - An array containing information about the routes to be registered.
     * Each route object should have the following structure:
     * - `id` (string): A unique identifier for the route.
     * - `route` (Object): An object containing a component to ebe rendered by domManager.
     *
     * @throws {Error} If the `register` function is invoked more than once in the application.
     * @throws {Error} If the `routes` parameter is not an array.
     * @throws {Error} If any item in the `routes` array is not an object with key-value pairs.
     * @throws {Error} If any item in the `routes` array does not have the required 'id' and 'route' keys.
     * @throws {Error} If any routes share the same 'id'.
     */
    register(routes: Array<Route>): void;

    /* Configures a link with the provided link information.
     *
     * @param {Object} linkInfo - The link information object.
     * @param {string} linkInfo.name - The name of the link.
     * @param {string} linkInfo.to - The ID of the page to link to.
     * @param {string} [linkInfo.host] - The selector of the element to host the page.
     * @param {boolean} [linkInfo.animate] - A smooth transition is added when pages are changing if animate is true
     * @param {HTMLElement} linkInfo.element - The HTML element to attach the click event listener to.
     *
     * @throws {Error} If the linkInfo object is missing 'name,' 'to,' or 'element' properties.
     * @throws {Error} If the specified page ID ('to') does not match any registered pages.
     */
    configureLink(linkInfo: LinkDefinition): void;
  };

  /**
   * The store module provides a central storage mechanism for managing and sharing data across your application.
   * It allows you to create, retrieve, and update variables within a private store.
   */
  export declare const store: {
    /**
     * Creates the initial store by accepting an object with key-value pairs. This function throws an error
     * if invoked more than once.
     *
     * @param {Object} storeObject - An object containing properties and values to be stored in the store.
     *
     * @throws {Error} If storeObject is not an Object with key-value pairs.
     * @throws {Error} If createStore is invoked more than once.
     */
    createStore(storeObject: Object): void;

    /**
     * Retrieves the value associated with a specified key in the store.
     *
     * @param {string} key - The key of the variable stored in the private store.
     * @returns {*} The value of the specified key if found; otherwise, undefined.
     */
    getState(key: string): any;

    /**
     * Updates the value associated with a specified key in the store. If the key doesn't exist, an error is thrown.
     *
     * @param {string} key - The key of the state to be updated.
     * @param {*} newValue - The new value for the specified state.
     *
     * @throws {Error} If the key does not exist in the store.
     */
    updateState(key: string, newValue: any): void;
  };
}
