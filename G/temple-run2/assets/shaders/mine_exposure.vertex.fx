precision highp float;

// Attributes
attribute vec3 position;

// Uniforms
uniform mat4 world;
uniform mat4 worldViewProjection;
// Varying
varying vec3 vPosition;

void main(void) {
    vPosition = vec3(world * vec4(position,1.0));
    gl_Position = worldViewProjection * vec4(position, 1.0);
}