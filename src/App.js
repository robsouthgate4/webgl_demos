
import Renderer from './renderer.js';

class App {
    constructor() {

        const canvas = document.getElementById('canvas');

        this.renderer = new Renderer({
            canvas: canvas
        })

    }

    start() {
        console.log("I'm the entry point");
        this.renderer.start()
    }

}

export default App;