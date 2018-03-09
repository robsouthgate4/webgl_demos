

uniform vec3 color;
uniform vec3 color2;
uniform sampler2D textureSampler;
uniform float time;
uniform vec2 resolution;

varying vec2 vUv;
varying vec3 vNormal;
varying float distFromCenter;
varying vec3 vPos;

void main() {

    // feed into our frag colour
    vec3 color1 = color;
    vec3 color2 = color2;
    vec2 direction = vUv - 0.5;

    vec2 st = vUv;

    vec3 colorInBetween = mix(color1, color2, vec3(vPos.x + sin(time / 50.)));

    vec3 image = texture2D(textureSampler, vUv).rgb;

    gl_FragColor = vec4(colorInBetween, 1.0);

}
