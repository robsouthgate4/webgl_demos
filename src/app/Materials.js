import EventEmitter from "eventemitter3"
import * as THREE from "three"
import glslify from "glslify"

export default class Materials extends EventEmitter {

    static CreateBasicMaterial(color = 0xffff00) {
        return new THREE.MeshBasicMaterial( {color: color} );
    }

    static CreateWireframeMaterial(color = [255, 255, 255], lineWidth = 1) {
        return new THREE.MeshBasicMaterial({
            color: new THREE.Color(`rgb(${color[0]},${color[1]},${color[2]})`),
            wireframe: true
        });
    }

    static CreateShaderMaterial({frag, vert}) {

        return new THREE.ShaderMaterial(
            {
                uniforms: {
                    time: { value: 1.0 },
                    resolution: { value: new THREE.Vector2() },
                    color: {value: new THREE.Color()},
                    frequency: {value: 0.0, type: 'f'}
                },
                vertexShader: vert,
                fragmentShader: frag
            }
        )

    }

}
