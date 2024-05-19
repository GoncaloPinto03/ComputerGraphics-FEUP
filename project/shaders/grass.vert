attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float timeFactor;

void main() {
    float windEffect = sin(timeFactor * 4.0 + aVertexPosition.y * 2.0) * 0.25 * (aVertexPosition.y / 2.0);
    vec3 offset = vec3(0, 0, windEffect);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
