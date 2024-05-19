import { CGFobject } from "../lib/CGF.js";

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, startVertices = null) {
        super(scene);
        this.slices = slices; // Number of slices
        this.stacks = stacks; // Number of stacks
        this.maxValue = 0.5;
        this.minValue = 0.2;
        this.startVertices = startVertices;
        this.initBuffers(); // Initialize buffers
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        let waveAmplitude = 0.3; // Amplitude of the wave
        let waveFrequency = 2.5;   // Frequency of the wave

        for (let i = 0; i <= this.slices; i++) {
            for (let j = 0; j <= this.stacks; j++) {
                let theta = (i / this.slices) * (2 * Math.PI);
                let x = Math.cos(theta);
                let y = Math.sin(theta);
                let z = (j / this.stacks);

                // Add curvature using a sine wave
                x += waveAmplitude * Math.sin(waveFrequency * z * Math.PI);
                y += waveAmplitude * Math.cos(waveFrequency * z * Math.PI);

                // Align the first ring of vertices with the last ring of the previous stem
                if (j == 0 && this.startVertices) {
                    x = this.startVertices[i * 3];
                    y = this.startVertices[i * 3 + 1];
                    z = this.startVertices[i * 3 + 2];
                }

                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0);

                // Calculate texture coordinates (u, v)
                let u = i / this.slices;
                let v = j / this.stacks;
                this.texCoords.push(u, v);
            }
        }

        for (let i = 0; i < this.slices; i++) {
            for (let j = 0; j < this.stacks; j++) {
                let index1 = i * (this.stacks + 1) + j;
                let index2 = index1 + this.stacks + 1;
                let index3 = index1 + 1;
                let index4 = index2 + 1;

                // Define indices for quadrilateral faces
                this.indices.push(index1, index2, index3);
                this.indices.push(index3, index2, index4);
            }
        }
        this.primitiveType = this.scene.gl.TRIANGLES;

        // Initialize WebGL buffers
        this.initGLBuffers();
    }

    getLastRingVertices() {
        let lastRingVertices = [];
        for (let i = 0; i <= this.slices; i++) {
            let index = this.vertices.length / 3 - (this.slices + 1 - i);
            lastRingVertices.push(this.vertices[index * 3], this.vertices[index * 3 + 1], this.vertices[index * 3 + 2]);
        }
        return lastRingVertices;
    }
}
