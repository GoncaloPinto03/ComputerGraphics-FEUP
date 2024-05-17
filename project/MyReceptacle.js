import {CGFobject} from '../lib/CGF.js';

export class MyReceptacle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.maxValue = 2.5;
        this.minValue = 1;
        this.radius = this.minValue + Math.random() * (this.maxValue - this.minValue);
        this.initBuffers();
    }

    getRadius() {
        return this.radius;
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
                
                this.vertices.push(z, y, x);
                this.normals.push(x, y, z);
                
                this.texCoords.push(
                    longitude/this.slices,
                    latitude/this.stacks);
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