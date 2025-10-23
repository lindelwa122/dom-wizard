
/**
 * Creates a List element for displaying a collection of Item elements.
 *
 * @param {Array<DomWizardElement>} items - An array of Item elements to display.
 * @param {Object} [options={}] - Optional list configuration.
 * @param {boolean} [options.ordered=false] - Whether to render an ordered (<ol>) list instead of unordered (<ul>).
 * @param {Object} [options.styles={}] - Custom CSS style overrides for the list container.
 * @throws {TypeError} If `items` is not an array.
 * @returns {DomWizardElement} A domManager element representing the list container.
 */
export const List = (items, options = {}) => {
    if (!Array.isArray(items))
        throw new TypeError("List items must be an array.");

    const { ordered = false, styles = {} } = options;

    return {
        tagName: ordered ? "ol" : "ul",
        options: {
            children: items,
            style: styles,
        },
    };
};

/**
 * Creates an OrderedList element (numbered list).
 *
 * @param {Array<DomWizardElement>} items - An array of Item elements to display.
 * @param {Object} [styles={}] - Custom CSS style overrides for the list container.
 * @throws {TypeError} If `items` is not an array.
 * @returns {DomWizardElement} A domManager element representing the ordered list.
 */
export const OrderedList = (items, styles = {}) => {
    return {
        tagName: "ol",
        options: {
            children: items,
            style: styles,
        },
    };
};

/**
 * Creates an UnorderedList element (bulleted list).
 *
 * @param {Array<DomWizardElement>} items - An array of Item elements to display.
 * @param {Object} [styles={}] - Custom CSS style overrides for the list container.
 * @throws {TypeError} If `items` is not an array.
 * @returns {DomWizardElement} A domManager element representing the unordered list.
 */
export const UnorderedList = (items, styles = {}) => {
    return {
        tagName: "ul",
        options: {
            children: items,
            style: styles,
        },
    };
};
