import EventEmitter from "eventemitter3"
import * as THREE from "three";

export default class Geometries extends EventEmitter {

    static CreateSphere(radius = 5, width = 32, height = 32) {
        return new THREE.SphereGeometry(radius, width, height)
    }

}
