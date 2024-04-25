import { CGFobject } from '../lib/CGF.js';

export class MyRock extends CGFobject {
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

        const alpha = 2 * Math.PI / this.slices;
        const beta = Math.PI / this.stacks;

        for (let latitude = 0; latitude <= this.stacks; latitude++) {
            for (let longitude = 0; longitude <= this.slices; longitude++) {
                const x = this.radius * Math.cos(longitude * alpha) * Math.sin(beta * latitude);
                const y = this.radius * Math.cos(beta * latitude);
                const z = this.radius * Math.sin(longitude * alpha) * Math.sin(beta * latitude);

                // Randomly displace vertices to create irregularities
                const noiseFactor = 0.2; // Adjust as needed
                const noiseX = (Math.random() - 0.5) * noiseFactor;
                const noiseY = (Math.random() - 0.5) * noiseFactor;
                const noiseZ = (Math.random() - 0.5) * noiseFactor;

                this.vertices.push(x + noiseX, y + noiseY, z + noiseZ);
                this.normals.push(x + noiseX, y + noiseY, z + noiseZ);

                this.texCoords.push(longitude / this.slices, latitude / this.stacks);
            }
        }

        for (let latitude = 0; latitude < this.stacks; latitude++) {
            for (let longitude = 0; longitude < this.slices; longitude++) {
                const a = latitude * (this.slices + 1) + longitude;
                const b = a + this.slices + 1;

                this.indices.push(b, a + 1, a);
                this.indices.push(b + 1, a + 1, b);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
