import { CGFobject } from "../lib/CGF.js";

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, textureTop, textureBottom, textureSide) {
        super(scene);
        this.slices = slices; // Number of slices
        this.stacks = stacks; // Number of stacks
        this.textureTop = textureTop;
        this.textureBottom = textureBottom;
        this.textureSide = textureSide;
        this.initBuffers(); // Initialize buffers
    }
    
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const convexCurve = (z) => Math.sin(z * Math.PI/2); // Example convex curve function

        for (let i = 0; i <= this.slices; i++) {
            for (let j = 0; j <= this.stacks; j++) {
                let theta = (i / this.slices) * (2 * Math.PI);
                let x = Math.cos(theta);
                let y = Math.sin(theta);
                let z = (j / this.stacks) * 2 - 1;

                // let dx = (Math.random() - 0.5) * maxDisplacement;
                // let dy = (Math.random() - 0.5) * maxDisplacement;

                // x += dx;
                // y += dy;
                z = z * convexCurve(z);


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

        // Initialize WebGL buffers
        this.initGLBuffers();
    }
}
