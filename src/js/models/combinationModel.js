import { getRandomIntInclusive } from './helpers'
import { state } from './state'
import { WINING_COMBINATION_LENGTH, CARDS } from './config'

/*
function checkWinComb(winComb, playersCards = state.playersCards) {
  for (const [cardType, cardAmountInPlayersDeck] of playersCards) {
    // card is a singleton and it is more then once in win comb, return false
    // card is not a singleton and there are more of them in win comb, return false
    const cardAmountInWinComb = winComb.filter(card => card === cardType).length

    if (
      (cardAmountInPlayersDeck === 1 && cardAmountInWinComb > 1) ||
      (cardAmountInPlayersDeck !== 1 &&
        cardAmountInWinComb > cardAmountInPlayersDeck)
    )
      return false
  }

  return true
}
*/

function checkWinComb(winComb, playersCards = state.playersCards) {
  // card amounts in win comb and player deck can be equal only once, other wise there must always be more cards of type in players deck
  let numOfCardsWithEqualAmounts = 0
  for (const [cardType, cardAmountInPlayersDeck] of playersCards) {
    const cardAmountInWinComb = winComb.filter(card => card === cardType).length

    if (
      cardAmountInPlayersDeck === cardAmountInWinComb &&
      ++numOfCardsWithEqualAmounts > 1
    ) {
      return false
    } else if (cardAmountInPlayersDeck < cardAmountInWinComb) return false
  }

  return true
}

export function generateWiningCombination(
  stateObj = state,
  winCombLen = WINING_COMBINATION_LENGTH,
  cards = CARDS
) {
  const winComb = []

  for (let i = 0; i < winCombLen; i++) {
    const card = cards[getRandomIntInclusive(0, cards.length - 1)]
    winComb.push(card)
  }

  if (!checkWinComb(winComb))
    return generateWiningCombination(stateObj, winCombLen)

  stateObj.winningCombination = winComb
  return winComb
}

export function examineCombination(comb, winComb = state.winningCombination) {
  const combCopy = [...comb]
  const winCombCopy = [...winComb]

  let rightCardsInRightPlaces = 0

  for (let i = 0; i < combCopy.length; i++) {
    if (combCopy[i] === winCombCopy[i]) {
      rightCardsInRightPlaces++
      combCopy[i] = '-'
      winCombCopy[i] = 'x'
    }
  }

  let rightCards = 0

  for (let i = 0; i < combCopy.length; i++) {
    for (let j = 0; j < combCopy.length; j++) {
      if (combCopy[i] === winCombCopy[j]) {
        rightCards++
        combCopy[i] = '-'
        winCombCopy[j] = 'x'
      }
    }
  }

  return {
    rightCardsInRightPlaces: rightCardsInRightPlaces,
    rightCards: rightCards,
  }
}
