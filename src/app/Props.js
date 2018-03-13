import EventEmitter from 'eventemitter3'

export default class Props extends EventEmitter{
    constructor() {
        super()
        this.orbitControls =false
        this.color = [236,212,255]
        this.color2 = [204,238,255]
        this.rotationSpeed = 0.005
        this.wind = 11
        this.windRange = [0.0, 11.0]
        this.valueA = 0.25
        this.valueB = 1.25
        this.mouseX = 0
        this.mouseY = 0
        this.brickTile = false
    }
}