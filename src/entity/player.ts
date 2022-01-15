import { Screen } from './game'

export default class Player {
  readonly height: number = 40
  readonly width: number = 20
  readonly posX: number = 20
  public posY: number
  private jumping: boolean = false
  readonly jumpForce: number = 4
  private screen: Screen

  constructor(screen: Screen) {
    this.screen = screen
    this.posY = this.screen.height - this.height
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#0095DD'
    ctx.fillRect(this.posX, this.posY, this.width, this.height)
  }

  public jump(): void {
    if (this.jumping) {
      return
    }

    this.jumping = true
    this.up()
  }

  public reset(): void {
    this.posY = this.screen.height - this.height
    this.jumping = false
  }

  private up(): void {
    if (this.posY === this.screen.height - this.height * this.jumpForce) {
      setTimeout(() => this.down(), 100)
    } else {
      this.posY -= this.height / 10
      setTimeout(() => this.up(), 20)
    }
  }

  private down(): void {
    if (this.posY === this.screen.height - this.height) {
      this.jumping = false
    } else {
      this.posY += this.height / 10
      setTimeout(() => this.down(), 20)
    }
  }
}
