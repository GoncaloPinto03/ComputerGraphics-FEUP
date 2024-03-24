import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        const angle = 2 * Math.PI / this.slices;
        let index = 0;

        for (let i = 0; i < this.slices; i++) {
            // xi and yi represent the coords of the first vertice
            // xf and yf represent the coords of the next vertice
            let xi = Math.cos(i * angle);
            let yi = Math.sin(i * angle);
            let xf = Math.cos((i+1) * angle);
            let yf = Math.sin((i+1) * angle);

            const incrementZ = 1 / this.stacks;

            for (let j = 0; j < this.stacks; j++) {
                // x and y values change across the same stack and the z value change across the stacks
                let zi = incrementZ * j;
                let zf = incrementZ * (j+1);
                this.vertices.push(
                    xi, yi, zi,     // these first 2 vertices belong to the same stack (they represent the beginning of two different slices)
                    xf, yf, zi,
                    xi, yi, zf,     // these 2 vertices belong to the next stack (change of the z value from the previous stack to the current one)
                    xf, yf, zf
                );
                
                this.indices.push(
                    index+2, index, index+1,
                    index+1, index+3, index+2
                );

                let x = Math.cos((i+0.5) * angle);
                let y = Math.sin((i+0.5) * angle);
                let size = Math.sqrt(x*x + y*y);

                this.normals.push(
                    x/size, y/size, 0, 
                    x/size, y/size, 0, 
                    x/size, y/size, 0, 
                    x/size, y/size, 0
                );

                index += 4;   // pattern
            }
        }

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
    updateBuffers(complexity){
    }
}
