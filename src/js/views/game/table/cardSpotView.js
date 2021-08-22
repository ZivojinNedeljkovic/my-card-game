import { View } from '../../view'

export class CardSpotView extends View {
  constructor(parentEl, id) {
    super(parentEl)
    this.id = id
  }

  render() {
    return super.render('div', `.game__table__card-spot`)
  }

  pushCard(card) {
    this.card = card
    card.move(this, 490)
  }

  popCard() {
    const card = this.card
    this.card = undefined
    return card
  }
}
