"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../classes/index");
const Scoreboard = require("./scoreboard");
/// <reference path='../types.d.ts' />
exports.socket = io(location.pathname);
exports.socket.on('tick', (transmission) => {
    for (const [id, snake] of Object.entries(transmission.snakes)) {
        const local = index_1.Snake.map.get(id);
        if (local === undefined) {
            index_1.Snake.map.set(id, new index_1.Snake(snake));
        }
        else {
            local.apply(snake);
        }
    }
    for (const id of index_1.Snake.map.keys()) {
        if (transmission.snakes[id] === undefined) {
            index_1.Snake.map.delete(id);
        }
    }
    for (const [id, food] of Object.entries(transmission.foods)) {
        const local = index_1.Food.map.get(id);
        if (local === undefined) {
            index_1.Food.map.set(id, new index_1.Food(food));
        }
        else {
            local.apply(food);
        }
    }
    for (const id of index_1.Food.map.keys()) {
        if (transmission.foods[id] === undefined) {
            index_1.Food.map.delete(id);
        }
    }
    Scoreboard.update(transmission.records);
});
