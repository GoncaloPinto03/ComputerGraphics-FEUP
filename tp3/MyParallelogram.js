<<<<<<< HEAD
import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			2, 0, 0,	//1
			3, 1, 0,	//2
            1, 1, 0     //3
=======
import { CGFobject } from "../lib/CGF.js";

export class MyParallelogram extends CGFobject {
    constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
		    2, 0, 0,	//1
			3, 1, 0,	//2
			1, 1, 0,	//3
			0, 0, 0,	//4
		    2, 0, 0,	//5
			3, 1, 0,	//6
			1, 1, 0 	//7
>>>>>>> master
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
<<<<<<< HEAD
            0, 2, 3,
            3, 2, 0,
            2, 1, 0
		];

=======
			2, 3, 0,
			6, 5, 4,
			7, 6, 4
		];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
        ];

>>>>>>> master
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
<<<<<<< HEAD
}

=======
}
>>>>>>> master
