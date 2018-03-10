import EventEmitter from "eventemitter3"
import * as THREE from "three"
import img from './images/water.jpg'
const hmr = require('../lib/three-hmr')
const cache = hmr.cache(__filename);

const glslify = require('glslify')

// const fragmentShader = glslify('./shaders/test.frag')
// const vertexShader = glslify('./shaders/test.vert')
//
// const fragmentShaderDistort = glslify('./shaders/distort.frag')
// const vertexShaderDistort = glslify('./shaders/distort.vert')

const fragmentShaderEgg = glslify('./shaders/egg.frag')
const vertexShaderEgg = glslify('./shaders/egg.vert')

if (module.hot) {
    module.hot.accept(err => {
        if (err) throw errr
    })

    hmr.update(cache, {
        vertexShader: vertexShaderEgg,
        fragmentShader: fragmentShaderEgg
    })
}

export default class Materials extends EventEmitter {

    constructor() {
        super()
    }

    static CreateBasicMaterial(color = 0xffff00) {
        return new THREE.MeshBasicMaterial( {color: color} );
    }

    static CreateWireframeMaterial(color = [255, 255, 255], lineWidth = 1) {
        return new THREE.MeshBasicMaterial({
            color: new THREE.Color(`rgb(${color[0]},${color[1]},${color[2]})`),
            wireframe: true
        });
    }

    static CreateEggMaterial() {

        const texture = THREE.ImageUtils.loadTexture(img, undefined,);

        const material = new THREE.ShaderMaterial(
            {
                uniforms:{
                    wind: { type: 'f', value: 0.0 },
                    textureSampler: { type: "t", value: texture },
                    diffuse: {type: 'c', value: new THREE.Color()},
                    amount: {type: 'f', value: 20.0},
                    time: { value: 1.0 },
                    color: {value: new THREE.Color()},
                    color2: {value: new THREE.Color()},
                    frequency: {value: 0.0, type: 'f'},
                    mRefractionRatio: { type: "f", value: 1.02 },
                    mFresnelBias: { type: "f", value: 0.1 },
                    mFresnelPower: { type: "f", value: 2.0 },
                    mFresnelScale: { type: "f", value: 1.0 },
                    tCube: { type: "t", value: null },
                    mouseX: { type: "f", value: 0.0 },
                    mouseY: { type: "f", value: 0.0 }
                },
                transparent: true,
                vertexShader: vertexShaderEgg,
                fragmentShader: fragmentShaderEgg
            }
        )

        material.side = THREE.DoubleSide;

        hmr.enable(cache, material)
        return material

    }

    static CreateDistortionMaterial() {

        const texture = THREE.ImageUtils.loadTexture(img, undefined,);

        const material = new THREE.ShaderMaterial(
            {
                uniforms:{
                    wind: { type: 'f', value: 0.0 },
                    textureSampler: { type: "t", value: texture },
                    diffuse: {type: 'c', value: new THREE.Color()},
                    amount: {type: 'f', value: 20.0},
                    time: { value: 1.0 },
                    resolution: { value: new THREE.Vector2() },
                    color: {value: new THREE.Color()},
                    frequency: {value: 0.0, type: 'f'}
                },
                transparent: true,
                vertexShader: vertexShaderDistort,
                fragmentShader: fragmentShaderDistort
            }
        )


        hmr.enable(cache, material)
        return material

    }

    static CreateShaderMaterial() {

        const material = new THREE.ShaderMaterial(
            {
                uniforms: THREE.UniformsUtils.merge(
                    [THREE.UniformsLib['lights'],
                        {
                            diffuse: {type: 'c', value: new THREE.Color()},
                            amount: {type: 'f', value: 20.0},
                            time: { value: 1.0 },
                            resolution: { value: new THREE.Vector2() },
                            color: {value: new THREE.Color()},
                            frequency: {value: 0.0, type: 'f'}
                        }
                    ]
                ),
                lights: true,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader
            }
        )

        hmr.enable(cache, material)
        return material

    }

}
