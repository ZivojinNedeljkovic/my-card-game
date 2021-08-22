import { View } from '../../view'
import { CardStackView } from './cardStackView'

export class PlayersDeckView extends View {
  constructor(parentEl) {
    super(parentEl)
    this.cardStacks = new Map()
  }

  render(playersCards) {
    super.render('div', '.game__players-deck')
    playersCards.forEach((amount, card) => {
      const cardsStack = new CardStackView(this._element, card)
      cardsStack.render(amount)
      this.cardStacks.set(card, cardsStack)
    })
  }

  pushCard(card, animationDuration = 500) {
    const cardStack = this.cardStacks.get(card.name)
    cardStack.pushCard(card, animationDuration)
  }

  /** Calls handler with card stack as an argument */
  onClickHandler(handler) {
    this._element.addEventListener('click', event => {
      const cardStackEl = event.target.closest(
        '.game__players-deck__card-stack'
      )
      if (!cardStackEl) return
      const cardStack = this.cardStacks.get(cardStackEl.dataset.typeOfCard)

      handler(cardStack)
    })
  }
}
