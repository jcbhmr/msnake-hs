"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../shared/index");
const socket_1 = require("../app/socket");
/// <reference path='../types.d.ts' />
class Snake {
    constructor(snake) {
        this._color = {
            red: 0,
            green: 0,
            blue: 0,
        };
        this.links = [];
        // @ts-ignore
        this.growing = 0;
        this.direction = {
            current: index_1.Random.direction(),
            next: index_1.Random.direction(),
        };
        this.statistics = index_1.Communication.Statistics.initial();
        this.apply(snake);
    }
    apply(snake) {
        this._color = snake.color;
        this.links = snake.links;
        this.growing = snake.growing;
        this.direction.current = snake.direction;
        this.statistics = snake.statistics;
    }
    look(direction) {
        if (direction !== undefined) {
            const forbidden = [
                [index_1.Communication.Direction.UP, index_1.Communication.Direction.DOWN],
                [index_1.Communication.Direction.LEFT, index_1.Communication.Direction.RIGHT],
            ];
            for (const pair of forbidden) {
                if (pair.includes(direction) && !pair.includes(this.direction.current)) {
                    this.direction.next = direction;
                    socket_1.socket.emit('direction', direction);
                    break;
                }
            }
        }
    }
    scores() {
        return this.statistics;
    }
    color() {
        return this._color;
    }
    show() {
        if (this.links.length > 0) {
            const scale = width / index_1.Configuration.size;
            ellipseMode(CORNER);
            noStroke();
            fill(this._color.red, this._color.green, this._color.blue);
            ellipse(this.links[0].x * scale - scale * 0.25, this.links[0].y * scale - scale * 0.25, scale * 1.5);
            for (let i = 0; i < this.links.length - 1; ++i) {
                strokeWeight(scale);
                stroke(this._color.red, this._color.green, this._color.blue);
                line(this.links[i].x * scale + scale / 2, this.links[i].y * scale + scale / 2, this.links[i + 1].x * scale + scale / 2, this.links[i + 1].y * scale + scale / 2);
            }
        }
    }
}
Snake.map = new index_1.Map();
exports.Snake = Snake;
