/**
 * Creates an Alert widget — a pre-styled feedback message box.
 *
 * @param {string} text - The message text displayed in the alert.
 * @param {string} type - The alert type; one of 'success', 'error', 'warning', or 'info'.
 * @param {function(Event): void} [onClick] - Optional callback triggered when the alert is clicked.
 * @param {Object} [options={}] - Optional configuration.
 * @param {Object} [options.styles={}] - Custom style overrides for the alert container.
 * @throws {TypeError} If `text` is not a string or `type` is invalid.
 * @returns {DomWizardElement} A domManager element representing the alert.
 */
export const Alert = (text, type, onClick, options = {}) => {
    if (typeof text !== "string")
        throw new TypeError("Alert text must be a string.");
    const validTypes = ["success", "error", "warning", "info"];
    if (!validTypes.includes(type))
        throw new TypeError(
            `Alert type must be one of: ${validTypes.join(", ")}`
        );

    const { styles = {} } = options;

    const typeStyles = {
        success: {
            backgroundColor: "#d4edda",
            borderColor: "#c3e6cb",
            color: "#155724",
            icon: "✔️",
        },
        error: {
            backgroundColor: "#f8d7da",
            borderColor: "#f5c6cb",
            color: "#721c24",
            icon: "❌",
        },
        warning: {
            backgroundColor: "#fff3cd",
            borderColor: "#ffeeba",
            color: "#856404",
            icon: "⚠️",
        },
        info: {
            backgroundColor: "#d1ecf1",
            borderColor: "#bee5eb",
            color: "#0c5460",
            icon: "ℹ️",
        },
    };

    const ts = typeStyles[type];

    return {
        tagName: "div",
        children: [
            {
                tagName: "span",
                options: {
                    textContent: `${ts.icon} ${text}`,
                    style: { marginRight: "8px" },
                },
            },
        ],
        options: {
            style: {
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderRadius: "6px",
                border: `1px solid ${ts.borderColor}`,
                backgroundColor: ts.backgroundColor,
                color: ts.color,
                fontWeight: "500",
                cursor: onClick ? "pointer" : "default",
                ...styles,
            },
            onclick: onClick,
        },
    };
};
