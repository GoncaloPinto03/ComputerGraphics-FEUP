precision mediump float;
varying vec3 vNormal;
varying vec3 vPosition;

void main(void) {
    vec3 lightDirection = normalize(vec3(0.0, 1.0, 1.0));
    float lightIntensity = max(dot(vNormal, lightDirection), 0.0);
    vec3 grassColor = vec3(0.0, 1.0, 0.0) * lightIntensity;

    gl_FragColor = vec4(grassColor, 1.0);
}
