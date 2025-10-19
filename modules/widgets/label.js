/**
 * Creates a Label element using domManager elements.
 *
 * @param {string} text - The text content displayed within the label.
 * @param {Object} [options={}] - Optional label configuration.
 * @param {string} [options.for] - The id of the form element this label is associated with.
 * @param {Object} [options.styles={}] - Custom CSS style overrides for the label.
 * @param {function(Event): void} [options.onClick] - Callback triggered when the label is clicked.
 * @param {string} [options.title] - Tooltip text shown on hover.
 * @param {boolean} [options.hidden=false] - Whether the label should be visually hidden but still accessible to screen readers.
 * @throws {TypeError} If `text` is not a string.
 * @returns {DomWizardElement} A domManager element representing the label.
 */
export const Label = (text, options = {}) => {
    if (typeof text !== "string")
        throw new TypeError("Label text must be a string.");

    const {
        for: htmlFor,
        styles = {},
        onClick,
        title,
        hidden = false,
    } = options;

    return {
        tagName: "label",
        options: {
            htmlFor,
            style: styles,
            onclick: onClick,
            title,
            hidden,
            textContent: text,
        },
    };
};
