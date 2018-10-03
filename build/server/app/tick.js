"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../classes/index");
const index_2 = require("../../shared/index");
const index_3 = require("../helpers/index");
function tick() {
    for (const snake of index_1.Snake.map.values()) {
        snake.move();
    }
    const persistant = (() => {
        const snakes = Array(index_2.Configuration.size).fill(null).map(() => Array(index_2.Configuration.size).fill(null).map(() => []));
        for (const [id, snake] of index_1.Snake.map.pairs()) {
            for (const link of snake.links) {
                if (index_3.Etc.within(link.x, -1, index_2.Configuration.size) && index_3.Etc.within(link.y, -1, index_2.Configuration.size)) {
                    snakes[link.x][link.y].push(id);
                }
            }
        }
        const foods = Array(index_2.Configuration.size).fill(null).map(() => Array(index_2.Configuration.size).fill(null).map(() => []));
        for (const [id, food] of index_1.Food.map.pairs()) {
            const position = food.position();
            if (index_3.Etc.within(position.x, -1, index_2.Configuration.size) && index_3.Etc.within(position.y, -1, index_2.Configuration.size)) {
                foods[position.x][position.y].push(id);
            }
        }
        return { snakes, foods };
    })();
    for (const snake of index_1.Snake.map.values()) {
        snake.tick(persistant);
    }
    // for(const food of Food.map.values()){
    // }
    index_3.Records.update();
    const records = index_3.Records.records;
    return { snakes: index_1.Snake.object(), foods: index_1.Food.object(), records };
}
exports.tick = tick;
