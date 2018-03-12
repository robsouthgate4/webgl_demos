

uniform vec3 color;
uniform vec3 color2;
uniform sampler2D textureSampler;
uniform float time;
uniform vec2 resolution;

varying vec3 vWorldPosition;
uniform vec3 lightPosition;


varying vec2 vUv;
varying vec3 vNormal;
varying float distFromCenter;
varying vec3 vPos;
varying vec4 worldPosition;

uniform float mouseY;
uniform float mouseX;

#pragma glslify: cnoise3 = require("glsl-noise/classic/3d")
#pragma glslify: ease = require(glsl-easings/sine-out)

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

    //st -= time / 50.;

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
            (c - a) * u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {


    vec3 lightDirection = normalize(lightPosition - vWorldPosition) * color2;

    vec3 outGoingLight = vec3(1.0);

     float c = 0.35 + max(0.0, dot(vNormal, lightDirection)) * 0.9;

    // feed into our frag colour
    vec3 color1 = color;
    vec3 color2 = color2;
    vec2 direction = vUv - 0.5;

    vec2 pos = vec2(vPos.xy);
    vec3 cnoisePos = vPos;

    // Use the noise function
    float n = noise(pos);
    float n3 = cnoise3(cnoisePos);

    //vec3 colorInBetween = mix(color1, color2, vec3(vPos.x + sin(time / 50.)));

    vec3 colorInBetween = mix(color1, color2, vec3(vPos.y));

    colorInBetween += smoothstep(0.02, .5, cnoise3(vPos.xyz * 8. * ((time / 10000.)) * reMap(mouseY, 0.0, 1.0, 0.1, 1.0)) * 50.);

    vec3 image = texture2D(textureSampler, vPos.xy).rgb;

    vec3 color = color1 + cos(vPos.y * 100.);

    gl_FragColor = vec4(colorInBetween, reMap(mouseX, 0.0, 1.0, 0.6, 1.0));

}
