import { Configuration, Communication } from '../../shared/index'
import { Snake, Food } from '../classes/index'
import { socket } from './socket'

const holder = $('#canvas-holder')

function sizeCanvas() {

    if (holder !== null) {
        const width = holder.innerWidth()
        const height = holder.innerHeight()
        const size = min(width, height) as number

        return size
    } else {
        return 100
    }

}

export function setup() {

    const size = sizeCanvas()
    const canvas = createCanvas(size, size)
    canvas.parent('#canvas-holder')

    background(Configuration.background)

}

export function windowResized() {

    const size = sizeCanvas()
    resizeCanvas(size, size)

    background(Configuration.background)

}

export function draw() {
    background(Configuration.background)

    for (const food of Food.map.values()) {
        food.show()
    }

    for (const snake of Snake.map.values()) {
        snake.show()
    }

}

export function keyPressed() {

    const map: { [key: string]: Communication.Direction } = {
        w: Communication.Direction.UP,
        a: Communication.Direction.LEFT,
        d: Communication.Direction.RIGHT,
        s: Communication.Direction.DOWN,
        ArrowUp: Communication.Direction.UP,
        ArrowDown: Communication.Direction.DOWN,
        ArrowLeft: Communication.Direction.LEFT,
        ArrowRight: Communication.Direction.RIGHT,
    }
    const direction = map[key]
    const self = Snake.map.get(socket.id)

    if (self !== undefined) {
        self.look(direction)
    }

}
