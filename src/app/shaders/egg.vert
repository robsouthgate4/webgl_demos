varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
uniform float frequency;
uniform float time;


#pragma glslify: ease = require(glsl-easings/elastic-out)

void main() {

    vUv = uv;
    vNormal = normalMatrix * normal;
    vPos = (modelMatrix * vec4(position, 1.0 )).xyz;

    float easing = ease(frequency * 0.03);

    vec3 newPosition = position + normal * (vec3( 1.0 ) * max(0., sin(time / 150.)));



    //vec3 newPosition = position;

    gl_Position =   projectionMatrix *
                    modelViewMatrix *
                    vec4(newPosition, 1.0);


}