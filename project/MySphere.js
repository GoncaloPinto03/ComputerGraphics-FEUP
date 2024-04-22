import {CGFobject} from '../lib/CGF.js';

export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, radius, pan) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.pan = pan;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var alpha = 2*Math.PI/this.slices;
        var beta = Math.PI/this.stacks;
        
        for(var latitude = 0; latitude <= this.stacks; latitude++){
            for(var longitude = 0; longitude <= this.slices; longitude++){
                let x = this.radius * Math.cos(longitude * alpha) * Math.sin(beta*latitude);
                let y = this.radius * Math.cos(beta*latitude);
                let z = this.radius * Math.sin(longitude * alpha) * Math.sin(beta*latitude);
                
                if(this.pan){
                    this.vertices.push(x, y, z);
                    this.normals.push(-x, -y, -z);
                }
                else{
                    this.vertices.push(z, y, x);
                    this.normals.push(x, y, z);
                }
                this.texCoords.push(
                    longitude/this.slices,
                    latitude/this.stacks)
                ;
            }
        }

        for(var latitude = 0; latitude < this.stacks; latitude++){
            for(var longitude = 0; longitude < this.slices; longitude++){
                let a = (latitude * (this.slices + 1)) + longitude;
                let b = a + this.slices + 1;
                 
                if(this.pan){
                    this.indices.push(b, a + 1, a);
                    this.indices.push(b + 1, a + 1, b);

                }
                else{
                    this.indices.push(a, b, a + 1);
                    this.indices.push(b, b + 1, a + 1);
                }       
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    updateBuffers(complexity){
        this.slices = complexity*2;

        this.initBuffers();
        this.initNormalVizBuffers();
    }
    
}