export interface Records {
    best: {
        length: number
        kills: number
        totals: {
            kills: number
            length: number
            deaths: number,
        }
        ratios: {
            kd: number
            ld: number,
        },
    }
    total: {
        length: number
        kills: number
        deaths: number
        ratios: {
            kd: number
            ld: number,
        },
    }
}
