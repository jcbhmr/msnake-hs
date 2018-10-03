import { Communication, Configuration, Random } from '../../shared/index'
import { Snake, Food } from '../classes/index'
import { within } from './etc'

export function place() {
    const places: Communication.Point[][] = Array(Configuration.size).fill(null).map(() => Array(Configuration.size).fill(null))

    for (let x = 0; x < places.length; ++x) {
        for (let y = 0; y < places.length; ++y) {
            places[x][y] = { x, y }
        }
    }

    for (const _food of Food.map.values()) {
        const pos = _food.position()
        if (within(pos.x, -1, Configuration.size) && within(pos.y, -1, Configuration.size)) {
            places[pos.x][pos.y] = { x: -1, y: -1 }
        }
    }

    for (const _snake of Snake.map.values()) {
        for (const link of _snake.links) {
            if (within(link.x, -1, Configuration.size) && within(link.y, -1, Configuration.size)) {
                places[link.x][link.y] = { x: -1, y: -1 }
            }
        }
    }

    const valid = places.map(column => column.filter(({ x, y }) => x !== -1 && y !== -1))

    if (valid.length === 0) {
        // no valid places
        // do nothing
        return { x: -1, y: -1 }
    }

    const column = valid[Random.integer(0, valid.length - 1)]
    const position = column[Random.integer(0, column.length - 1)]

    return position
}
