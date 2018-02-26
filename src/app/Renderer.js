import * as THREE from 'three';
import EventEmitter from "eventemitter3"
const OrbitControls = require('three-orbit-controls')(THREE)
const TrackballControls = require('three-trackballcontrols')


import Geometries from "./Geometries"
import Materials from "./Materials"
import ControlKitUi from "./Utils/ControlKitUi"
import bonoboMp3 from '../tracks/bonobo-kerala.mp3'
import AudioAnalyser from "./AudioAnalyser"
import Helpers from './Utils/Helpers'


class Renderer extends EventEmitter{

    constructor({canvas, props}) {
        super();
        this.canvas = canvas
        this.numOfSpheresRow = 20;
        this.numOfSpheresCol = 20;
        this.sphereMeshArr = [];
        this.xDistance = 30;
        this.zDistance = 30;
        this.xOffset = -80;
        this.props = props;
    }

    start() {

        this.audioAnalysis = new AudioAnalyser({
            track: bonoboMp3,
            loop: true,
            fftSize: 512
        })

        this.audioListener = this.audioAnalysis.getListener
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 35000 )
        this.camera.add(this.audioListener)


        /*
        Add lights
         */

        this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
        this.scene.add(this.directionalLight)

        this.light1 = new THREE.PointLight(0x000000)
        this.light1.position.set( 0, 180, 0 )
        this.scene.add(this.light1)

        this.light2 = new THREE.PointLight(0x000000)
        this.light2.position.set( 0 ,250, 0 );
        this.scene.add(this.light2);

        /*
        Add light spheres for debugging point light position
         */

        // Helpers.addLightSphere({
        //     light: this.light2,
        //     color: 0x00ff00
        // })
        //
        // Helpers.addLightSphere({
        //     light: this.light1,
        //     color: 0xff0000
        // })

        this.audioAnalysis.loadTrack()
            .then(buffer => {
                this.audioAnalysis.playTrack()
                this.draw()
            })

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });


        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.camera.position.copy(
            new THREE.Vector3(
                557.153181054571,
                69.62344718375661,
                632.4264586923875
            )
        )

        this.sphereGeom = Geometries.CreateSphere(7)

        this.sphereMat = Materials.CreateShaderMaterial()

        for (let i = 0; i < this.numOfSpheresRow; i++) {
            for (let j = 0; j < this.numOfSpheresCol; j++) {

                let sphereMesh = new THREE.Mesh(
                    this.sphereGeom,
                    this.sphereMat
                )

                sphereMesh.position.x = (this.xDistance * i) + this.xOffset
                sphereMesh.position.z = (this.zDistance * j)

                this.sphereMeshArr.push(sphereMesh)

                this.scene.add(sphereMesh)
            }
        }


        this.gui = new ControlKitUi(this.props)
        this.gui.addListener("change", this.update.bind(this))


        this.controls = new OrbitControls( this.camera );



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

        const animate = () => {

            const timer = Date.now() * 0.00050

            this.light1.position.x = Math.cos(  timer ) * 250
            this.light1.position.z = Math.sin( timer ) * 250
            this.light2.position.y = Math.cos( timer * 1.25 ) * 250
            this.light2.position.z = Math.sin( timer * 1.25 ) * 250;

            if (this.sphereGeom) {
                this.sphereMat.uniforms.frequency.value = this.audioAnalysis.getFrequency
                this.sphereMat.uniforms.color.value = new THREE.Color(`rgb(${this.props.color[0]}, ${this.props.color[1]}, ${this.props.color[2]})`)
                this.sphereMat.uniforms.diffuse.value = new THREE.Color(`rgb(${this.props.color[0]}, ${this.props.color[1]}, ${this.props.color[2]})`)
            }
            this.sphereMeshArr.forEach(sphere => {
                sphere.rotation.x += this.audioAnalysis.getFrequency * 0.005;
                sphere.rotation.y += this.audioAnalysis.getFrequency * 0.005;
            })
            requestAnimationFrame(animate)
            this.renderer.render(this.scene, this.camera)
        }
        animate()
    }
}

export default Renderer;