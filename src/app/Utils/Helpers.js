import * as THREE from 'three'

export default class Helpers {

    static addLightSphere({light, color}) {
        const sphere = new THREE.Mesh( new THREE.SphereGeometry( 2, 16, 16 ), new THREE.MeshBasicMaterial( { color: color } ) )
        light.add(sphere)
    }

    static getPositionAsVector(obj) {
        const pos = new THREE.Vector3();
        pos.copy( obj.object.position );
        return pos;
    }

}