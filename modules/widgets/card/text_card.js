'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = ContentCard;
var base_card_1 = require('./base_card');
function ContentCard(renderContent, heading, styles, onclick) {
  var card = new base_card_1.default(renderContent, heading, styles, onclick);
  return card.render();
}
