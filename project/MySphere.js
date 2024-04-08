import {CGFobject} from '../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];


        var alpha = 2*Math.PI/this.slices;
        var beta = Math.PI/this.stacks;
        
        for(var lat = 0; lat <= this.stacks; lat++){
            for(var long = 0; long <= this.slices; long++){
                let theta = long * alpha;

                let x = this.radius * Math.cos(theta) * Math.sin(beta*lat);
                let y = this.radius * Math.cos(beta*lat);
                let z = this.radius * Math.sin(theta) * Math.sin(beta*lat);

                this.vertices.push(z, y, x);
                this.normals.push(x, y, z);
                
                this.texCoords.push(long/this.slices, lat/this.stacks);
            }
        }

        for(var lat = 0; lat < this.stacks; lat++){
            for(var long = 0; long < this.slices; long++){
                let first = (lat * (this.slices + 1)) + long;
                let second = first + this.slices + 1;
          
                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);                
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = complexity*2; //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    
}