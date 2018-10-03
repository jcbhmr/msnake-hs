(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./p5"));
__export(require("./socket"));

},{"./p5":2,"./socket":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../shared/index");
const index_2 = require("../classes/index");
const socket_1 = require("./socket");
const holder = $('#canvas-holder');
function sizeCanvas() {
    if (holder !== null) {
        const width = holder.innerWidth();
        const height = holder.innerHeight();
        const size = min(width, height);
        return size;
    }
    else {
        return 100;
    }
}
function setup() {
    const size = sizeCanvas();
    const canvas = createCanvas(size, size);
    canvas.parent('#canvas-holder');
    background(index_1.Configuration.background);
}
exports.setup = setup;
function windowResized() {
    const size = sizeCanvas();
    resizeCanvas(size, size);
    background(index_1.Configuration.background);
}
exports.windowResized = windowResized;
function draw() {
    background(index_1.Configuration.background);
    for (const food of index_2.Food.map.values()) {
        food.show();
    }
    for (const snake of index_2.Snake.map.values()) {
        snake.show();
    }
}
exports.draw = draw;
function keyPressed() {
    const map = {
        w: index_1.Communication.Direction.UP,
        a: index_1.Communication.Direction.LEFT,
        d: index_1.Communication.Direction.RIGHT,
        s: index_1.Communication.Direction.DOWN,
        ArrowUp: index_1.Communication.Direction.UP,
        ArrowDown: index_1.Communication.Direction.DOWN,
        ArrowLeft: index_1.Communication.Direction.LEFT,
        ArrowRight: index_1.Communication.Direction.RIGHT,
    };
    const direction = map[key];
    const self = index_2.Snake.map.get(socket_1.socket.id);
    if (self !== undefined) {
        self.look(direction);
    }
}
exports.keyPressed = keyPressed;

},{"../../shared/index":14,"../classes/index":6,"./socket":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../classes/index");
const socket_1 = require("./socket");
/// <reference path='../types.d.ts' />
class Score {
    constructor(id) {
        this.element = $(id);
        if (this.element === {}) {
            console.error('no element with id:', id);
        }
        this.value = this.element.text();
    }
    update(value) {
        if (typeof value === 'number') {
            value = floor(value * 10) / 10;
        }
        value = value.toString();
        if (this.value !== value) {
            this.value = value;
            this.set(value);
            return true;
        }
        else {
            return false;
        }
    }
    set(value) {
        this.element.text(value);
    }
    get() {
        return this.value;
    }
}
class Highscore {
    constructor(id) {
        this.score = new Score(id);
        const colorId = id + '-color-indicator';
        this.element = $(colorId);
        if (this.element === {}) {
            console.error('no element with id:', id);
        }
        this.value = this.element.text();
    }
    update(value, color) {
        if (typeof value === 'number') {
            value = floor(value * 10) / 10;
        }
        value = value.toString();
        this.updateColor(color);
        if (this.score.update(value)) {
            return true;
        }
        else {
            return false;
        }
    }
    updateColor(color) {
        if (this.value !== color) {
            this.value = color;
            this.set(color);
            return true;
        }
        else {
            return false;
        }
    }
    set(color) {
        this.element.attr('style', `color: rgb(${color.red},${color.green},${color.blue});`);
    }
    get() {
        return {
            color: this.value,
            score: this.score.get(),
        };
    }
}
const scores = {
    life: {
        length: new Score('#self-life-length'),
        kills: new Score('#self-life-kills'),
    },
    session: {
        length: new Score('#self-record-length'),
        kills: new Score('#self-record-kills'),
        ratios: {
            kd: new Score('#self-ratio-kd'),
            ld: new Score('#self-ratio-ld'),
        },
        totals: {
            length: new Score('#self-total-length'),
            kills: new Score('#self-total-kills'),
            deaths: new Score('#self-total-deaths'),
        },
    },
};
const scoreboards = {
    life: {
        length: new Highscore('#session-life-length'),
        kills: new Highscore('#session-life-kills'),
    },
    session: {
        length: new Highscore('#session-record-length'),
        kills: new Highscore('#session-record-kills'),
        ratios: {
            kd: new Highscore('#session-ratio-kd'),
            ld: new Highscore('#session-ratio-ld'),
        },
        totals: {
            length: new Highscore('#session-total-length'),
            kills: new Highscore('#session-total-kills'),
            deaths: new Highscore('#session-total-deaths'),
        },
    },
};
exports.colors = {
    red: new Score('#self-color-red'),
    green: new Score('#self-color-green'),
    blue: new Score('#self-color-blue'),
    indicator: $('#self-color-indicator'),
};
const globals = {
    best: {
        kills: new Score('#globals-best-kills'),
        length: new Score('#globals-best-length'),
        ratios: {
            kd: new Score('#globals-best-kd'),
            ld: new Score('#globals-best-ld'),
        },
        totals: {
            deaths: new Score('#globals-best-total-deaths'),
            kills: new Score('#globals-best-total-kills'),
            length: new Score('#globals-best-total-length'),
        },
    },
    total: {
        deaths: new Score('#globals-total-deaths'),
        kills: new Score('#globals-total-kills'),
        length: new Score('#globals-total-length'),
        ratios: {
            kd: new Score('#globals-total-kd'),
            ld: new Score('#globals-total-ld'),
        },
    },
};
function update(records) {
    const self = index_1.Snake.map.get(socket_1.socket.id);
    if (self !== undefined) {
        const statistics = self.scores();
        scores.life.length.update(statistics.life.length);
        scores.life.kills.update(statistics.life.kills);
        // statistics.session.length == 5
        scores.session.length.update(statistics.session.length);
        scores.session.kills.update(statistics.session.kills);
        scores.session.totals.length.update(statistics.session.totals.length);
        scores.session.totals.kills.update(statistics.session.totals.kills);
        scores.session.totals.deaths.update(statistics.session.totals.deaths);
        scores.session.ratios.kd.update(statistics.session.ratios.kd);
        scores.session.ratios.ld.update(statistics.session.ratios.ld);
        const color = self.color();
        if (exports.colors.red.update(color.red) ||
            exports.colors.green.update(color.green) ||
            exports.colors.blue.update(color.blue)) {
            exports.colors.indicator.attr('style', `color: rgb(${color.red},${color.green},${color.blue});`);
        }
    }
    const incoming = index_1.Snake.map.values();
    {
        // length
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().life.length > max.scores().life.length) {
                return snake;
            }
            else {
                return max;
            }
        });
        scoreboards.life.length.update(max.scores().life.length, max.color());
    }
    {
        // kills
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().life.kills > max.scores().life.kills) {
                return snake;
            }
            else {
                return max;
            }
        });
        scoreboards.life.kills.update(max.scores().life.kills, max.color());
    }
    {
        // best length
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.length > max.scores().session.length) {
                return snake;
            }
            else {
                return max;
            }
        });
        scoreboards.session.length.update(max.scores().session.length, max.color());
    }
    {
        // best kills
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.kills > max.scores().session.kills) {
                return snake;
            }
            else {
                return max;
            }
        });
        scoreboards.session.kills.update(max.scores().session.kills, max.color());
    }
    {
        // total length
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.totals.length > max.scores().session.totals.length) {
                return snake;
            }
            else {
                return max;
            }
        });
        scoreboards.session.totals.length.update(max.scores().session.totals.length, max.color());
    }
    {
        // total kills
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.totals.kills > max.scores().session.totals.kills) {
                return snake;
            }
            else {
                return max;
            }
        });
        scoreboards.session.totals.kills.update(max.scores().session.totals.kills, max.color());
    }
    {
        // deaths
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.totals.deaths > max.scores().session.totals.deaths) {
                return snake;
            }
            else {
                return max;
            }
        });
        scoreboards.session.totals.deaths.update(max.scores().session.totals.deaths, max.color());
    }
    {
        // kd
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.ratios.kd > max.scores().session.ratios.kd) {
                return snake;
            }
            else {
                return max;
            }
        });
        scoreboards.session.ratios.kd.update(max.scores().session.ratios.kd, max.color());
    }
    {
        // ld
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.ratios.ld > max.scores().session.ratios.ld) {
                return snake;
            }
            else {
                return max;
            }
        });
        scoreboards.session.ratios.ld.update(max.scores().session.ratios.ld, max.color());
    }
    globals.best.kills.update(records.best.kills);
    globals.best.length.update(records.best.length);
    globals.best.totals.kills.update(records.best.totals.kills);
    globals.best.totals.length.update(records.best.totals.length);
    globals.best.totals.deaths.update(records.best.totals.deaths);
    globals.best.ratios.kd.update(records.best.ratios.kd);
    globals.best.ratios.ld.update(records.best.ratios.kd);
    globals.total.kills.update(records.total.kills);
    globals.total.length.update(records.total.length);
    globals.total.deaths.update(records.total.deaths);
    globals.total.ratios.kd.update(records.total.ratios.kd);
    globals.total.ratios.ld.update(records.total.ratios.ld);
}
exports.update = update;

},{"../classes/index":6,"./socket":4}],4:[function(require,module,exports){
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

},{"../classes/index":6,"./scoreboard":3}],5:[function(require,module,exports){
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

},{"../../shared/index":14}],6:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./food"));
__export(require("./snake"));

},{"./food":5,"./snake":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../shared/index");
const socket_1 = require("../app/socket");
/// <reference path='../types.d.ts' />
class Snake {
    constructor(snake) {
        this._color = {
            red: 0,
            green: 0,
            blue: 0,
        };
        this.links = [];
        // @ts-ignore
        this.growing = 0;
        this.direction = {
            current: index_1.Random.direction(),
            next: index_1.Random.direction(),
        };
        this.statistics = index_1.Communication.Statistics.initial();
        this.apply(snake);
    }
    apply(snake) {
        this._color = snake.color;
        this.links = snake.links;
        this.growing = snake.growing;
        this.direction.current = snake.direction;
        this.statistics = snake.statistics;
    }
    look(direction) {
        if (direction !== undefined) {
            const forbidden = [
                [index_1.Communication.Direction.UP, index_1.Communication.Direction.DOWN],
                [index_1.Communication.Direction.LEFT, index_1.Communication.Direction.RIGHT],
            ];
            for (const pair of forbidden) {
                if (pair.includes(direction) && !pair.includes(this.direction.current)) {
                    this.direction.next = direction;
                    socket_1.socket.emit('direction', direction);
                    break;
                }
            }
        }
    }
    scores() {
        return this.statistics;
    }
    color() {
        return this._color;
    }
    show() {
        if (this.links.length > 0) {
            const scale = width / index_1.Configuration.size;
            ellipseMode(CORNER);
            noStroke();
            fill(this._color.red, this._color.green, this._color.blue);
            ellipse(this.links[0].x * scale - scale * 0.25, this.links[0].y * scale - scale * 0.25, scale * 1.5);
            for (let i = 0; i < this.links.length - 1; ++i) {
                strokeWeight(scale);
                stroke(this._color.red, this._color.green, this._color.blue);
                line(this.links[i].x * scale + scale / 2, this.links[i].y * scale + scale / 2, this.links[i + 1].x * scale + scale / 2, this.links[i + 1].y * scale + scale / 2);
            }
        }
    }
}
Snake.map = new index_1.Map();
exports.Snake = Snake;

},{"../../shared/index":14,"../app/socket":4}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App = require("./app/index");
Object.assign(window, App);

},{"./app/index":1}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction = exports.Direction || (exports.Direction = {}));

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Classes = require("./classes/index");
exports.Classes = Classes;
const common_1 = require("./common");
exports.Direction = common_1.Direction;
const Statistics = require("./statistics");
exports.Statistics = Statistics;

},{"./classes/index":9,"./common":10,"./statistics":12}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// function instead of constant to generate new references each time
function initial() {
    return {
        life: {
            kills: 0,
            length: 0,
        },
        session: {
            totals: {
                kills: 0,
                length: 0,
                deaths: 0,
            },
            kills: 0,
            length: 0,
            ratios: {
                kd: 0,
                ld: 0,
            },
        },
    };
}
exports.initial = initial;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.size = 75;
exports.interval = 50;
// export const grow = 25
exports.background = 60;
exports.growth = 6;
exports.initial = 12;
exports.foodOffset = +6;
exports.leach = 2;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configuration = require("./configuration");
exports.Configuration = Configuration;
const Communication = require("./communication/index");
exports.Communication = Communication;
const Random = require("./random");
exports.Random = Random;
const map_1 = require("./map");
exports.Map = map_1.Map;

},{"./communication/index":11,"./configuration":13,"./map":15,"./random":16}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./communication/index");
const Configuration = require("./configuration");
function integer(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
exports.integer = integer;
function color() {
    return ({
        red: integer(0, 255),
        green: integer(0, 255),
        blue: integer(0, 255),
    });
}
exports.color = color;
function point() {
    return ({
        x: integer(0, Configuration.size),
        y: integer(0, Configuration.size),
    });
}
exports.point = point;
function direction() {
    return [
        index_1.Direction.UP,
        index_1.Direction.DOWN,
        index_1.Direction.LEFT,
        index_1.Direction.RIGHT,
    ][integer(0, 3)];
}
exports.direction = direction;
function id() {
    // TODO improve this
    return Date.now().toString() + Math.round(Math.random() * 1000).toString();
}
exports.id = id;

},{"./communication/index":11,"./configuration":13}]},{},[8]);
