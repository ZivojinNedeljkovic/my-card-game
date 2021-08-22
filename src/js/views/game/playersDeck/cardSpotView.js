import { View } from '../../view'

export class CardSpotView extends View {
  constructor(parentEl) {
    super(parentEl)
    this.card = undefined
  }
  render(number) {
    super.render('div', `.game__players-deck__card-stack__card-spot-${number}`)
  }
}
