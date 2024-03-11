<<<<<<< HEAD
import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			1, 0, 0,	//1
			0, 1, 0	    //2
=======
import { CGFobject } from "../lib/CGF.js";

export class MyTriangleSmall extends CGFobject {
    constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
		    1, 0, 0,	//1
			0, 1, 0, 	//2
			-1, 0, 0,	//3
		    1, 0, 0,	//4
			0, 1, 0 	//5
>>>>>>> master
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
<<<<<<< HEAD
            2, 1, 0
=======
			3, 4, 5
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
>>>>>>> master
		];

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
