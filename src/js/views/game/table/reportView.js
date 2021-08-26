import { View } from '../../view'

export class ReportView extends View {
  constructor(parentEl) {
    super(parentEl)
    this.filled = false
  }

  render() {
    super.render('div', '.game__table__report')
  }

  renderReport(rightCardsInRightPlace, rightCards) {

    for (let i = 0; i < rightCardsInRightPlace; i++) {
      super.render('div', '.game__table__report__red-token', '', this._element)
    }
    for (let i = 0; i < rightCards; i++) {
      super.render(
        'div',
        '.game__table__report__yellow-token',
        '',
        this._element
      )
    }
    this.filled = true
  }
}
