import { Map, Communication, Random, Configuration } from '../../shared/index'
import { socket } from '../app/socket'

/// <reference path='../types.d.ts' />

export class Snake {

    public static map = new Map<Snake>()

    private _color: Communication.Color = {
        red: 0,
        green: 0,
        blue: 0,
    }
    private links: Communication.Point[] = []
    // @ts-ignore
    private growing = 0
    private direction = {
        current: Random.direction(),
        next: Random.direction(),
    }
    private statistics = Communication.Statistics.initial()

    public constructor(snake: Communication.Classes.Snake) {

        this.apply(snake)

    }

    public apply(snake: Communication.Classes.Snake) {

        this._color = snake.color
        this.links = snake.links
        this.growing = snake.growing
        this.direction.current = snake.direction
        this.statistics = snake.statistics

    }

    public look(direction?: Communication.Direction) {

        if (direction !== undefined) {
            const forbidden = [
                [Communication.Direction.UP, Communication.Direction.DOWN],
                [Communication.Direction.LEFT, Communication.Direction.RIGHT],
            ]

            for (const pair of forbidden) {
                if (pair.includes(direction) && !pair.includes(this.direction.current)) {
                    this.direction.next = direction
                    socket.emit('direction', direction)
                    break
                }
            }
        }

    }

    public scores() {

        return this.statistics

    }

    public color() {

        return this._color

    }

    public show() {

        if (this.links.length > 0) {
            const scale = width / Configuration.size

            ellipseMode(CORNER)
            noStroke()
            fill(this._color.red, this._color.green, this._color.blue)
            ellipse(this.links[0].x * scale - scale * 0.25, this.links[0].y * scale - scale * 0.25, scale * 1.5)

            for (let i = 0; i < this.links.length - 1; ++i) {
                strokeWeight(scale)
                stroke(this._color.red, this._color.green, this._color.blue)
                line(this.links[i].x * scale + scale / 2, this.links[i].y * scale + scale / 2, this.links[i + 1].x * scale + scale / 2, this.links[i + 1].y * scale + scale / 2)
            }
        }

    }

}
