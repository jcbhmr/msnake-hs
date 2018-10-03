import { Map, Communication, Configuration, Random } from '../../shared/index'

/// <reference path='../types.d.ts' />

export class Food {

    public static map = new Map<Food>()

    private position = Random.point()

    public constructor(food: Communication.Classes.Food) {

        this.apply(food)

    }

    public apply(food: Communication.Classes.Food) {

        this.position = food.position

    }

    public show() {

        const scale = width / Configuration.size

        ellipseMode(CORNER)
        noStroke()
        fill(255, 0, 0)
        ellipse(this.position.x * scale - scale * 0.25, this.position.y * scale - scale * 0.25, scale * 1.5)

    }

}
