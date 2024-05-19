#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;

void main() {

    gl_FragColor = vec4(0.1, 0.8, 0.1, 1.0);
}