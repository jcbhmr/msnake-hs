"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function within(input, min, max) {
    return input < max && input > min;
}
exports.within = within;
function compare(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y;
}
exports.compare = compare;
