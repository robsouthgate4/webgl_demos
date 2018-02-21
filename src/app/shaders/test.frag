varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
uniform vec3 color;
uniform float frequency;

struct PointLight {
    vec3 position;
    vec3 color;
};

struct DirectionalLight {
    vec3 position;
    vec3 color;
};

uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

vec2 hash2( vec2 p ){
    // procedural white noise
  return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

vec3 voronoi( in vec2 x ){
    vec2 n = floor(x);
    vec2 f = fract(x);

    //----------------------------------
    // first pass: regular voronoi
    //----------------------------------
  vec2 mg, mr;

    float md = 8.0;
    for( int j=-1; j<=1; j++ )
    for( int i=-1; i<=1; i++ )
    {
        vec2 g = vec2(float(i),float(j));
        vec2 o = hash2( n + g );
        vec2 r = g + o - f;
        float d = dot(r,r);

        if( d<md )
        {
            md = d;
            mr = r;
            mg = g;
        }
    }

    //----------------------------------
    // second pass: distance to borders
    //----------------------------------
    md = 8.0;
    for( int j=-2; j<=2; j++ )
    for( int i=-2; i<=2; i++ )
    {
        vec2 g = mg + vec2(float(i),float(j));
        vec2 o = hash2( n + g );
        vec2 r = g + o - f;

        if( dot(mr-r,mr-r)>0.00001 )
        md = min( md, dot( 0.5*(mr+r), normalize(r-mr) ) );
    }

    return vec3( md, mr );
}

void main() {

    vec4 addedLights = vec4(0.0,0.0,0.0, 1.0);
    vec3 newColour = color;

    newColour.b *= frequency;

    for (int i = 0; i < NUM_POINT_LIGHTS; i++ ) {
        vec3 lightDirection = normalize(vPos - pointLights[i].position);
        addedLights.rgb += clamp(dot(-lightDirection, vNormal), 0.0, 1.0) * pointLights[i].color;
    }

    vec3 c = voronoi( 8.0*(vUv*vec2(20.)) );
    vec3 col = mix( vec3(0.0), addedLights.rgb, smoothstep( 0.85, (0.85), c.x ) );

    vec4 colorWithLight = mix(vec4(color.x, color.y, color.z, 1.0), addedLights, addedLights);

    gl_FragColor = colorWithLight + vec4(col, 1.0);

}