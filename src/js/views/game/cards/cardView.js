import { View } from '../../view'

export class CardView extends View {
  constructor(parentEl, cardName) {
    super(parentEl)
    this.name = cardName
    this.translate = {
      x: 0,
      y: 0,
    }
  }

  render() {
    super.render('div', `.${this.name}`, `<p>${this.name}</p>`)
  }

  move(target, duration) {
    const cardCords = this.getCoords()
    const targetCords = target.getCoords()

    this.translate.x += targetCords.x - cardCords.x
    this.translate.y += targetCords.y - cardCords.y

    this._element.style.transition = `transform ${duration}ms`
    this._element.style.transform = `translate(${this.translate.x}px, ${this.translate.y}px)`

    this.target = target
  }

  updatePosition() {
    if (!this.target) return
    this.move(this.target, 0)
  }

  addRedToken() {
    super.render('div', '.token--red', '', this._element)
  }

  addYellowToken() {
    super.render('div', '.token--yellow', '', this._element)
  }
}
