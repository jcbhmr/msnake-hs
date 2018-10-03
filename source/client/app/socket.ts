import * as Shared from '../../shared/index'
import { Food, Snake } from '../classes/index'
import * as Scoreboard from './scoreboard'

/// <reference path='../types.d.ts' />

export const socket = io(location.pathname)

socket.on('tick', (transmission: Shared.Communication.Tick) => {

    for (const [id, snake] of Object.entries(transmission.snakes)) {
        const local = Snake.map.get(id)
        if (local === undefined) {
            Snake.map.set(id, new Snake(snake))
        } else {
            local.apply(snake)
        }
    }

    for (const id of Snake.map.keys()) {
        if (transmission.snakes[id] === undefined) {
            Snake.map.delete(id)
        }
    }

    for (const [id, food] of Object.entries(transmission.foods)) {
        const local = Food.map.get(id)
        if (local === undefined) {
            Food.map.set(id, new Food(food))
        } else {
            local.apply(food)
        }
    }

    for (const id of Food.map.keys()) {
        if (transmission.foods[id] === undefined) {
            Food.map.delete(id)
        }
    }

    Scoreboard.update(transmission.records)

})
