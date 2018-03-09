import * as THREE from 'three';
import EventEmitter from "eventemitter3"
const OrbitControls = require('three-orbit-controls')(THREE)
const TrackballControls = require('three-trackballcontrols')
const OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

import eggObj from '../objects/egg.obj'

import Geometries from "./Geometries"
import Materials from "./Materials"
import ControlKitUi from "./Utils/ControlKitUi"
import img from './images/bricks.jpg'
import Helpers from './Utils/Helpers'


export default class RendererEgg extends EventEmitter{

    constructor({canvas, props}) {
        super();
        this.canvas = canvas
        this.props = props
    }

    loadEgg() {
        return new Promise((resolve, reject) => {

            const loader = new THREE.OBJLoader();

            loader.load(eggObj,
            (obj) => {
                resolve(obj)
            })

        })
    }

    start() {

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true
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
                5
            )
        )

        this.gui = new ControlKitUi(this.props)
        this.gui.addListener("change", this.update.bind(this))

        this.controls = new OrbitControls( this.camera )

        this.eggMaterial = Materials.CreateEggMaterial();


        this.loadEgg()
            .then((object) => {

                var group = new THREE.Object3D()

                object.traverse( (child) => {
                    if (child instanceof THREE.Mesh) {
                        //here in child the geometry and material are available
                        var mesh = new THREE.Mesh( child.geometry, this.eggMaterial);
                        //mesh.position.z = -50;
                        group.add(mesh);
                    }
                });

                group.position.z = 0;

                this.scene.add(group);

            })

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

            this.eggMaterial.uniforms.time.value = time;
            this.eggMaterial.uniforms.wind.value = this.props.wind
            this.eggMaterial.uniforms.color.value = new THREE.Color(`rgb(${this.props.color[0]}, ${this.props.color[1]}, ${this.props.color[2]})`)
            this.eggMaterial.uniforms.color2.value = new THREE.Color(`rgb(${this.props.color2[0]}, ${this.props.color2[1]}, ${this.props.color2[2]})`)
            this.eggMaterial.uniforms.diffuse.value = new THREE.Color(`rgb(${this.props.color[0]}, ${this.props.color[1]}, ${this.props.color[2]})`)


            requestAnimationFrame(animate)
            this.renderer.render(this.scene, this.camera)
        }
        animate()
    }
}