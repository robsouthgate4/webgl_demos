varying vec2 vUv;
uniform float frequency;

#pragma glslify: ease = require(glsl-easings/elastic-out)

void main() {
    vUv = uv;
    vec3 newPosition = position;
    float easing = ease(frequency * 0.03);
    newPosition.z *= (frequency * 0.03);
    gl_Position =  projectionMatrix *
                    modelViewMatrix *
                    vec4(position * (frequency * 0.01) * easing,1.0);
}