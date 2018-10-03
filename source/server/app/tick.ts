import { Snake, Food } from '../classes/index'
import { Communication, Configuration } from '../../shared/index'
import { Etc, Records } from '../helpers/index'

export function tick(): Communication.Tick {

    for (const snake of Snake.map.values()) {
        snake.move()
    }

    const persistant = (() => {
        const snakes: string[][][] = Array(Configuration.size).fill(null).map(() => Array(Configuration.size).fill(null).map(() => []))

        for (const [id, snake] of Snake.map.pairs()) {
            for (const link of snake.links) {
                if (Etc.within(link.x, -1, Configuration.size) && Etc.within(link.y, -1, Configuration.size)) {
                    snakes[link.x][link.y].push(id)
                }
            }
        }

        const foods: string[][][] = Array(Configuration.size).fill(null).map(() => Array(Configuration.size).fill(null).map(() => []))

        for (const [id, food] of Food.map.pairs()) {
            const position = food.position()

            if (Etc.within(position.x, -1, Configuration.size) && Etc.within(position.y, -1, Configuration.size)) {
                foods[position.x][position.y].push(id)
            }
        }

        return { snakes, foods }

    })()

    for (const snake of Snake.map.values()) {
        snake.tick(persistant)
    }

    // for(const food of Food.map.values()){

    // }

    Records.update()
    const records = Records.records

    return { snakes: Snake.object(), foods: Food.object(), records }

}
