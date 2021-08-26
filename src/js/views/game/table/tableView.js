import { CardSpotView } from './cardSpotView'
import { ResultSpotView } from './resultSpotView'
import { View } from '../../view'
import { ReportView } from './reportView'

export class TableView extends View {
  #cardSpots = []
  #reportSpots = []
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
    this.setCSSVariables({
      cardsPerTray: cardsPerMove,
    })

    const numOfCards = numOfMoves * cardsPerMove
    super.render('div', '.game__table')

    for (let i = 0; i < numOfCards; i++) {
      this.#cardSpots.push(new CardSpotView(this._element, i))
      this.#cardSpots[i].render()
      if ((i + 1) % cardsPerMove === 0) {
        const reportSpot = new ReportView(this._element)
        this.#reportSpots.push(reportSpot)
        reportSpot.render()
      }
    }

    for (let i = 0; i < cardsPerMove; i++) {
      this.#resultSpots.push(new ResultSpotView(this._element, i))
      this.#resultSpots[i].render()
    }
  }

  pushCard(card) {
    const freeCardSpot = this.#cardSpots.find(cardSpot => !cardSpot.card)
    freeCardSpot.pushCard(card)
  }

  renderReport(rightCardsInRightPlace, rightCards) {
    const reportSpot = this.#reportSpots.find(
      reportSpot => reportSpot.filled === false
    )
    console.log(reportSpot)

    reportSpot.renderReport(rightCardsInRightPlace, rightCards)
  }

  popCard() {
    const lastOccupiedCardSpot = [...this.#cardSpots]
      .reverse()
      .find(cardSpot => cardSpot.card)
    return lastOccupiedCardSpot.popCard()
  }
}

//export default new TableView(document.getElementById('game'))
