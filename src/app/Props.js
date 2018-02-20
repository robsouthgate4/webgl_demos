import EventEmitter from 'eventemitter3'

export default class Props extends EventEmitter{
    constructor() {
        super()
        this.color = [42, 252, 5]
        this.rotationSpeed = 0.005
    }
}