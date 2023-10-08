/**
 * Adds CSS styles to an element.

 * @param element The element to add the CSS styles to.
 * @param declaration An object of CSS properties and values.

 * @throws Error If the element is not a valid DOM element.

 * @example
 * // Add the `background-color: red` style to the `<body>` element.
 * addStyle(document.body, { backgroundColor: 'red' });

 * // Add the `font-size: 16px` style to all of the `.my-elements` elements.
 * addStyle(document.querySelectorAll('.my-elements'), { fontSize: '16px' });
 */
function addStyle(element, declaration) {
  // Check if the element is a valid DOM element.
  if (typeof declaration === "object" && declaration !== null) {
    // Iterate over the declaration object to extract the property and its corresponding value.
    for (const property in declaration) {
      // Extract the value of the property.
      const value = declaration[property];

      // Apply the style to the element.
      element.style[property] = value;
    }
  } else {
    throw new Error("Invalid DOM element.");
  }
}

export { addStyle };
