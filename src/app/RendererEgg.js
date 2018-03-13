import * as THREE from 'three';
import EventEmitter from "eventemitter3"
const OrbitControls = require('three-orbit-controls')(THREE)
const TrackballControls = require('three-trackballcontrols')
const OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

import {TweenMax, Power2, TweenLite} from "gsap";

import eggObj from '../objects/egg.obj'

import Geometries from "./Geometries"
import Materials from "./Materials"
import ControlKitUi from "./Utils/ControlKitUi"
import img from './images/bricks.jpg'
import Helpers from './Utils/Helpers'

import TessellateModifier from './Modifiers/TessellateModifier'
import ExplodeModifier from './Modifiers/ExplodeModifier'

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

        this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
        this.scene.add(this.directionalLight)

        this.pointLight = new THREE.PointLight(0xFFFFFF, 1.0, 1.0, 0.0);
        this.scene.add(this.pointLight);

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        var position = { x : 0, y: 0, z: -1 };
        var target = { x : 400, y: 50, z: 5 };

        this.camera.position.copy(
            new THREE.Vector3(
                position.x,
                position.y,
                position.z
            )
        )

        this.gui = new ControlKitUi(this.props)
        this.gui.addListener("change", this.update.bind(this))

        if (this.props.orbitControls) {
            this.controls = new OrbitControls( this.camera )
        }

        

        this.eggMaterial = Materials.CreateEggMaterial()

        this.eggGroup = new THREE.Object3D()
        this.eggMesh =  new THREE.Mesh()


        this.loadEgg()
            .then((object) => {

                TweenLite.to(position, 5, {
                    z: target.z,
                    ease: Power4.easeInOut,
                    onUpdate: () => {
                        this.camera.position.copy(
                            new THREE.Vector3(
                                position.x,
                                position.y,
                                position.z
                            )
                        )
                    },
                    onComplete: () => {

                    }
                })

                object.traverse( (child) => {
                    if (child.material) {
                        child.material.side = THREE.DoubleSide
                    }
                    if (child instanceof THREE.Mesh) {

                        const baseGeometry = new THREE.Geometry().fromBufferGeometry( child.geometry );

                        baseGeometry.center();

                        var tessellateModifier = new TessellateModifier( 20 )

                        baseGeometry.faceVertexUvs[0] = []

                        baseGeometry.faces.forEach(function(face) {

                            var components = ['x', 'y', 'z'].sort(function(a, b) {
                                return Math.abs(face.normal[a]) > Math.abs(face.normal[b]);
                            });

                            var v1 = baseGeometry.vertices[face.a];
                            var v2 = baseGeometry.vertices[face.b];
                            var v3 = baseGeometry.vertices[face.c];

                            baseGeometry.faceVertexUvs[0].push([
                                new THREE.Vector2(v1[components[0]], v1[components[1]]),
                                new THREE.Vector2(v2[components[0]], v2[components[1]]),
                                new THREE.Vector2(v3[components[0]], v3[components[1]])
                            ]);

                        });

                        baseGeometry.uvsNeedUpdate = true

                        for ( var i = 0; i < 6; i ++ ) {
                            tessellateModifier.modify( baseGeometry );
                        }

                        const explodeModifier = new ExplodeModifier();
                        explodeModifier.modify( baseGeometry );

                        const numFaces = baseGeometry.faces.length;

                        const colors = new Float32Array( numFaces * 3 * 3 );
                        const displacement = new Float32Array( numFaces * 3 * 3 );

                        var color = new THREE.Color();

                        for ( var f = 0; f < numFaces; f ++ ) {

                            var index = 9 * f;

                            var h = 0.2 * Math.random();
                            var s = 0.5 + 0.5 * Math.random();
                            var l = 0.5 + 0.5 * Math.random();

                            color.setHSL( h, s, l );

                            var d = 10 * ( 0.5 - Math.random() );

                            for ( var i = 0; i < 3; i ++ ) {

                                colors[ index + ( 3 * i )     ] = color.r;
                                colors[ index + ( 3 * i ) + 1 ] = color.g;
                                colors[ index + ( 3 * i ) + 2 ] = color.b;

                                displacement[ index + ( 3 * i )     ] = d;
                                displacement[ index + ( 3 * i ) + 1 ] = d;
                                displacement[ index + ( 3 * i ) + 2 ] = d;

                            }

                        }

                        const geometry = new THREE.BufferGeometry().fromGeometry( baseGeometry );

                        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
                        geometry.addAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );

                        //here in child the geometry and material are available
                        this.eggMesh = new THREE.Mesh( geometry, this.eggMaterial)
                        this.eggMesh.castShadow = true
                        this.eggMesh.receiveShadow = true
                        this.eggGroup.add(this.eggMesh)
                    }
                });

                this.eggGroup.position.z = 0;

                this.scene.add(this.eggGroup)

                this.draw()

            })

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

        let time = 0


        const animate = () => {

            const timer = Date.now() * 0.00050

            time += 1;

            this.eggMesh.rotation.y += 0.002

            this.eggMaterial.uniforms.mouseX.value = this.props.mouseX
            this.eggMaterial.uniforms.mouseY.value = this.props.mouseY
            this.eggMaterial.uniforms.time.value = time
            this.eggMaterial.uniforms.amplitude.value = 1.0
            this.eggMaterial.uniforms.wind.value = this.props.wind
            this.eggMaterial.uniforms.brickTile.value = this.props.brickTile
            this.eggMaterial.uniforms.splitEgg.value = this.props.splitEgg
            this.eggMaterial.uniforms.transparency.value = this.props.transparency
            this.eggMaterial.uniforms.wave.value = this.props.wave
            this.eggMaterial.uniforms.color.value = new THREE.Color(`rgb(${this.props.color[0]}, ${this.props.color[1]}, ${this.props.color[2]})`)
            this.eggMaterial.uniforms.color2.value = new THREE.Color(`rgb(${this.props.color2[0]}, ${this.props.color2[1]}, ${this.props.color2[2]})`)


            requestAnimationFrame(animate)
            this.renderer.render(this.scene, this.camera)
        }
        animate()
    }
}
