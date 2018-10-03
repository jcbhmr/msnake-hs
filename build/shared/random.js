"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./communication/index");
const Configuration = require("./configuration");
function integer(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
exports.integer = integer;
function color() {
    return ({
        red: integer(0, 255),
        green: integer(0, 255),
        blue: integer(0, 255),
    });
}
exports.color = color;
function point() {
    return ({
        x: integer(0, Configuration.size),
        y: integer(0, Configuration.size),
    });
}
exports.point = point;
function direction() {
    return [
        index_1.Direction.UP,
        index_1.Direction.DOWN,
        index_1.Direction.LEFT,
        index_1.Direction.RIGHT,
    ][integer(0, 3)];
}
exports.direction = direction;
function id() {
    // TODO improve this
    return Date.now().toString() + Math.round(Math.random() * 1000).toString();
}
exports.id = id;
