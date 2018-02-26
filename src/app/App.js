import RendererDistortion from './RendererDistortion'
import Renderer from './Renderer'
import EventEmitter from "eventemitter3"
import '../style/app.scss'
import Props from "./Props"

class App extends EventEmitter {
    constructor() {
        super()
        const canvas = document.getElementById('canvas')

        this.props = new Props();

        this.renderer = new RendererDistortion({
            canvas: canvas,
            props: this.props
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