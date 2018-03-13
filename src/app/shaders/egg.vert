varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec4 worldPosition;
varying vec3 vWorldPosition;
varying vec3 pos;

uniform float frequency;
uniform float time;
uniform float mouseX;
uniform float mouseY;
uniform bool splitEgg;
uniform float amplitude;

attribute vec3 customColor;
attribute vec3 displacement;

#pragma glslify: ease = require(glsl-easings/elastic-out)

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float reMap (float value, float in_min, float in_max, float out_min, float out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
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

    float y;
    float x = 0.1;
    float amplitude = 0.5;
    float frequency = 100.;
    y = sin(x * frequency);
    float t = 0.01*(-time*0.5);
    y += sin(x*frequency*2.1 + t)*4.5;
    y += sin(x*frequency*1.72 + t*1.121)*4.0;
    y += sin(x*frequency*2.221 + t*0.437)*5.0;
    y += sin(x*frequency*3.1122+ t*4.269)*2.5;
    y *= amplitude*0.06;

    pos = position * reMap(y, 0., 1., 0.8, 1.);

    vec3 newPosition = position + normal * (amplitude * mouseY) * displacement;

    if (splitEgg) {
        //vPos = position + normal * (amplitude * sin(time * 0.005)) * displacement * 0.2;
        vPos = position + normal * (amplitude * mouseY) * displacement;
    } else {
        vPos = position + y;
    }

    vNormal = normalMatrix * vec3(normal + normalize(offset) * 0.2);

    // The world poisition of your vertex: NO CAMERA
    worldPosition = modelMatrix * vec4(vPos, 1.0);

    vWorldPosition = worldPosition.xyz;
    float easing = ease(frequency * 0.03);

//    gl_Position =  projectionMatrix *
//                    viewMatrix *
//                    worldPosition;

      gl_Position =  projectionMatrix *
                          modelViewMatrix *
                          vec4( vPos, 1.0 );


}