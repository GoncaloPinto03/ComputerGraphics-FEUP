import { CGFobject } from '../lib/CGF.js';

export class MyPollen extends CGFobject {
    constructor(scene, slices, stacks, radius, scaleYTop, scaleYBottom) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.scaleYTop = scaleYTop; // Factor de escala em YY para o hemisfério superior
        this.scaleYBottom = scaleYBottom; // Factor de escala em YY para o hemisfério inferior
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var alpha = 2 * Math.PI / this.slices;
        var beta = Math.PI / this.stacks;
        
        for (var latitude = 0; latitude <= this.stacks; latitude++) {
            for (var longitude = 0; longitude <= this.slices; longitude++) {
                let x = this.radius * Math.cos(longitude * alpha) * Math.sin(beta * latitude);
                let y = this.radius * Math.cos(beta * latitude);
                let z = this.radius * Math.sin(longitude * alpha) * Math.sin(beta * latitude);
                
                let scaleY = 1; // Fator de escala em YY inicializado como 1
                
                // Aplicar fator de escala diferente para o hemisfério superior e inferior
                if (latitude > this.stacks / 2) {
                    scaleY = this.scaleYBottom;
                } else {
                    scaleY = this.scaleYTop;
                }
                            
                this.vertices.push(z, y * scaleY, x);
                this.normals.push(x, y, z);
                
                this.texCoords.push(
                    longitude / this.slices,
                    latitude / this.stacks
                );
            }
        }

        for (var latitude = 0; latitude < this.stacks; latitude++) {
            for (var longitude = 0; longitude < this.slices; longitude++) {
                let a = latitude * (this.slices + 1) + longitude;
                let b = a + this.slices + 1;
                 
                if (this.pan) {
                    this.indices.push(b, a + 1, a);
                    this.indices.push(b + 1, a + 1, b);
                } else {
                    this.indices.push(a, b, a + 1);
                    this.indices.push(b, b + 1, a + 1);
                }       
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity) {
        this.slices = complexity * 2;

        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
