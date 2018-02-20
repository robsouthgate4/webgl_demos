
uniform vec3 color;
uniform float frequency;
varying vec2 vUv;

void main() {
    vec3 newColour = color;
    newColour.b *= frequency;
    gl_FragColor = vec4(newColour, 0.1);
}