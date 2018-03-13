
import RendererEgg from './RendererEgg'

import EventEmitter from "eventemitter3"
import '../style/app.scss'
import Props from "./Props"
import Helpers from "./Utils/Helpers"

class App extends EventEmitter {
    constructor() {
        super()
        const canvas = document.getElementById('canvas')

        this.props = new Props();


        this.renderer = new RendererEgg ({
            canvas: canvas,
            props: this.props
        })

        this.attachListeners()

    }

    onResize() {
        this.renderer.refreshSize();
    }

    mapCoords(e) {

        console.log(e)
        const numX = e.clientX;
        const numY = e.clientY;
        const x = Helpers.reMap(numX, 0, window.innerWidth, 0, 1);
        const y = Helpers.reMap(numY, 0, window.innerHeight, 1, 0);
        console.log({
            x, y
        })

        this.props.mouseX = x;
        this.props.mouseY = y;
    }

    onMouseDown(e) {
        window.onmousemove = (e) => {
            this.mapCoords(e);
        }
    }

    attachListeners() {
        window.addEventListener("mouseup", function(e){
            window.onmousemove = null
        });
        window.addEventListener( 'mousedown', this.onMouseDown.bind(this), false )
        window.addEventListener( 'resize', this.onResize.bind(this), false );
    }

    start() {
        console.log("I'm the entry point");
        this.renderer.start()
    }

}

export default App;