import { Communication, Records } from '../../shared/index'
import { Snake } from '../classes/index'
import { socket } from './socket'

/// <reference path='../types.d.ts' />

class Score {

    private element: any
    private value: string

    public constructor(id: string) {

        this.element = $(id)
        if (this.element === {}) {
            console.error('no element with id:', id)
        }
        this.value = this.element.text()

    }

    public update(value: string | number) {

        if (typeof value === 'number') {
            value = floor(value * 10) / 10
        }
        value = value.toString()

        if (this.value !== value) {
            this.value = value
            this.set(value)
            return true
        } else {
            return false
        }

    }

    private set(value: string) {

        this.element.text(value)

    }

    public get() {

        return this.value

    }

}

class Highscore {

    private element: any
    private value: Communication.Color
    private score: Score

    public constructor(id: string) {
        this.score = new Score(id)

        const colorId = id + '-color-indicator'
        this.element = $(colorId)
        if (this.element === {}) {
            console.error('no element with id:', id)
        }
        this.value = this.element.text()
    }

    public update(value: string | number, color: Communication.Color) {

        if (typeof value === 'number') {
            value = floor(value * 10) / 10
        }
        value = value.toString()

        this.updateColor(color)

        if (this.score.update(value)) {
            return true
        } else {
            return false
        }

    }

    private updateColor(color: Communication.Color) {

        if (this.value !== color) {
            this.value = color
            this.set(color)
            return true
        } else {
            return false
        }

    }

    private set(color: Communication.Color) {

        this.element.attr('style', `color: rgb(${color.red},${color.green},${color.blue});`)

    }

    public get() {

        return {
            color: this.value,
            score: this.score.get(),
        }

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
}

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
}

export const colors = {
    red: new Score('#self-color-red'),
    green: new Score('#self-color-green'),
    blue: new Score('#self-color-blue'),
    indicator: $('#self-color-indicator'),
}

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
}

export function update(records: Records) {

    const self = Snake.map.get(socket.id)

    if (self !== undefined) {
        const statistics = self.scores()

        scores.life.length.update(statistics.life.length)
        scores.life.kills.update(statistics.life.kills)

        // statistics.session.length == 5
        scores.session.length.update(statistics.session.length)
        scores.session.kills.update(statistics.session.kills)

        scores.session.totals.length.update(statistics.session.totals.length)
        scores.session.totals.kills.update(statistics.session.totals.kills)
        scores.session.totals.deaths.update(statistics.session.totals.deaths)

        scores.session.ratios.kd.update(statistics.session.ratios.kd)
        scores.session.ratios.ld.update(statistics.session.ratios.ld)

        const color = self.color()
        if (
            colors.red.update(color.red) ||
            colors.green.update(color.green) ||
            colors.blue.update(color.blue)
        ) {
            colors.indicator.attr('style', `color: rgb(${color.red},${color.green},${color.blue});`)
        }
    }

    const incoming = Snake.map.values()

    {
        // length
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().life.length > max.scores().life.length) {
                return snake
            } else {
                return max
            }
        })

        scoreboards.life.length.update(max.scores().life.length, max.color())
    }

    {
        // kills
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().life.kills > max.scores().life.kills) {
                return snake
            } else {
                return max
            }
        })

        scoreboards.life.kills.update(max.scores().life.kills, max.color())
    }

    {
        // best length
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.length > max.scores().session.length) {
                return snake
            } else {
                return max
            }
        })

        scoreboards.session.length.update(max.scores().session.length, max.color())
    }

    {
        // best kills
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.kills > max.scores().session.kills) {
                return snake
            } else {
                return max
            }
        })

        scoreboards.session.kills.update(max.scores().session.kills, max.color())
    }

    {
        // total length
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.totals.length > max.scores().session.totals.length) {
                return snake
            } else {
                return max
            }
        })

        scoreboards.session.totals.length.update(max.scores().session.totals.length, max.color())
    }

    {
        // total kills
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.totals.kills > max.scores().session.totals.kills) {
                return snake
            } else {
                return max
            }
        })

        scoreboards.session.totals.kills.update(max.scores().session.totals.kills, max.color())
    }

    {
        // deaths
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.totals.deaths > max.scores().session.totals.deaths) {
                return snake
            } else {
                return max
            }
        })

        scoreboards.session.totals.deaths.update(max.scores().session.totals.deaths, max.color())
    }

    {
        // kd
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.ratios.kd > max.scores().session.ratios.kd) {
                return snake
            } else {
                return max
            }
        })

        scoreboards.session.ratios.kd.update(max.scores().session.ratios.kd, max.color())
    }

    {
        // ld
        const max = incoming.reduce((max, snake) => {
            if (snake.scores().session.ratios.ld > max.scores().session.ratios.ld) {
                return snake
            } else {
                return max
            }
        })

        scoreboards.session.ratios.ld.update(max.scores().session.ratios.ld, max.color())
    }

    globals.best.kills.update(records.best.kills)
    globals.best.length.update(records.best.length)

    globals.best.totals.kills.update(records.best.totals.kills)
    globals.best.totals.length.update(records.best.totals.length)
    globals.best.totals.deaths.update(records.best.totals.deaths)

    globals.best.ratios.kd.update(records.best.ratios.kd)
    globals.best.ratios.ld.update(records.best.ratios.kd)

    globals.total.kills.update(records.total.kills)
    globals.total.length.update(records.total.length)
    globals.total.deaths.update(records.total.deaths)

    globals.total.ratios.kd.update(records.total.ratios.kd)
    globals.total.ratios.ld.update(records.total.ratios.ld)}
