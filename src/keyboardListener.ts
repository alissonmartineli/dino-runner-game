export type KeyBoardEvent = {
  keyPressed: string
}

export type Observer = (event: KeyBoardEvent) => void

export default class KeyBoardListener {
  private observers: Observer[] = []

  constructor() {
    this.observers = []
  }

  subscribe(observerFunction: Observer) {
    this.observers.push(observerFunction)
  }

  notifyAll(event: KeyBoardEvent) {
    this.observers.forEach((observerFunction) => observerFunction(event))
  }

  handleKeyPress(e: KeyboardEvent) {
    const keyPressed = e.key
    const event = {
      keyPressed,
    }

    this.notifyAll(event)
  }
}
