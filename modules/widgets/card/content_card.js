'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = ContentCard;
var base_card_1 = require('./base_card');
/**
 * Create and render a content-only card component.
 *
 * Wraps the `Card` class from `./base_card`, forwarding the provided
 * render function and optional presentation parameters, then returns the
 * rendered node produced by the `Card` instance.
 *
 * @param {Function} renderContent - A function responsible for populating the
 *   card body. It receives the card's content container as an argument.
 * @param {string} [heading] - Optional heading/title text for the card.
 * @param {Object} [styles] - Optional style object to apply to the card container (CSS properties as keys).
 * @param {Function} [onclick] - Optional click handler for the card; receives the click event.
 *
 * @returns {*} The rendered card node returned by `Card.prototype.render()` (depends on `Card` implementation).
 *
 * @example
 * import ContentCard from './content_card';
 *
 * function renderBody(container) {
 *   container.textContent = 'Hello, world!';
 * }
 *
 * const node = ContentCard(renderBody, 'Greeting', { padding: '8px' });
 * document.body.appendChild(node);
 */
function ContentCard(renderContent, heading, styles, onclick) {
  var card = new base_card_1.default(renderContent, heading, styles, onclick);
  return card.render();
}
