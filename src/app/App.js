
import Renderer from './renderer.js'
import EventEmitter from "eventemitter3"
import '../style/app.scss';

class App {
    constructor() {

        const canvas = document.getElementById('canvas')

        this.renderer = new Renderer({
            canvas: canvas
        })

        this.attachListeners()

    }

    onResize() {
        this.renderer.refreshSize();
    }

    attachListeners() {
        window.addEventListener( 'resize', this.onResize.bind(this), false );
    }

    start() {
        console.log("I'm the entry point");
        this.renderer.start()
    }

}

export default App;