import { Communication, Map, Random } from '../../shared/index'
import { Reducable, place } from '../helpers/index'

export class Food implements Reducable<Communication.Classes.Food> {

    public static map = new Map<Food>()

    public static create() {

        // TODO change this
        const id = Random.id()

        const food = new Food()
        this.map.set(id, food)

        return food

    }

    public static delete(id: string) {

        this.map.delete(id)

    }

    private constructor() { }

    // private _position = Random.point() // PLACE
    private _position = place()

    public position() {

        return this._position

    }

    public place(position: Communication.Point) {

        this._position = position

    }

    public reduce() {

        const reduced = {
            position: this._position,
        }

        return reduced

    }

    public static object() {

        const foods: Communication.Map<Communication.Classes.Food> = {}

        for (const [id, food] of Food.map.pairs()) {
            foods[id] = food.reduce()
        }

        return foods

    }

}
