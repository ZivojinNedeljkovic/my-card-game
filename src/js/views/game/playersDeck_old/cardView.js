import 'regenerator-runtime/runtime'
import { View } from '../../view'

export class CardView extends View {
  constructor(parentEl, name, typeID) {
    super(parentEl)
    this.name = name
    this.typeID = typeID
  }

  render() {
    super.render('div', `.${this.name}`, `<p>${this.name}</p>`)
  }

  move(targetEl, animationDuration) {
    const cardCords = this._element.getBoundingClientRect()
    const targetElCords = targetEl.getBoundingClientRect()

    const moveOnX = targetElCords.x - cardCords.x
    const moveOnY = targetElCords.y - cardCords.y

    this._element.style.transition = `transform ${animationDuration}ms`
    this._element.style.transform = `translate(${moveOnX}px, ${moveOnY}px)`
    
    // setTimeout(
    //   function () {
    //     newParentEl.appendChild(this._element)
    //     this._element.removeAttribute('style')
    //     this.popClass()
    //     newParentEl.style.border = 'none' // Find better solution
    //   }.bind(this),
    //   animationDuration
    // )
  }

  // returnToDeck() {
  //   this.playersDeckCardSlotEl.appendChild(this.element)
  // }

  // addRedToken() {
  //   super.render('div', '.token--red', '', this.element)
  // }

  // addYellowToken() {
  //   super.render('div', '.token--yellow', '', this.element)
  // }
}
