import EventEmitter from 'eventemitter3'

export default class Props extends EventEmitter{
    constructor() {
        super()
        this.orbitControls =false
        this.color = [189,111,252]
        this.color2 = [204,238,255]
        this.rotationSpeed = 0.005
        this.wind = 11
        this.wave = false
        this.valueA = 0.25
        this.valueB = 1.25
        this.mouseX = 0
        this.mouseY = 0
        this.brickTile = false
        this.splitEgg = false
        this.transparency = true
    }
}