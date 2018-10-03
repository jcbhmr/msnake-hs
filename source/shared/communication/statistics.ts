// function instead of constant to generate new references each time
export function initial() {

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
    }

}
