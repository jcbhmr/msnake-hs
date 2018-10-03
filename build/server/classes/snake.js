"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../shared/index");
const index_2 = require("../helpers/index");
const food_1 = require("./food");
class Snake {
    constructor() {
        // public links = [Random.point()] // PLACE
        this.links = [index_2.place()];
        this.color = index_1.Random.color();
        this.direction = { current: index_1.Random.direction(), next: index_1.Random.direction() };
        this.statistics = index_1.Communication.Statistics.initial();
        this.growing = index_1.Configuration.initial;
    }
    static create(id) {
        const snake = new Snake();
        this.map.set(id, snake);
        return snake;
    }
    static delete(id) {
        this.map.delete(id);
    }
    tick({ snakes, foods }) {
        this.grow();
        if (this.walls()) {
            const head = this.links[0];
            const _snakes = snakes[head.x][head.y];
            if (_snakes.length > 1) {
                for (const id of _snakes) {
                    const snake = Snake.map.get(id);
                    if (snake !== this) {
                        snake.length(Math.round(this.statistics.life.length / index_1.Configuration.leach));
                        snake.kill();
                    }
                }
                this.die();
            }
            const _foods = foods[head.x][head.y];
            if (_foods.length > 0) {
                for (const id of _foods) {
                    this.eat(id);
                }
            }
        }
        this.ratios();
    }
    length(add) {
        this.growing += add;
    }
    move() {
        this.direction.current = this.direction.next;
        const head = Object.assign({}, this.links[0]);
        const move = {
            [index_1.Communication.Direction.UP]: link => --link.y,
            [index_1.Communication.Direction.DOWN]: link => ++link.y,
            [index_1.Communication.Direction.LEFT]: link => --link.x,
            [index_1.Communication.Direction.RIGHT]: link => ++link.x,
        };
        move[this.direction.current](head);
        this.links.unshift(head);
    }
    grow() {
        if (this.growing === 0) {
            this.links.pop();
        }
        else {
            this.length(-1);
            ++this.statistics.session.totals.length;
            ++this.statistics.life.length;
            ++index_2.Records.records.total.length;
            if (this.statistics.session.totals.length > index_2.Records.records.best.totals.length) {
                index_2.Records.records.best.totals.length = this.statistics.session.totals.length;
            }
            if (this.statistics.life.length > this.statistics.session.length) {
                this.statistics.session.length = this.statistics.life.length;
                if (this.statistics.session.length > index_2.Records.records.best.length) {
                    index_2.Records.records.best.length = this.statistics.session.length;
                }
            }
        }
    }
    eat(id) {
        this.length(index_1.Configuration.growth);
        // food.eaten()
        food_1.Food.delete(id);
        const snakes = Snake.map.keys().length;
        const food = food_1.Food.map.keys().length;
        if (snakes > food + 1 + (-index_1.Configuration.foodOffset)) {
            food_1.Food.create();
            food_1.Food.create();
        }
        else if (snakes === food + 1 + (-index_1.Configuration.foodOffset) || food === 0) {
            food_1.Food.create();
        }
    }
    look(direction) {
        const forbidden = [
            [index_1.Communication.Direction.UP, index_1.Communication.Direction.DOWN],
            [index_1.Communication.Direction.LEFT, index_1.Communication.Direction.RIGHT],
        ];
        for (const pair of forbidden) {
            if (pair.includes(direction) && !pair.includes(this.direction.next)) {
                this.direction.next = direction;
            }
        }
    }
    walls() {
        const head = this.links[0];
        if (!index_2.Etc.within(head.x, -1, index_1.Configuration.size) || !index_2.Etc.within(head.y, -1, index_1.Configuration.size)) {
            this.die();
            return false;
        }
        return true;
    }
    die() {
        this.statistics.life.length = 0;
        this.statistics.life.kills = 0;
        ++this.statistics.session.totals.deaths;
        ++index_2.Records.records.total.deaths;
        if (this.statistics.session.totals.deaths > index_2.Records.records.best.totals.deaths) {
            index_2.Records.records.best.totals.deaths = this.statistics.session.totals.deaths;
        }
        // this.place(Random.point()) // PLACE
        this.place(index_2.place());
        this.direction = {
            current: index_1.Random.direction(),
            next: index_1.Random.direction(),
        };
    }
    kill() {
        ++this.statistics.life.kills;
        ++this.statistics.session.totals.kills;
        ++index_2.Records.records.total.kills;
        if (this.statistics.session.totals.kills > index_2.Records.records.best.totals.kills) {
            index_2.Records.records.best.totals.kills = this.statistics.session.totals.kills;
        }
        if (this.statistics.life.kills > this.statistics.session.kills) {
            this.statistics.session.kills = this.statistics.life.kills;
            if (this.statistics.session.kills > index_2.Records.records.best.kills) {
                index_2.Records.records.best.kills = this.statistics.session.kills;
            }
        }
    }
    ratios() {
        this.statistics.session.ratios.kd = this.statistics.session.totals.kills / (this.statistics.session.totals.deaths + 1);
        this.statistics.session.ratios.ld = this.statistics.session.totals.length / (this.statistics.session.totals.deaths + 1);
        if (this.statistics.session.ratios.kd > index_2.Records.records.best.ratios.kd) {
            index_2.Records.records.best.ratios.kd = this.statistics.session.ratios.kd;
        }
        if (this.statistics.session.ratios.ld > index_2.Records.records.best.ratios.ld) {
            index_2.Records.records.best.ratios.ld = this.statistics.session.ratios.ld;
        }
    }
    place(position) {
        this.links = [position];
        this.growing = index_1.Configuration.initial;
    }
    reduce() {
        const reduced = {
            color: this.color,
            growing: this.growing,
            direction: this.direction.current,
            links: this.links,
            statistics: this.statistics,
        };
        return reduced;
    }
    static object() {
        const snakes = {};
        for (const [id, snake] of Snake.map.pairs()) {
            snakes[id] = snake.reduce();
        }
        return snakes;
    }
}
Snake.map = new index_1.Map();
exports.Snake = Snake;
