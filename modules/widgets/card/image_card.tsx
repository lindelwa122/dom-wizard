import Card from './base_card';

export default function ImageCard(
  renderContent: Function,
  heading?: string,
  styles?: Object,
  onclick?: Function,
) {
  let card = new Card(renderContent, heading, styles, onclick);

  return card.render();
}
