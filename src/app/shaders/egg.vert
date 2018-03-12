varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec4 worldPosition;
varying vec3 vWorldPosition;

uniform float frequency;
uniform float time;



#pragma glslify: ease = require(glsl-easings/elastic-out)

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);

    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {

    vUv = uv;

    vNormal = normalMatrix * normal;

    vPos = (modelMatrix * vec4(position, 1.0 )).xyz;

    float n = noise(vPos.xy);

     vec3 offset = vec3(
        sin(position.x * 1.0 + time / 50.) * 1.0,
        sin(position.y * 1.0 + time / 50. + 11.512) * 1.0,
        sin(position.z * 1.0 + time / 50. + 52.512) * 1.0
    );

    vec3 pos = position + offset;

    //vNormal = normalMatrix * vec3(normal + normalize(offset) * 0.2);

    // The world poisition of your vertex: NO CAMERA
    worldPosition = modelMatrix * vec4(position, 1.0);

    vWorldPosition = worldPosition.xyz;

    float easing = ease(frequency * 0.03);

    gl_Position =  projectionMatrix *
                    viewMatrix *
                    worldPosition;


}