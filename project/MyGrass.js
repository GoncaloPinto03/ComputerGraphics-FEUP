import { CGFobject, CGFshader } from "../lib/CGF.js";

export class MyGrass extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.initShaders();
    }

    initBuffers() {
        // Define the vertices for the grass blades
        this.vertices = [
            // Triangle 1
            0, 0, 0,
            0.1, 0, 0,
            0.05, 0.5, 0,
            // Triangle 2 (making it a double-sided blade)
            0, 0, 0,
            0.1, 0, 0,
            0.05, 0.5, 0
        ];

        // Define indices
        this.indices = [
            0, 1, 2,
            3, 4, 5
        ];

        // Define normals
        this.normals = [
            // Triangle 1
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            // Triangle 2
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];

        // Define texture coordinates
        this.texCoords = [
            0, 0,
            1, 0,
            0.5, 1,
            0, 0,
            1, 0,
            0.5, 1
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    initShaders() {
        // Vertex shader
        this.vertexShader = `
            attribute vec3 position;
            attribute vec3 normal;
            attribute vec2 texCoord;

            uniform mat4 projectionMatrix;
            uniform mat4 viewMatrix;
            uniform mat4 modelMatrix;

            varying vec3 fragNormal;
            varying vec2 fragTexCoord;

            void main(void) {
                fragNormal = normal;
                fragTexCoord = texCoord;

                gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
            }
        `;

        // Fragment shader
        this.fragmentShader = `
            precision mediump float;

            varying vec3 fragNormal;
            varying vec2 fragTexCoord;

            void main(void) {
                gl_FragColor = vec4(fragTexCoord, 1.0, 1.0);
            }
        `;

        // Compile shaders
        this.shaderProgram = new CGFshader(this.scene.gl, this.vertexShader, this.fragmentShader);
    }

    display() {
        this.scene.setActiveShader(this.shaderProgram);
        super.display();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
