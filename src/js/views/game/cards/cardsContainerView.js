import { View } from '../../view'
import { CardView } from './cardView'

export class CardContainerView extends View {
  #cards = []

  constructor(parentEl) {
    super(parentEl)
    window.addEventListener('resize', this.updateCardsPositions.bind(this))
  }

  get cards() {
    return this.#cards
  }

  #renderCards(cardName, amount) {
    for (let i = 0; i < amount; i++) {
      const card = new CardView(this._element, cardName)
      card.render()
      this.#cards.push(card)
    }
  }

  render(cards) {
    super.render('div', '.game__card-container')
    cards.forEach((value, key) => {
      // console.log(value, key)
      this.#renderCards(key, value)
    })
  }

  updateCardsPositions() {


    this.#cards.forEach(card => card.updatePosition())
  }
}
