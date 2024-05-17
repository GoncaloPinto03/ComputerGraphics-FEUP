import { CGFobject } from "../lib/CGF.js";

export class MyLeaf extends CGFobject {
    constructor(scene) {
		super(scene);
        this.maxValue = 8;
        this.minValue = 5;
        this.angle = Math.PI / (Math.floor(Math.random() * (this.maxValue - this.minValue + 1)) + this.maxValue);
		this.initBuffers();
		this.initBuffers();
	}

    getAngle() {
        return this.angle;
    }

    initBuffers() {
        this.vertices = [
            -1, 1, 0,	//0
            -1, -1, 0,	//1
            1, -1, 0,	//2
            -1, 1, 0,	//3
            -1, -1, 0,	//4
            1, -1, 0,	//5
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            2, 0, 1,
            1, 0, 2,
            4, 3, 5,
        ];

        this.normals = [
			0, 0, 1,
			0, 0, 1,
            0, 0, 1,
            0, 0, -1,
			0, 0, -1,
            0, 0, -1
		]

        this.texCoords = [
            0, 0.5,
            0, 1,
            0.5, 1,
            0, 0.5,
            0, 1,
            0.5, 1,            
        ]

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}