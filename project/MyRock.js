import { CGFobject } from '../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, radius, noiseFactorX, noiseFactorY, noiseFactorZ) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.noiseFactorX = noiseFactorX;
        this.noiseFactorY = noiseFactorY;
        this.noiseFactorZ = noiseFactorZ;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const alpha = 2 * Math.PI / this.slices;
        const beta = Math.PI / this.stacks;

        for (let latitude = 0; latitude <= this.stacks; latitude++) {
            for (let longitude = 0; longitude <= this.slices; longitude++) {
                const x = this.radius * Math.cos(longitude * alpha) * Math.sin(beta * latitude);
                const y = this.radius * Math.cos(beta * latitude);
                const z = this.radius * Math.sin(longitude * alpha) * Math.sin(beta * latitude);

                const noiseFactor = 0.5;
                const noiseX = this.noiseFactorX * noiseFactor;
                const noiseY = this.noiseFactorY * noiseFactor;
                const noiseZ = this.noiseFactorZ * noiseFactor;

                this.vertices.push(z + noiseZ, y + noiseY, x + noiseX);
                this.normals.push(x + noiseX, y + noiseY, z + noiseZ);

                this.texCoords.push(longitude / this.slices, latitude / this.stacks);
            }
        }

        for (let latitude = 0; latitude < this.stacks; latitude++) {
            for (let longitude = 0; longitude < this.slices; longitude++) {
                const a = latitude * (this.slices + 1) + longitude;
                const b = a + this.slices + 1;

                this.indices.push(a, b, a + 1);
                this.indices.push(b, b + 1, a + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
