import Game from './game.js'

export default class Cactus {
  private _id: string
  private _posX: number
  private _posY: number
  private _width: number
  private _height: number
  private game: Game

  constructor(game: Game) {
    this.game = game
    this._id = new Date().getTime().toString()
    this._width = 10
    this._height = 20
    this._posX = this.game.screen.width - this._width
    this._posY = this.game.screen.height - this._height

    this.move()
  }

  get id(): string {
    return this._id
  }

  get posX(): number {
    return this._posX
  }

  get posY(): number {
    return this._posY
  }

  get width(): number {
    return this._width
  }

  get height(): number {
    return this._height
  }

  public draw(): void {
    this.game.ctx.fillStyle = '#0095DD'
    this.game.ctx.fillRect(this.posX, this.posY, this._width, this._height)
  }

  private move() {
    this._posX -= this._width / 2

    if (this._posX >= -this._width) {
      setTimeout(() => {
        this.move()
      }, 100)

      return
    }

    this.destroy()
  }

  private destroy() {
    this.game.removeCactus(this)
  }
}
