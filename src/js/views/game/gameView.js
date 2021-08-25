import { TableView } from './table/tableView'
import { View } from '../view'
//import { PlayersDeckView } from './playersDeck/playersDeckView'
import { SwipeAriaView } from './swipeAria/swipeAriaView'
import { CardContainerView } from './cards/cardsContainerView'
import { PlayersDeckView } from './playersDeck/playersDeckView'
import { returnCardController } from '../../controllers/inputController'
class GameView extends View {
  #currentMove = []

  constructor(parentEl) {
    super(parentEl)
  }

  get currentMove() {
    if (this.#currentMove.length < 4) return undefined
    return this.#currentMove.map(card => card.name)
  }

  startNewMove() {
    this.#currentMove = []
  }

  render(playersCards, numOfMoves, cardsPerMove, cards, maxCardsOfType) {
    super.render('main', '#game')
    this.cardsPerMove = cardsPerMove

    this.table = new TableView(this._element)
    this.playersDeck = new PlayersDeckView(this._element)
    this.cardContainer = new CardContainerView(this._element)
    this.swipeAria = new SwipeAriaView(this._element, 50, 500, 49)

    this.cardContainer.render(playersCards)
    this.table.render(numOfMoves, cardsPerMove)
    this.playersDeck.render(playersCards, maxCardsOfType)
    this.swipeAria.render()

    this.#dealCards(true)
    this.playersDeck.onClickHandler(this.#putCardOnTable.bind(this))
  }

  #dealCards(animation = true) {
    this.cardContainer.cards.forEach((card, i) => {
      if (animation)
        setTimeout(() => this.playersDeck.pushCard(card, 300), i * 150)
      else this.playersDeck.pushCard(card, 0)
    })
  }

  #putCardOnTable(cardStack) {
    if (this.#currentMove.length >= this.cardsPerMove) return
    const card = cardStack.popCard()
    if (!card) return
    this.#currentMove.push(card)
    this.table.pushCard(card)
  }

  renderMoveResult(rightCardsInRightPlaces, rightCards) {
    this.#currentMove.forEach(card => {
      if (rightCardsInRightPlaces > 0) {
        card.addRedToken()
        rightCardsInRightPlaces--
      } else if (rightCards > 0) {
        card.addYellowToken()
        rightCards--
      }
    })
  }

  returnCardToDeck() {
    if (this.#currentMove.length === 0) return
    const card = this.#currentMove.pop()
    this.table.popCard()
    this.playersDeck.pushCard(card, 500)
  }
}
export default new GameView(document.body)
