"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../shared/index");
const index_2 = require("../classes/index");
const tick_1 = require("./tick");
const index_3 = require("../helpers/index");
function socket(io) {
    index_2.Food.create();
    // alias for setInterval with logical argument arrangement
    const every = (time, func) => setInterval(func, time);
    every(index_1.Configuration.interval, () => {
        if (index_2.Snake.map.keys().length > 0) {
            const transmission = tick_1.tick();
            io.emit('tick', transmission);
        }
    });
    // TODO on close
    every(index_1.Configuration.interval * 100, () => index_3.Records.write());
    io.on('connect', (socket) => {
        const self = index_2.Snake.create(socket.id);
        socket.on('direction', (direction) => self.look(direction));
        socket.on('disconnect', () => index_2.Snake.delete(socket.id));
    });
}
exports.socket = socket;
