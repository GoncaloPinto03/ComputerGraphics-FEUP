attribute vec3 aPosition;
attribute vec3 aNormal;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;

void main(void) {
    float windStrength = 0.1; // Adjust this value to control the wind effect
    float waveFrequency = 10.0; // Adjust this value to control the wave frequency
    float randomness = fract(sin(dot(aPosition.xy, vec2(12.9898, 78.233))) * 43758.5453);
    vec3 displacedPosition = aPosition;
    displacedPosition.x += sin(displacedPosition.y * waveFrequency + uTime + randomness) * windStrength;

    vPosition = displacedPosition;
    vNormal = aNormal;
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(displacedPosition, 1.0);
}
