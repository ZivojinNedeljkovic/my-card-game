/**
 * CARDS variable defines cards that will be used in the game, and order in which card deck are displayed
 */
export const CARDS = ['ocean', 'orange', 'vanilla', 'love', 'tulip', 'leaf']
export const WINING_COMBINATION_LENGTH = 4
export const NUMBER_OF_TRAYS = 6
export const NUMBER_OF_CARDS_PER_TRAY = WINING_COMBINATION_LENGTH
export const NUMBER_OF_CARDS = NUMBER_OF_TRAYS * NUMBER_OF_CARDS_PER_TRAY + 4
export const MIN_CARDS_OF_TYPE = 1
export const MAX_CARDS_OF_TYPE = 8 // if changed update _variables.scss
