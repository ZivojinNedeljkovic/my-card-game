import { View } from '../../view'
import { CardSpotView } from './cardSpotView'

export class CardStackView extends View {
  constructor(parentEl, typeOfCards) {
    super(parentEl)
    this.cardSpots = []
    this.typeOfCards = typeOfCards
  }

  render(numOfCards) {
    super.render('div', '.game__players-deck__card-stack')
    this._element.dataset.typeOfCard = this.typeOfCards
    for (let i = 0; i < numOfCards; i++) {
      const cardSpot = new CardSpotView(this._element)
      cardSpot.render(i)
      this.cardSpots.push(cardSpot)
    }
  }

  pushCard(card, animationDuration) {
    const cardSpot = this.cardSpots.find(cardSpot => !cardSpot.card)
    console.log(cardSpot, card)
    card.move(cardSpot, animationDuration)
    cardSpot.card = card
  }

  popCard() {
    const cardSpot = [...this.cardSpots]
      .reverse()
      .find(cardSpot => cardSpot.card)
    if (!cardSpot) return
    const card = cardSpot.card
    cardSpot.card = undefined
    return card
  }
}
