const cssManager = () => {
  const style = document.createElement('style');
  style.id = 'dml-style';
  document.head.appendChild(style);

  /**
   * Adds a CSS rule to the stylesheet.
   *
   * @param {Object} rule - An object with a selector as its key and a declaration as its value.
   * @returns {number} The index of the added rule, which can be used to remove the rule.
   *
   * @example
   * const ruleIndex = cssManager.addRule({ 'body': 'background-color: red' });
   * // Use the index to remove the rule:
   * cssManager.removeRule(ruleIndex);
   */
  const addRule = (rule) => {
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
   * @example
   * // Remove a CSS rule by its index
   * cssManager.removeRule(ruleIndex);
   */
  const removeRule = (index) => {
    const stylesheet = document.querySelector('#dml-style').sheet;
    stylesheet.deleteRule(index);
  };

  return { addRule, removeRule };
};

export default cssManager();
