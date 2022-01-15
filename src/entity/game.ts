/* eslint-disable no-unused-vars */
import { KeyBoardEvent } from '../keyboardListener.js'
import Cactus from './cactus.js'
import Player from './player.js'

export type Screen = {
  width: number
  height: number
}

enum GameState {
  RUNNING = 'running',
  PAUSED = 'paused',
  OVER = 'over',
}

export default class Game {
  private canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private player: Player | undefined = undefined
  private gameSpeed = 0.5
  private score = 0
  private highScore = 0
  private cactus: Cactus[] = []
  private _screen: Screen
  private cactusInterval: number | undefined = undefined
  private collisionInterval: number | undefined = undefined
  private scoreInterval: number | undefined = undefined
  private status: GameState = GameState.PAUSED

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    screen: Screen,
    player: Player
  ) {
    this.canvas = canvas
    this._ctx = ctx
    this._screen = screen
    this.player = player

    this.ctx.font = '18px Arial'
    this.ctx.fillStyle = '#0095DD'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      'PRESS SPACE TO START',
      this.screen.width / 2,
      this.screen.height / 2 + 20
    )

    this.drawScore()
  }

  get ctx() {
    return this._ctx
  }

  get screen() {
    return this._screen
  }

  public pressSpace(event: KeyBoardEvent): void {
    const keyPressed = event.keyPressed

    if (keyPressed !== ' ') {
      return
    }

    if (this.status === GameState.RUNNING) {
      this.player?.jump()
      return
    }

    this.start()
  }

  private start() {
    this.status = GameState.RUNNING

    if (this.score > this.highScore) {
      this.highScore = this.score
    }

    this.score = 0
    this.gameSpeed = 0.5
    this.cactus = []

    this.cactusInterval = setInterval(() => {
      this.addCactus()
    }, 3000)

    this.collisionInterval = setInterval(() => {
      this.checkCollision()
    }, 10)

    this.scoreInterval = setInterval(() => {
      this.score += 1
    }, 1000)

    requestAnimationFrame(() => this.update())
  }

  private drawScore() {
    this.ctx.font = '18px Arial'
    this.ctx.fillStyle = '#0095DD'
    this.ctx.textAlign = 'start'
    this.ctx.fillText(`Score: ${this.score}`, 10, 30)
    this.ctx.font = '12px Arial'
    this.ctx.fillText(`HighScore: ${this.highScore}`, 10, 50)
  }

  private update() {
    this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.player?.draw(this._ctx)

    this.cactus.forEach((cactus) => {
      cactus.draw()
    })

    this.drawScore()

    if (this.status === GameState.OVER) {
      this.ctx.font = '18px Arial'
      this.ctx.fillStyle = '#0095DD'
      this.ctx.textAlign = 'center'
      this.ctx.fillText(
        'GAME OVER',
        this.screen.width / 2,
        this.screen.height / 2
      )
      this.ctx.font = '12px Arial'
      this.ctx.fillText(
        'PRESS SPACE TO PLAY AGAIN',
        this.screen.width / 2,
        this.screen.height / 2 + 20
      )
    }

    if (this.status === GameState.RUNNING) {
      requestAnimationFrame(() => this.update())
    }
  }

  private addCactus() {
    const cactus = new Cactus(this)
    this.cactus.push(cactus)
  }

  public removeCactus(cactus: Cactus) {
    this.cactus = this.cactus.filter((c) => c.id !== cactus.id)
  }

  private checkCollision() {
    if (!this.player) {
      return
    }

    const x: number = this.player.posX
    const y: number = this.player.posY
    const width: number = this.player.width
    const height: number = this.player.height

    for (const cactus of this.cactus) {
      if (
        x < cactus.posX + cactus.width &&
        x + width > cactus.posX &&
        y < cactus.posY + cactus.height &&
        y + height > cactus.posY
      ) {
        this.gameOver()
        break
      }
    }
  }

  public gameOver() {
    this.status = GameState.OVER
    this.player?.reset()

    clearInterval(this.cactusInterval)
    clearInterval(this.collisionInterval)
    clearInterval(this.scoreInterval)
  }
}
