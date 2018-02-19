import EventEmitter from "eventemitter3"
import * as THREE from "three";

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

}
