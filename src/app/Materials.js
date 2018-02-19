import EventEmitter from "eventemitter3"
import * as THREE from "three";

export default class Materials extends EventEmitter {

    static CreateBasicMaterial(color = 0xffff00) {
        return new THREE.MeshBasicMaterial( {color: color} );
    }

    static CreateWireframeMaterial(color = 0xffffff, lineWidth = 1) {
        return new THREE.LineBasicMaterial( {
            color: color,
            linewidth: lineWidth,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin:  'round' //ignored by WebGLRenderer
        } );
    }

}
