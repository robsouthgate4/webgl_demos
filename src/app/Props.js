import EventEmitter from 'eventemitter3'
export default class Props extends EventEmitter{
    constructor() {
        super()
        this.color = [255, 255, 255]
        this.rotationSpeed = 0.005
    }
}