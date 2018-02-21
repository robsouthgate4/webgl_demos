import glslify from "glslify"
import createShader from "shader-reload"
import path from "path"

const shader = createShader({
    vertex: glslify('./test.vert'),
    fragment: glslify('./test.frag')
})

export default shader;