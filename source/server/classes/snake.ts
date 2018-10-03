import { Communication, Random, Configuration, Map } from '../../shared/index'
import { Reducable, Etc, place, Records } from '../helpers/index'
import { Food } from './food'

export class Snake implements Reducable<Communication.Classes.Snake> {

    public static map = new Map<Snake>()

    public static create(id: string) {

        const snake = new Snake()
        this.map.set(id, snake)

        return snake

    }

    public static delete(id: string) {

        this.map.delete(id)

    }

    // public links = [Random.point()] // PLACE
    public links = [place()]
    private color = Random.color()
    private direction = { current: Random.direction(), next: Random.direction() }
    private statistics = Communication.Statistics.initial()
    private growing = Configuration.initial

    private constructor() { }

    public tick({ snakes, foods }: { snakes: string[][][], foods: string[][][] }) {

        this.grow()

        if (this.walls()) {
            const head = this.links[0]

            const _snakes = snakes[head.x][head.y]
            if (_snakes.length > 1) {
                for (const id of _snakes) {
                    const snake = Snake.map.get(id)
                    if (snake !== this) {
                        snake.length(Math.round(this.statistics.life.length / Configuration.leach))
                        snake.kill()
                    }
                }
                this.die()
            }

            const _foods = foods[head.x][head.y]
            if (_foods.length > 0) {
                for (const id of _foods) {
                    this.eat(id)
                }
            }
        }

        this.ratios()

    }

    public length(add: number) {

        this.growing += add

    }

    public move() {

        this.direction.current = this.direction.next

        const head = { ...this.links[0] }

        const move: { [key: string]: { (link: Communication.Point): void } } = {
            [Communication.Direction.UP]: link => --link.y,
            [Communication.Direction.DOWN]: link => ++link.y,
            [Communication.Direction.LEFT]: link => --link.x,
            [Communication.Direction.RIGHT]: link => ++link.x,
        }

        move[this.direction.current](head)

        this.links.unshift(head)

    }

    private grow() {

        if (this.growing === 0) {
            this.links.pop()
        } else {
            this.length(-1)

            ++this.statistics.session.totals.length
            ++this.statistics.life.length
            ++Records.records.total.length

            if (this.statistics.session.totals.length > Records.records.best.totals.length) {
                Records.records.best.totals.length = this.statistics.session.totals.length
            }

            if (this.statistics.life.length > this.statistics.session.length) {
                this.statistics.session.length = this.statistics.life.length

                if (this.statistics.session.length > Records.records.best.length) {
                    Records.records.best.length = this.statistics.session.length
                }
            }

        }

    }

    private eat(id: string) {

        this.length(Configuration.growth)

        // food.eaten()
        Food.delete(id)

        const snakes = Snake.map.keys().length
        const food = Food.map.keys().length

        if (snakes > food + 1 + (-Configuration.foodOffset)) {
            Food.create()
            Food.create()
        } else if (snakes === food + 1 + (-Configuration.foodOffset) || food === 0) {
            Food.create()
        }

    }

    public look(direction: Communication.Direction) {

        const forbidden = [
            [Communication.Direction.UP, Communication.Direction.DOWN],
            [Communication.Direction.LEFT, Communication.Direction.RIGHT],
        ]

        for (const pair of forbidden) {
            if (pair.includes(direction) && !pair.includes(this.direction.next)) {
                this.direction.next = direction
            }
        }

    }

    private walls() {

        const head = this.links[0]

        if (!Etc.within(head.x, -1, Configuration.size) || !Etc.within(head.y, -1, Configuration.size)) {
            this.die()
            return false
        }
        return true

    }

    private die() {

        this.statistics.life.length = 0
        this.statistics.life.kills = 0

        ++this.statistics.session.totals.deaths
        ++Records.records.total.deaths

        if (this.statistics.session.totals.deaths > Records.records.best.totals.deaths) {
            Records.records.best.totals.deaths = this.statistics.session.totals.deaths
        }

        // this.place(Random.point()) // PLACE
        this.place(place())
        this.direction = {
            current: Random.direction(),
            next: Random.direction(),
        }

    }

    public kill() {

        ++this.statistics.life.kills
        ++this.statistics.session.totals.kills
        ++Records.records.total.kills

        if (this.statistics.session.totals.kills > Records.records.best.totals.kills) {
            Records.records.best.totals.kills = this.statistics.session.totals.kills
        }

        if (this.statistics.life.kills > this.statistics.session.kills) {
            this.statistics.session.kills = this.statistics.life.kills

            if (this.statistics.session.kills > Records.records.best.kills) {
                Records.records.best.kills = this.statistics.session.kills
            }
        }

    }

    private ratios() {

        this.statistics.session.ratios.kd = this.statistics.session.totals.kills / (this.statistics.session.totals.deaths + 1)
        this.statistics.session.ratios.ld = this.statistics.session.totals.length / (this.statistics.session.totals.deaths + 1)

        if (this.statistics.session.ratios.kd > Records.records.best.ratios.kd) {
            Records.records.best.ratios.kd = this.statistics.session.ratios.kd
        }
        if (this.statistics.session.ratios.ld > Records.records.best.ratios.ld) {
            Records.records.best.ratios.ld = this.statistics.session.ratios.ld
        }
    }

    private place(position: Communication.Point) {

        this.links = [position]
        this.growing = Configuration.initial

    }

    public reduce() {

        const reduced: Communication.Classes.Snake = {
            color: this.color,
            growing: this.growing,
            direction: this.direction.current,
            links: this.links,
            statistics: this.statistics,
        }

        return reduced

    }

    public static object() {

        const snakes: Communication.Map<Communication.Classes.Snake> = {}

        for (const [id, snake] of Snake.map.pairs()) {
            snakes[id] = snake.reduce()
        }

        return snakes

    }

}
