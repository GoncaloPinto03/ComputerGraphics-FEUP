<<<<<<< HEAD
import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 1, 0,	//0
			-1, -1, 0,	//1
			1, -1, 0	//2
		];

		this.normals = [
			
=======
import { CGFobject } from "../lib/CGF.js";

export class MyTriangle extends CGFobject {
    constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    initBuffers() {
		this.vertices = [
			-1, 1, 0,	//0
			-1, -1, 0,	//1
			1, -1, 0,	//2
			-1, 1, 0,	//3
			-1, -1, 0,	//4
			1, -1, 0	//5
>>>>>>> master
		];

		//Counter-clockwise reference of vertices
		this.indices = [
<<<<<<< HEAD
			0, 1, 2
=======
			0, 1, 2,
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
