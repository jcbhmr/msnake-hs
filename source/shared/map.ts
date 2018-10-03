import * as Communication from './communication/index'

export class Map<T> {

    private map: Communication.Map<T> = {}

    public values() {

        return Object.values(this.map)

    }

    public pairs() {

        return Object.entries(this.map)

    }

    public keys() {

        return Object.keys(this.map)

    }

    public set(id: string, entry: T) {

        this.map[id] = entry

    }

    public get(id: string) {

        return this.map[id]

    }

    public object() {

        return this.map

    }

    public delete(id: string) {

        delete this.map[id]

    }

}
