import { Snake, Food } from './classes/index'
import { Records } from '../records'

export interface Point {
    x: number
    y: number
}

export enum Direction { UP, DOWN, LEFT, RIGHT }

export interface Color {
    red: number
    green: number
    blue: number
}

export interface Map<T> {
    [key: string]: T
}

export interface Tick {
    snakes: Map<Snake>
    foods: Map<Food>
    records: Records
}
