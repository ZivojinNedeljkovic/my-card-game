export class Swipe {
  #xAxisChange
  #yAxisChange
  constructor(touchStartEvent, touchEndEvent) {
    const {
      touches: [{ clientX: startX, clientY: startY }],
      timeStamp: touchStartTime,
    } = touchStartEvent

    const {
      changedTouches: [{ clientX: endX, clientY: endY }],
      timeStamp: touchEndTime,
    } = touchEndEvent

    this.duration = touchEndTime - touchStartTime
    this.#xAxisChange = endX - startX
    this.#yAxisChange = endY - startY
    this.#SwipeDirectionDistanceAndOffset()
    this.#offsetPercentage()
  }

  #SwipeDirectionDistanceAndOffset() {
    const distanceOnX = Math.abs(this.#xAxisChange)
    const distanceOnY = Math.abs(this.#yAxisChange)

    if (distanceOnX > distanceOnY) {
      // swipe left or right
      this.direction = this.#xAxisChange > 0 ? 'right' : 'left'
      this.distance = distanceOnX
      this.offset = distanceOnY
    } else if (distanceOnX < distanceOnY) {
      // swipe up or down
      this.direction = this.#yAxisChange > 0 ? 'down' : 'up'
      this.distance = distanceOnY
      this.offset = distanceOnX
    } else {
      // not a swipe
      this.direction = undefined
      this.distance = 0
      this.offset = NaN
    }
  }

  #offsetPercentage() {
    this.offsetPercentage = (this.offset * 100) / this.distance
  }
}
