/**
 * The cssManager module facilitates the creation and application of CSS styles to elements. It's important to note that this module isn't intended to replace traditional CSS, but rather to provide an API for efficiently adding CSS rules to elements using JavaScript when it's the most suitable approach.
 */
const cssManager = () => {
  const style = document.createElement('style');
  style.id = 'dml-style';
  document.head.appendChild(style);

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
  const addRule = (rule) => {
    if (!(rule !== null && typeof rule === 'object' && !Array.isArray(rule))) {
      throw new Error(
        'rule must be of type object with key and value pairs for the styles to be applied correctly',
      );
    }

    const stylesheet = document.querySelector('#dml-style').sheet;
    const [selector, declaration] = Object.entries(rule)[0];
    return stylesheet.insertRule(
      `${selector}{${declaration}}`,
      stylesheet.cssRules.length,
    );
  };

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
  const removeRule = (index) => {
    if (typeof index !== 'number') {
      throw new Error(
        `index should be a number for a rule to be removed correctly. Currently index is of type of ${typeof index}`,
      );
    }

    const stylesheet = document.querySelector('#dml-style').sheet;
    stylesheet.deleteRule(index);
  };

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
  const createCSSRules = (rules) => {
    if (!Array.isArray(rules)) {
      throw new Error('rules must an Array object');
    }

    for (const rule of rules) {
      addRule(rule);
    }
  };

  return { addRule, createCSSRules, removeRule };
};

export default cssManager();
