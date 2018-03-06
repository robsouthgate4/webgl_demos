import EventEmitter from 'eventemitter3'

export default class Props extends EventEmitter{
    constructor() {
        super()
        this.color = [208, 21, 212]
        this.rotationSpeed = 0.005
        this.wind = 0
        this.speed = 0
        this.speedRange = [0.0, 20.0]
        this.windRange = [0.0, 18.0]
        this.valueA = 0.25
        this.valueB = 1.25
        this.func = (x,y) => {
            return Math.sin(x * this.valueA) * Math.cos(y * this.valueB);
        }
    }
}