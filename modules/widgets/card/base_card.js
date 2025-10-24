'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var Card = /** @class */ (function () {
  function Card(
    renderContent,
    heading,
    styles,
    onclick,
    imageSrc,
    imageStyles,
    imageAlt,
  ) {
    this.heading = ' ';
    this.imageSrc = ' ';
    this.preimageStyle = {
      width: '100%',
      heigth: '100%',
    };
    this.styles = {
      position: 'relative',
      backgroundColor: '#e4e4e4',
      padding: '10px 10px',
      'border-radius': '5px',
      'box-shadow': '0px 0px 5px #00000052',
      cursor: 'pointer',
    };
    this.renderContent = renderContent;
    this.heading = heading;
    this.styles = styles !== null && styles !== void 0 ? styles : this.styles;
    this.onclick = onclick;
    this.imageSrc = imageSrc;
    this.imageAlt = imageAlt;
    this.preimageStyle =
      imageStyles !== null && imageStyles !== void 0
        ? imageStyles
        : this.preimageStyle;
  }
  Card.prototype.render = function () {
    var _a, _b;
    var head =
      (_b =
        (_a = this.heading) === null || _a === void 0
          ? void 0
          : _a.toString()) !== null && _b !== void 0
        ? _b
        : '';
    return {
      tagName: 'div',
      className: 'dom-wizard-card',
      children: [
        this.title(head),
        this.renderContent,
        this.image(this.imageSrc, this.imageAlt, this.preimageStyle),
      ],
      heading: this.heading,
      options: {
        onclick: this.onclick,
        style: this.styles,
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
  Card.prototype.image = function (src, alt, imgStyle) {
    return src
      ? {
          tagName: 'img',
          options: {
            src: src,
            alt: alt,
            style:
              imgStyle !== null && imgStyle !== void 0
                ? imgStyle
                : this.preimageStyle,
          },
        }
      : {};
  };
  return Card;
})();
exports.default = Card;
