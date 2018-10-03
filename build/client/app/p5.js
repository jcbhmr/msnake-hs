"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../shared/index");
const index_2 = require("../classes/index");
const socket_1 = require("./socket");
const holder = $('#canvas-holder');
function sizeCanvas() {
    if (holder !== null) {
        const width = holder.innerWidth();
        const height = holder.innerHeight();
        const size = min(width, height);
        return size;
    }
    else {
        return 100;
    }
}
function setup() {
    const size = sizeCanvas();
    const canvas = createCanvas(size, size);
    canvas.parent('#canvas-holder');
    background(index_1.Configuration.background);
}
exports.setup = setup;
function windowResized() {
    const size = sizeCanvas();
    resizeCanvas(size, size);
    background(index_1.Configuration.background);
}
exports.windowResized = windowResized;
function draw() {
    background(index_1.Configuration.background);
    for (const food of index_2.Food.map.values()) {
        food.show();
    }
    for (const snake of index_2.Snake.map.values()) {
        snake.show();
    }
}
exports.draw = draw;
function keyPressed() {
    const map = {
        w: index_1.Communication.Direction.UP,
        a: index_1.Communication.Direction.LEFT,
        d: index_1.Communication.Direction.RIGHT,
        s: index_1.Communication.Direction.DOWN,
        ArrowUp: index_1.Communication.Direction.UP,
        ArrowDown: index_1.Communication.Direction.DOWN,
        ArrowLeft: index_1.Communication.Direction.LEFT,
        ArrowRight: index_1.Communication.Direction.RIGHT,
    };
    const direction = map[key];
    const self = index_2.Snake.map.get(socket_1.socket.id);
    if (self !== undefined) {
        self.look(direction);
    }
}
exports.keyPressed = keyPressed;
