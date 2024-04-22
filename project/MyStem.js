import { CGFobject } from '../lib/CGF.js';

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
        this.vertices = []; // Vertices array
        this.indices = []; // Indices array
        this.normals = []; // Normals array
        
        // Generate vertices and normals for each stack
        for (let z = 0 ; z <= this.stacks ; z += 1) {
            // Vertices at the bottom of the cylinder
            this.vertices.push(1, 0, z / this.stacks);
            this.normals.push(1, 0, 0);
        }

        // Generate vertices, normals, and indices for each slice and stack
        for (let i = 1 ; i <= this.slices ; i++) {

            let angle = 2 * Math.PI * i / this.slices;
            let x = Math.cos(angle);
            let y = Math.sin(angle);

            let vector_size = Math.sqrt(x * x + y * y);
            if (i != this.slices) {    
                // Vertices and normals for slices other than the last one
                this.vertices.push(
                    x, y, 0
                );
                this.normals.push(
                    x / vector_size, y / vector_size, 0
                );
            }

            for (let j = 1 ; j <= this.stacks ; j++) {
                
                if (i != this.slices) {

                    let z = j / this.stacks;
                    // Vertices and normals for slices other than the last one
                    this.vertices.push(x, y, z);
                    this.normals.push(x / vector_size, y / vector_size, 0);
                    
                    let points = this.vertices.length / 3;
                    let index3 = points - 2;
                    let index4 = points - 1;
                    let index2 = index4 - (this.stacks + 1);
                    let index1 = index2 - 1;
                    // Define indices for quadrilateral faces
                    this.indices.push(
                        index1, index3, index4, 
                        index1, index4, index2);

                } else {

                    let points = this.vertices.length / 3;
                
                    let index3 = j - 1;
                    let index4 = j;
                    let index2 = points - this.stacks - 1 + j;
                    let index1 = index2 - 1;
                    // Define indices for quadrilateral faces at the end of the cylinder
                    this.indices.push(
                        index1, index3, index4,
                        index1, index4, index2);
                }
            }
        }

        // Set primitive type for rendering
        this.primitiveType = this.scene.gl.TRIANGLES;
        // Initialize WebGL buffers
        this.initGLBuffers();
    }
}
