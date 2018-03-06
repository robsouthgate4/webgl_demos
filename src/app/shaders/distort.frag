

uniform vec3 color;
uniform sampler2D textureSampler;
uniform float time;
uniform vec2 resolution;

varying vec2 vUv;
varying vec3 vNormal;
varying float distFromCenter;

void main() {

  // feed into our frag colour
  vec3 color1 = color;
  vec2 direction = vUv - 0.5;


/* v1 */
  color1 -= length(direction) - 0.9;

/* v2  */
  color1 -= length(direction) * 0.9;

  //vec3 image = texture2D(textureSampler, vUv).rgb;

  gl_FragColor = vec4(color1, 0.8);

}
