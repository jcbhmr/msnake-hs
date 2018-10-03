"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Map {
    constructor() {
        this.map = {};
    }
    values() {
        return Object.values(this.map);
    }
    pairs() {
        return Object.entries(this.map);
    }
    keys() {
        return Object.keys(this.map);
    }
    set(id, entry) {
        this.map[id] = entry;
    }
    get(id) {
        return this.map[id];
    }
    object() {
        return this.map;
    }
    delete(id) {
        delete this.map[id];
    }
}
exports.Map = Map;
