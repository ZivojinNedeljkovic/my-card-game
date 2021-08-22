import { View } from '../../view'
import { CardView } from './cardView'

export class CardSpotView extends View {
  #cards = []
  constructor(parenEl, id) {
    super(parenEl)
    this.id = id
  }

  render() {
    super.render('div', '.players-deck__cards-spots', `
      <div class="players-deck__cards-spots__card-spot-0"></div>
      <div class="players-deck__cards-spots__card-spot-1"></div>
      <div class="players-deck__cards-spots__card-spot-2"></div>
      <div class="players-deck__cards-spots__card-spot-3"></div>
      <div class="players-deck__cards-spots__card-spot-4"></div>
      <div class="players-deck__cards-spots__card-spot-5"></div>
      <div class="players-deck__cards-spots__card-spot-6"></div>

    `)
    this._element.dataset.id = this.id
  }

  addCard(cardName, cardID) {
    const card = new CardView(this._element, cardName, cardID)
    card.render()
    this.#cards.push(card)
    card.pushClass(`players-deck__cards-spot__card-${this.#cards.length - 1}`)
  }

  addCards(cardName, cardID, numOfCards) {
    for (let i = 0; i < numOfCards; i++) this.addCard(cardName, cardID)
  }

  isEmpty() {
    return this.#cards.length === 0
  }

  popCard() {
    return this.#cards.pop()
  }
}
