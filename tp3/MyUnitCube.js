import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,	//0 - BFL -> Bottom Front Left
			0.5, -0.5, 0.5,	    //1 - BFR
			-0.5, 0.5, 0.5,	    //2 - TPF
            0.5, 0.5, 0.5,	    //3 - TPR
            -0.5, -0.5, -0.5,	//4 - BBL
			0.5, -0.5, -0.5,	//5 - BBR
			-0.5, 0.5, -0.5,	//6 - TPL
            0.5, 0.5, -0.5,	    //7 - TPR
			-0.5, -0.5, 0.5,	//0 - BFL -> Bottom Front Left
			0.5, -0.5, 0.5,	    //1 - BFR
			-0.5, 0.5, 0.5,	    //2 - TPF
            0.5, 0.5, 0.5,	    //3 - TPR
            -0.5, -0.5, -0.5,	//4 - BBL
			0.5, -0.5, -0.5,	//5 - BBR
			-0.5, 0.5, -0.5,	//6 - TPL
            0.5, 0.5, -0.5,	    //7 - TPR
			-0.5, -0.5, 0.5,	//0 - BFL -> Bottom Front Left
			0.5, -0.5, 0.5,	    //1 - BFR
			-0.5, 0.5, 0.5,	    //2 - TPF
            0.5, 0.5, 0.5,	    //3 - TPR
            -0.5, -0.5, -0.5,	//4 - BBL
			0.5, -0.5, -0.5,	//5 - BBR
			-0.5, 0.5, -0.5,	//6 - TPL
            0.5, 0.5, -0.5	    //7 - TPR
		];

		this.normals = [
			0, 0, -1,			//0
            0, 0, 1,			//1
            0, 0, 1,			//2
            0, 0, -1,			//3
            0, 0, -1,			//4
            0, 0, 1,			//5
            0, 0, 1,			//6
            0, 0, -1,			//7
			0, -1, 0,			//0
            0, 1, 0,			//1
            0, 1, 0,			//2
            0, -1, 0,			//3
            0, -1, 0,			//4
            0, 1, 0,			//5
            0, 1, 0,			//6
            0, -1, 0,			//7
			-1, 0, 0,			//0
            1, 0, 0,			//1
            1, 0, 0,			//2
            -1, 0, 0,			//3
            -1, 0, 0,			//4
            1, 0, 0,			//5
            1, 0, 0,			//6
            -1, 0, 0,			//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [

			2, 3, 6,
			7, 6, 3,

			5, 1, 0,
			4, 5, 0,

			1, 5, 3,
			7, 3, 5,

			2, 4, 0,
			4, 2, 6,

			3, 2, 0,
			1, 3, 0,

			5, 4, 7,
			6, 7, 4

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}