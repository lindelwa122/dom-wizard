'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = ImageCard;
var base_card_1 = require('./base_card');
/**
 * Create and render an image card component.
 *
 * This factory wraps the `Card` class from `./base_card`, passing image-related
 * arguments to the constructor and returning the rendered DOM/node output.
 *
 * @param {Function} renderContent - A function used to render the inner content of the card. It
 *   will be called by the `Card` instance when building the card body.
 * @param {string} imageSrc - The source URL of the image to display in the card.
 * @param {string} [imageAlt] - Optional alt text for the image. Defaults to an empty string if omitted.
 * @param {Object} [imageStyles] - Optional style object to apply to the image element (CSS properties as keys).
 * @param {string} [heading] - Optional heading text for the card.
 * @param {Object} [styles] - Optional style object to apply to the card container.
 * @param {Function} [onclick] - Optional click handler for the card. Receives the click event as an argument.
 *
 * @returns {*} The rendered card node returned by `Card.prototype.render()` (type depends on `Card` implementation).
 */
function ImageCard(
  renderContent,
  imageSrc,
  imageAlt,
  imageStyles,
  heading,
  styles,
  onclick,
) {
  var card = new base_card_1.default(
    renderContent,
    heading,
    styles,
    onclick,
    imageSrc,
    imageStyles,
    imageAlt,
  );
  return card.render();
}
