attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float timeFactor;

void main() {
    float frequency = 3.0; 
    float amplitude = 0.2; 
    float normalizedHeight = aVertexPosition.y / 2.0;
    float swayAmount = sin(timeFactor * frequency + aVertexPosition.y * 2.0) * amplitude * normalizedHeight;
    vec3 offset = vec3(swayAmount, 0, 0);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
