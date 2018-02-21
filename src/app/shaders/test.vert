varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
uniform float frequency;


#pragma glslify: ease = require(glsl-easings/elastic-out)

void main() {
    vec3 newPosition = position;

    vUv = uv;
    vNormal = normalMatrix * normal;
    vPos = (modelMatrix * vec4(position, 1.0 )).xyz;

    float easing = ease(frequency * 0.03);

    gl_Position =  projectionMatrix *
                    modelViewMatrix *
                    vec4(newPosition * (frequency * 0.01) * easing, 1.0);


}