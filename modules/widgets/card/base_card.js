'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var Card = /** @class */ (function () {
  function Card(renderContent, heading, styles, onclick) {
    this.renderContent = renderContent;
    this.heading = heading;
    this.styles = styles;
    this.onclick = onclick;
  }
  Card.prototype.render = function () {
    var _a;
    var head = this.heading.toString();
    return {
      tagName: 'div',
      className: 'dom-wizard-card',
      children: [this.title(head), this.renderContent],
      heading: this.heading,
      options: {
        onclick: this.onclick,
        style:
          (_a = this.styles) !== null && _a !== void 0
            ? _a
            : {
                position: 'relative',
                backgroundColor: '#e4e4e4',
                padding: '10px 10px',
                'border-radius': '5px',
                'box-shadow': '0px 0px 5px #00000052',
                cursor: 'pointer',
              },
      },
    };
  };
  Card.prototype.title = function (text) {
    return {
      tagName: 'h2',
      options: {
        textContent: text,
      },
    };
  };
  return Card;
})();
exports.default = Card;
