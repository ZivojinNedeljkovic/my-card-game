export class View {
  #parentEl
  constructor(parentEl, element) {
    this.#parentEl = parentEl
    this._element = element
  }

  /**
   * cssVariables = { mainColor: 'yellow' }, in CSS --main-color: yellow
   */
  setCSSVariables(cssVariables = {}) {
    const camelCaseToDashCase = camelCace =>
      camelCace.replace(/[A-Z]/g, m => '-' + m.toLowerCase())

    const root = document.querySelector(':root')

    Object.keys(cssVariables).forEach(propName =>
      root.style.setProperty(
        `--${camelCaseToDashCase(propName)}`,
        cssVariables[propName]
      )
    )
  }

  render(tag, identifiers, innerHTML = '', parentEl = this.#parentEl) {
    const element = document.createElement(tag)
    identifiers.split(' ').forEach(identifier => {
      switch (identifier[0]) {
        case '#':
          element.id = identifier.slice(1)
          break
        case '.':
          element.classList.add(identifier.slice(1))
          break
      }
    })

    element.innerHTML = innerHTML
    parentEl.appendChild(element)
    this._element ??= element
    return element
  }

  popClass() {
    if (!this._element) return
    const classList = this._element.classList
    const lastClass = classList.item(classList.length - 1)
    classList.remove(lastClass)
    return lastClass
  }

  pushClass(className) {
    this._element.classList.add(className)
  }

  getCoords() {
    return this._element.getBoundingClientRect()
  }
}
