"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../shared/index");
/// <reference path='../types.d.ts' />
class Food {
    constructor(food) {
        this.position = index_1.Random.point();
        this.apply(food);
    }
    apply(food) {
        this.position = food.position;
    }
    show() {
        const scale = width / index_1.Configuration.size;
        ellipseMode(CORNER);
        noStroke();
        fill(255, 0, 0);
        ellipse(this.position.x * scale - scale * 0.25, this.position.y * scale - scale * 0.25, scale * 1.5);
    }
}
Food.map = new index_1.Map();
exports.Food = Food;
