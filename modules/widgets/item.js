/**
 * Creates an Item element representing a single list entry.
 *
 * @param {string} text - The visible text content of the item.
 * @param {Object} [options={}] - Optional item configuration.
 * @param {function(Event): void} [options.onClick] - Callback triggered when the item is clicked.
 * @param {Object} [options.styles={}] - Custom CSS style overrides for the list item.
 * @throws {TypeError} If `text` is not a string.
 * @returns {DomWizardElement} A domManager element representing the list item.
 */
export const Item = (text, options = {}) => {
    if (typeof text !== "string")
        throw new TypeError("Item text must be a string.");

    const { onClick, styles = {} } = options;

    return {
        tagName: "li",
        options: {
            textContent: text,
            style: styles,
            onclick: onClick,
        },
    };
};