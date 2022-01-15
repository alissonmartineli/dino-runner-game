import Game, { Screen } from './entity/game.js'
import Player from './entity/player.js'
import KeyBoardListener from './keyboardListener.js'

const canvas = document.getElementById('game') as HTMLCanvasElement
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

const screen: Screen = {
  width: 700,
  height: 300,
}

const game = new Game(canvas, ctx, screen, new Player(screen))

const keyBoardListener = new KeyBoardListener()
document.addEventListener('keydown', (e) => keyBoardListener.handleKeyPress(e))
keyBoardListener.subscribe((e) => game.pressSpace(e))
