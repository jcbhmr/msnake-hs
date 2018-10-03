"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../shared/index");
const index_2 = require("../helpers/index");
class Food {
    constructor() {
        // private _position = Random.point() // PLACE
        this._position = index_2.place();
    }
    static create() {
        // TODO change this
        const id = index_1.Random.id();
        const food = new Food();
        this.map.set(id, food);
        return food;
    }
    static delete(id) {
        this.map.delete(id);
    }
    position() {
        return this._position;
    }
    place(position) {
        this._position = position;
    }
    reduce() {
        const reduced = {
            position: this._position,
        };
        return reduced;
    }
    static object() {
        const foods = {};
        for (const [id, food] of Food.map.pairs()) {
            foods[id] = food.reduce();
        }
        return foods;
    }
}
Food.map = new index_1.Map();
exports.Food = Food;
