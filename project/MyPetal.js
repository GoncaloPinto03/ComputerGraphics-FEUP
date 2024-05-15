import { CGFobject } from "../lib/CGF.js";

export class MyPetal extends CGFobject {
    constructor(scene) {    // add rotation angle
		super(scene);
        this.maxValue = 12;
        this.minValue = 4;
        this.angle = Math.PI / Math.floor(this.minValue + Math.random() * (this.maxValue - this.minValue));
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