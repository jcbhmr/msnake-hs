"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../shared/index");
const index_2 = require("../classes/index");
const etc_1 = require("./etc");
function place() {
    const places = Array(index_1.Configuration.size).fill(null).map(() => Array(index_1.Configuration.size).fill(null));
    for (let x = 0; x < places.length; ++x) {
        for (let y = 0; y < places.length; ++y) {
            places[x][y] = { x, y };
        }
    }
    for (const _food of index_2.Food.map.values()) {
        const pos = _food.position();
        if (etc_1.within(pos.x, -1, index_1.Configuration.size) && etc_1.within(pos.y, -1, index_1.Configuration.size)) {
            places[pos.x][pos.y] = { x: -1, y: -1 };
        }
    }
    for (const _snake of index_2.Snake.map.values()) {
        for (const link of _snake.links) {
            if (etc_1.within(link.x, -1, index_1.Configuration.size) && etc_1.within(link.y, -1, index_1.Configuration.size)) {
                places[link.x][link.y] = { x: -1, y: -1 };
            }
        }
    }
    const valid = places.map(column => column.filter(({ x, y }) => x !== -1 && y !== -1));
    if (valid.length === 0) {
        // no valid places
        // do nothing
        return { x: -1, y: -1 };
    }
    const column = valid[index_1.Random.integer(0, valid.length - 1)];
    const position = column[index_1.Random.integer(0, column.length - 1)];
    return position;
}
exports.place = place;
