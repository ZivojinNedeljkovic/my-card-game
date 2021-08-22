import { View } from '../../view'

export class ResultSpotView extends View {
  constructor(parentEl, id) {
    super(parentEl)
    this.id = id
  }

  render() {
    return super.render('div', `.game__table__result-card-spot`)
  }
}
