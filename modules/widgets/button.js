/**
 * Creates a Button widget using DomWizard elements.
 *
 * @param {string} text - The text content displayed on the button.
 * @param {Object} [options={}] - Optional button configuration.
 * @param {function(Event): void} [options.onClick] - Callback triggered when the button is clicked.
 * @param {Object} [options.styles={}] - Custom CSS style overrides for the button.
 * @param {boolean} [options.disabled=false] - Whether the button is disabled.
 * @param {string} [options.type="button"] - Button type attribute ("button", "submit", "reset").
 * @param {string} [options.title] - Tooltip text shown on hover.
 *
 * @returns {DomWizardElement} A DomWizard element representing the button.
 *
 * @example
 * const saveButton = widget.Button("Save", {
 *   onClick: () => console.log("Saved!"),
 *   styles: { padding: "10px 20px", backgroundColor: "#4caf50", color: "#fff" },
 * });
 *
 * domManager.create(saveButton, document.body);
 */
export const Button = (text, options = {}) => {
    if (typeof text !== "string")
        throw new TypeError("Button text must be a string.");

    const {
        onClick,
        styles = {},
        disabled = false,
        type = "button",
        title,
    } = options;

    return {
        tagName: "button",
        options: {
            type,
            textContent: text,
            onclick: onClick,
            style: styles,
            disabled,
            title,
        },
    };
};
