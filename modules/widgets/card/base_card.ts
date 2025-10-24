class Card {
  renderContent: Function;
  heading?: String = ' ';
  onclick?: Function;
  imageSrc?: string = ' ';
  imageAlt?: string;
  preimageStyle: Object = {
    width: '100%',
    heigth: '100%',
  };
  styles: Object = {
    position: 'relative',
    backgroundColor: '#e4e4e4',
    padding: '10px 10px',
    'border-radius': '5px',
    'box-shadow': '0px 0px 5px #00000052',
    cursor: 'pointer',
  };

  constructor(
    renderContent: Function,
    heading?: string,
    styles?: Object,
    onclick?: Function,
    imageSrc?: string,
    imageStyles?: Object,
    imageAlt?: string,
  ) {
    this.renderContent = renderContent;
    this.heading = heading;
    this.styles = styles ?? this.styles;
    this.onclick = onclick;
    this.imageSrc = imageSrc;
    this.imageAlt = imageAlt;
    this.preimageStyle = imageStyles ?? this.preimageStyle;
  }

  render() {
    var head = this.heading?.toString() ?? '';
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
  }
  private title(text: string) {
    return {
      tagName: 'h2',
      options: {
        textContent: text,
      },
    };
  }
  private image(src?: string, alt?: string, imgStyle?: Object) {
    return src
      ? {
          tagName: 'img',
          options: {
            src: src,
            alt: alt,
            style: imgStyle ?? this.preimageStyle,
          },
        }
      : {};
  }
}

export default Card;
