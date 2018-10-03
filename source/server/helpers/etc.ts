import { Communication } from '../../shared/index'

export function within(input: number, min: number, max: number) {

    return input < max && input > min

}

export function compare(point1: Communication.Point, point2: Communication.Point) {

    return point1.x === point2.x && point1.y === point2.y

}
