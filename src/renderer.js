import * as THREE from 'three';
import EventEmitter from "eventemitter3"

class Renderer extends EventEmitter{

    constructor({canvas}) {
        super();
        this.canvas = canvas
        console.log(canvas)
    }

    start() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.draw();


    }

    draw() {
        const animate = () => {
            requestAnimationFrame(animate)
            this.renderer.render(this.scene, this.camera)
        }
        animate()
    }
}

export default Renderer;