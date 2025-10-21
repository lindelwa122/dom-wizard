import { Label } from '../label';

class Card {
  renderContent: Function;
  heading?: String;
  styles?: Object;
  onclick?: Function;
  imageSrc?: string;
  imageAlt?: string;
  imageStyles?: Object;

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
    this.styles = styles;
    this.onclick = onclick;
    this.imageSrc = imageSrc;
    this.imageAlt = imageAlt;
    this.imageStyles = imageStyles;
  }

  render() {
    var head = this.heading?.toString() ?? '';
    return {
      tagName: 'div',
      className: 'dom-wizard-card',
      children: [this.title(head), this.renderContent],
      heading: this.heading,
      options: {
        onclick: this.onclick,
        style: this.styles ?? {
          position: 'relative',
          backgroundColor: '#e4e4e4',
          padding: '10px 10px',
          'border-radius': '5px',
          'box-shadow': '0px 0px 5px #00000052',
          cursor: 'pointer',
        },
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
  private image(src: string, alt?: string, style?: string) {
    return {
      tagName: 'img',
    };
  }
}

export default Card;
