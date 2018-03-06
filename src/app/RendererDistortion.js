import * as THREE from 'three';
import EventEmitter from "eventemitter3"
const OrbitControls = require('three-orbit-controls')(THREE)
const TrackballControls = require('three-trackballcontrols')


import Geometries from "./Geometries"
import Materials from "./Materials"
import ControlKitUi from "./Utils/ControlKitUi"
import img from './images/bricks.jpg'
import Helpers from './Utils/Helpers'


export default class RendererDistortion extends EventEmitter{

    constructor({canvas, props}) {
        super();
        this.canvas = canvas
        this.props = props
    }

    start() {

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        })


        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 35000 )

        // this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
        // this.scene.add(this.directionalLight)

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.camera.position.copy(
            new THREE.Vector3(
                0,
                0,
                30
            )
        )

        this.planeGeom = Geometries.CreatePlaneGeometry(30, 30, 300, 300)

        this.gui = new ControlKitUi(this.props)
        this.gui.addListener("change", this.update.bind(this))

        this.controls = new OrbitControls( this.camera )


        this.planeMat = Materials.CreateDistortionMaterial()
        this.planeMesh = new THREE.Mesh(
            this.planeGeom,
            this.planeMat
        )


        this.scene.add(this.planeMesh)
        this.draw()



    }

    update() {

        this.refreshRenderer()

    }

    refreshSize() {

        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize( window.innerWidth, window.innerHeight )

    }

    refreshRenderer() {
        this.renderer.render(this.scene, this.camera)
    }

    draw() {

        let time = 0;

        const animate = () => {

            const timer = Date.now() * 0.00050

            time += 1;

            if (this.planeGeom) {
                this.planeMat.uniforms.time.value = time;
                this.planeMat.uniforms.wind.value = this.props.wind
                this.planeMat.uniforms.speed.value = this.props.speed
                this.planeMat.uniforms.color.value = new THREE.Color(`rgb(${this.props.color[0]}, ${this.props.color[1]}, ${this.props.color[2]})`)
                this.planeMat.uniforms.diffuse.value = new THREE.Color(`rgb(${this.props.color[0]}, ${this.props.color[1]}, ${this.props.color[2]})`)
            }
            requestAnimationFrame(animate)
            this.renderer.render(this.scene, this.camera)
        }
        animate()
    }
}
