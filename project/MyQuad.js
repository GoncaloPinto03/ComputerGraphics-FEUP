import { CGFobject } from '../lib/CGF.js';

export class MyQuad extends CGFobject {
    constructor(scene, width, height) {
        super(scene);
        this.width = width;
        this.height = height;
        this.initBuffers();
    }

    initBuffers() {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;

        this.vertices = [
            halfWidth, -halfHeight, 0,   //0 
            halfWidth, halfHeight, 0,    //1
            -halfWidth, halfHeight, 0,   //2
            -halfWidth, -halfHeight, 0,  //3
        ];

        // Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,
            0, 2, 3,
            3, 2, 0,
            2, 1, 0
        ];

        this.texCoords = [
			0, 1,
			0, 0,
			1, 0,
			1, 1
		];

        // The defined indices (and corresponding vertices)
        // will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}
