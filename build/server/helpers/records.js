"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const filename = __dirname + '/../../../source/server/records.json';
exports.records = require(filename);
function update() {
    const deaths = exports.records.total.deaths;
    const kills = exports.records.total.kills;
    const length = exports.records.total.length;
    const kd = kills / deaths;
    exports.records.total.ratios.kd = kd;
    const ld = length / deaths;
    exports.records.total.ratios.ld = ld;
}
exports.update = update;
function write() {
    fs_1.writeFileSync(filename, JSON.stringify(exports.records, null, '    '));
}
exports.write = write;
