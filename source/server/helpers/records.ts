import { writeFileSync } from 'fs'
import { Records } from '../../shared/index'

const filename = __dirname + '/../../../source/server/records.json'

export const records: Records = require(filename)

export function update() {

    const deaths = records.total.deaths
    const kills = records.total.kills
    const length = records.total.length

    const kd = kills / deaths
    records.total.ratios.kd = kd

    const ld = length / deaths
    records.total.ratios.ld = ld

}

export function write() {

    writeFileSync(filename, JSON.stringify(records, null, '    '))

}
