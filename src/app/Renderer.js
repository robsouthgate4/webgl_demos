import * as THREE from 'three';
import EventEmitter from "eventemitter3"
const OrbitControls = require('three-orbit-controls')(THREE)
const TrackballControls = require('three-trackballcontrols')

import Geometries from "./Geometries";
import Materials from "./Materials";
import ControlKitUi from "./Utils/ControlKitUi";
import Props from './Props';

class Renderer extends EventEmitter{

    constructor({canvas, props}) {
        super();
        this.canvas = canvas
        this.numOfSpheresRow = 10;
        this.numOfSpheresCol = 10;
        this.sphereMeshArr = [];
        this.xDistance = 30;
        this.zDistance = 30;
        this.xOffset = -80;
        this.props = props;
    }

    start() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.camera.position.z = 200;


        const sphereGeom = Geometries.CreateSphere(7);
        const sphereMat = Materials.CreateWireframeMaterial(this.props.color);

        for (let i = 0; i < this.numOfSpheresRow; i++) {
            for (let j = 0; j < this.numOfSpheresCol; j++) {


                let sphereMesh = new THREE.Mesh(
                    sphereGeom,
                    sphereMat
                )

                sphereMesh.position.x = (this.xDistance * i) + this.xOffset;
                sphereMesh.position.z = (this.zDistance * j)

                this.sphereMeshArr.push(sphereMesh)

                this.scene.add(sphereMesh)
            }
        }


        this.gui = new ControlKitUi(this.props)
        this.gui.addListener("change", this.update.bind(this))


        this.controls = new OrbitControls( this.camera );
        this.controls.update();

        this.draw();

    }

    update() {

        console.log(this.sphereMeshArr)

        this.sphereMeshArr.forEach(sphere => {
            sphere.material.color = new THREE.Color(`rgb(${this.props.color[0]}, ${this.props.color[1]}, ${this.props.color[2]})`)
        })

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
        const animate = () => {
            this.sphereMeshArr.forEach(sphere => {
                sphere.rotation.x += 0.005;
                sphere.rotation.y += 0.005;
            })
            requestAnimationFrame(animate)
            this.renderer.render(this.scene, this.camera)
        }
        animate()
    }
}

export default Renderer;