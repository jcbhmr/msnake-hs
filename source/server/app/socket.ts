import * as socketio from 'socket.io'
import { Configuration, Communication } from '../../shared/index'
import { Snake, Food } from '../classes/index'
import { tick } from './tick'
import { Records } from '../helpers/index'

export function socket(io: socketio.Namespace) {

    Food.create()

    // alias for setInterval with logical argument arrangement
    const every = (time: number, func: { (): void }) => setInterval(func, time)

    every(Configuration.interval, () => {

        if (Snake.map.keys().length > 0) {
            const transmission = tick()
            io.emit('tick', transmission)
        }

    })

    // TODO on close
    every(Configuration.interval * 100, () => Records.write())

    io.on('connect', (socket) => {

        const self = Snake.create(socket.id)

        socket.on('direction', (direction: Communication.Direction) => self.look(direction))

        socket.on('disconnect', () => Snake.delete(socket.id))

    })
}
