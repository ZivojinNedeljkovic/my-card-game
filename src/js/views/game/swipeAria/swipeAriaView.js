import { Swipe } from './swipe'

export class SwipeAriaView {
  #swipeHandlers = {}

  constructor(
    parentEl,
    swipeMinDistance,
    swipeMaxDuration,
    allowedOffsetPercentage
  ) {
    this.parentEl = parentEl
    this.swipeMinDistance = swipeMinDistance
    this.swipeMaxDuration = swipeMaxDuration
    this.allowedOffsetPercentage = allowedOffsetPercentage
  }

  render() {
    //  super.render('div', '.game__swipe-aria swipe-aria')
    this.parentEl.addEventListener(
      'touchstart',
      this.#touchStartHandler.bind(this)
    )
  }

  addHandler(swipeDirection, handler) {
    this.#swipeHandlers[swipeDirection] = handler
  }

  #touchStartHandler(event) {
    if (event.touches.length > 1) return

    this.touchStartEvent = event

    this.parentEl.addEventListener(
      'touchend',
      this.#touchEndHandler.bind(this),
      { once: true }
    )
  }

  #touchEndHandler(event) {
    const swipe = new Swipe(this.touchStartEvent, event)
    if (
      swipe.distance < this.swipeMinDistance ||
      swipe.duration > this.swipeMaxDuration ||
      swipe.offsetPercentage > this.allowedOffsetPercentage
    )
      return

    const handler = this.#swipeHandlers?.[swipe.direction]
    handler?.()
  }
}
