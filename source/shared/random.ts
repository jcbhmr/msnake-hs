import { Direction } from './communication/index'
import * as Configuration from './configuration'

export function integer(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min)
}

export function color() {
    return ({
        red: integer(0, 255),
        green: integer(0, 255),
        blue: integer(0, 255),
    })
}

export function point() {
    return ({
        x: integer(0, Configuration.size),
        y: integer(0, Configuration.size),
    })
}

export function direction() {
    return [
        Direction.UP,
        Direction.DOWN,
        Direction.LEFT,
        Direction.RIGHT,
    ][integer(0, 3)]
}

export function id() {

    // TODO improve this
    return Date.now().toString() + Math.round(Math.random() * 1000).toString()

}
