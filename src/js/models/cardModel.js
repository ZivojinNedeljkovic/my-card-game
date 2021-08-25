import { getRandomIntInclusive } from './helpers'
import * as config from './config'
import { state } from './state'

function checkDealtCards(playersCards = new Map(), maxCardOfType) {
  const numOfSingletons = [...playersCards.values()].filter(
    cardsOfType => cardsOfType === 1
  ).length

  const lastCardAmount = [...playersCards.values()].pop()

  // if 1 is more then once in array, last element is negative or bigger then MAX_CARDS_OF_TYPE -> false

  return (
    numOfSingletons <= 1 &&
    lastCardAmount > 0 &&
    lastCardAmount <= maxCardOfType
  )
}

export function dealCards(rules = config, stateObj = state) {
  const numOfCards = rules.NUMBER_OF_CARDS
  let numOfCardsDealt = 0
  let playersCards = new Map()
  console.log(numOfCards)
  for (let i = 0; i < rules.CARDS.length - 1; i++) {
    const cardsOfType = getRandomIntInclusive(
      rules.MIN_CARDS_OF_TYPE,
      rules.MAX_CARDS_OF_TYPE
    )
    const card = rules.CARDS[i]
    playersCards.set(card, cardsOfType)
    numOfCardsDealt += cardsOfType
  }

  const lastCard = rules.CARDS[rules.CARDS.length - 1]
  const lastCardAmount = numOfCards - numOfCardsDealt
  playersCards.set(lastCard, lastCardAmount)

  if (!checkDealtCards(playersCards, rules.MAX_CARDS_OF_TYPE))
    return dealCards(rules)

  stateObj.playersCards = playersCards

  return playersCards
}
