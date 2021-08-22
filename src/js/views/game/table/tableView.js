import { CardSpotView } from './cardSpotView'
import { ResultSpotView } from './resultSpotView'
import { View } from '../../view'

export class TableView extends View {
  #cardSpots = []
  #resultSpots = []

  constructor(parentEl) {
    super(parentEl)
  }

  #renderCardSpots(numOfCards, numOfResultCards) {
    for (let i = 0; i < numOfCards; i++) {
      this.#cardSpots.push(new CardSpotView(this._element, i))
      this.#cardSpots[i].render()
    }

    for (let i = 0; i < numOfResultCards; i++) {
      this.#resultSpots.push(new ResultSpotView(this._element, i))
      this.#resultSpots[i].render()
    }
  }

  render(numOfMoves, cardsPerMove) {
    // this.#numOfMoves = numOfMoves
    // this.#cardsPerMove = cardsPerMove
    this.setCSSVariables({
      cardsPerTray: cardsPerMove,
    })

    const numOfCards = numOfMoves * cardsPerMove
    super.render('div', '.game__table')
    this.#renderCardSpots(numOfCards, cardsPerMove)
    // this._element.addEventListener('click', () => {
    //   console.log('table clicked')
    // })
  }

  pushCard(card) {
    const freeCardSpot = this.#cardSpots.find(cardSpot => !cardSpot.card)
    freeCardSpot.pushCard(card)
  }

  popCard() {
    const lastOccupiedCardSpot = [...this.#cardSpots]
      .reverse()
      .find(cardSpot => cardSpot.card)
    return lastOccupiedCardSpot.popCard()
  }
}

//export default new TableView(document.getElementById('game'))
