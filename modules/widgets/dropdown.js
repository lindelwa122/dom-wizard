/**
 * Creates a Dropdown menu widget using domManager elements.
 *
 * @param {string} title - The main label or title displayed on the dropdown button.
 * @param {Array<string|Object>} items - The list of items to display (string or { text, value }).
 * @param {function(string|Object): void} onClick - Callback triggered when an item is selected.
 * @param {Object} [options={}] - Optional dropdown configuration.
 * @param {Object} [options.styles={}] - Custom CSS style overrides for the dropdown container.
 * @param {Object} [options.menuStyles={}] - Custom CSS style overrides for the dropdown menu.
 * @param {Object} [options.itemStyles={}] - Custom CSS style overrides for each dropdown item.
 * @throws {TypeError} If `title` is not a string or `items` is not an array.
 * @returns {DomWizardElement} A domManager element representing the dropdown.
 */
export const Dropdown = (title, items, onClick, options = {}) => {
    if (typeof title !== "string")
        throw new TypeError("Dropdown title must be a string.");
    if (!Array.isArray(items))
        throw new TypeError("Dropdown items must be an array.");

    const { styles = {}, menuStyles = {}, itemStyles = {} } = options;

    const menuItems = items.map((item) => {
        const text = typeof item === "string" ? item : item.text;
        const value = typeof item === "string" ? item : item.value ?? item.text;

        return {
            tagName: "li",
            options: {
                textContent: text,
                style: {
                    padding: "8px 12px",
                    cursor: "pointer",
                    ...itemStyles,
                },
                onclick: () => onClick && onClick(value),
            },
        };
    });

    const dropdownMenu = {
        tagName: "ul",
        options: {
            className: "dropdown-menu",
            style: {
                display: "none",
                listStyle: "none",
                margin: 0,
                padding: 0,
                position: "absolute",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                zIndex: 999,
                ...menuStyles,
            },
        },
        children: menuItems,
    };

    const button = {
        tagName: "button",
        options: {
            className: "dropdown-btn",
            style: {
                padding: "10px 14px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "15px",
                ...styles,
            },
            innerHTML: `${title} <span style="font-size:12px;">▼</span>`,
            onclick: (e) => {
                const menu = e.target.nextElementSibling;
                const isVisible = menu.style.display === "block";
                menu.style.display = isVisible ? "none" : "block";
            },
        },
    };

    return {
        tagName: "div",
        options: {
            className: "dropdown",
            style: {
                position: "relative",
                display: "inline-block",
                ...styles,
            },
        },
        children: [button, dropdownMenu],
    };
};
