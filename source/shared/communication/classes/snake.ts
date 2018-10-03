import * as Common from '../common'

export interface Snake {
    color: Common.Color
    links: Common.Point[]
    direction: Common.Direction
    growing: number
    statistics: Statistics
}

interface Life {
    kills: number
    length: number
}

interface Session extends Life {
    totals: Life & { deaths: number }
    ratios: Ratios
}

interface Ratios {
    kd: number
    ld: number
}

interface Statistics {
    life: Life
    session: Session
}
