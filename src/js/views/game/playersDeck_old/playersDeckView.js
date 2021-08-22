import { View } from '../../view'
import { CardView } from './cardView'
import { CardSpotView } from './cardSpotView'

export class PlayersDeckView extends View {
  #cardSpots = []
  constructor(parentEl) {
    super(parentEl)
  }

  #generateCardsMarkup(cards, playersCards) {
    playersCards.forEach((cardsOfType, i) => {
      const cardSpot = new CardSpotView(this._element, i)
      cardSpot.render()
      // cardSpot.addCards(cards[i], i, cardsOfType)
      this.#cardSpots.push(cardSpot)
    })
  }

  render(cards, playersCards) {
    super.render('div', '#players-deck')
    this.#generateCardsMarkup(cards, playersCards)
  }

  /**
   * Calls handler with clicked card as a argument.
   */
  onClickHandler(handler) {
    this._element.addEventListener('click', event => {
      const cardSpotEl = event.target.closest('.players-deck__cards-spot')
      if (!cardSpotEl) return

      const cardSpot = this.#cardSpots[cardSpotEl.dataset.id]
      if (cardSpot.isEmpty()) return

      handler(cardSpot.popCard())
    })
  }
}

//export default new PlayersDeck(document.getElementById('game'))
