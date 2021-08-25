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
    let cardCords = this.accomplishedTarget
      ? this.accomplishedTarget.getCoords()
      : this.getCoords()
    const targetCords = target.getCoords()

    // console.log(
    //   `  card cords: ${cardCords.x} ${cardCords.y} \ntarget cords: ${targetCords.x} ${targetCords.y}`
    // )
    this.translate.x += targetCords.x - cardCords.x
    this.translate.y += targetCords.y - cardCords.y

    this._element.style.transition = `transform ${duration}ms`
    this._element.style.transform = `translate(${this.translate.x}px, ${this.translate.y}px)`

    this.accomplishedTarget = target
  }

  updatePosition() {
    if (!this.accomplishedTarget) return
    const movedTarget = this.accomplishedTarget
    this.accomplishedTarget = undefined
    this.move(movedTarget, 0)
  }

  addRedToken() {
    super.render('div', '.token--red', '', this._element)
  }

  addYellowToken() {
    super.render('div', '.token--yellow', '', this._element)
  }
}
