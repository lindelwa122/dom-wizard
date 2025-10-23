/**
 * Item
 * Represents an individual list element.
 *
 * @param {object} params - The configuration object.
 * @param {string} params.text - The visible text of the item.
 * @param {function} [params.onClick] - Optional callback triggered when the item is clicked.
 * @param {object} [params.styles={}] - Optional style overrides for the list item.
 *
 * @returns {DomElement} A DomWizard list item element.
 *
 * Example:
 * Item({ text: 'Home', onClick: () => console.log('Home clicked') })
 */
export function Item({ text, onClick, styles = {} }) {
    if (typeof text !== "string")
        throw new TypeError("Label text must be a string.");

    return {
        tagName : "li",
        children: [text],
        options: {
        style: {
            cursor: onClick ? "pointer" : "default",
            padding: "6px 10px",
            transition: "background 0.2s ease",
            borderRadius: "6px",
            ...styles,
        },
        onclick: onClick || null,
        onmouseenter: onClick ? (e) => e.target.style.background = "#f3f3f3" : null,
        onmouseleave: onClick ? (e) => e.target.style.background = "" : null,
    }
  }


}