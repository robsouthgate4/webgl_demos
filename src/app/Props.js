import EventEmitter from 'eventemitter3'

export default class Props extends EventEmitter{
    constructor() {
        super()
        this.color = [2, 224, 43]
        this.rotationSpeed = 0.005
        this.wind = 11
        this.windRange = [0.0, 11.0]
        this.valueA = 0.25
        this.valueB = 1.25
        this.func = (x,y) => {
            return Math.sin(x * this.valueA) * Math.cos(y * this.valueB);
        }
    }
}