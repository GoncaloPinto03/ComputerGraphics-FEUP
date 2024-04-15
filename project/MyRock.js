import { CGFobject } from '../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, radius, roughness, x, y, z) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.roughness = roughness;
        this.x = x;
        this.y = y;
        this.z = z;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let alpha = 2 * Math.PI / this.slices;
        let beta = Math.PI / this.stacks;

        for (let latitude = 0; latitude <= this.stacks; latitude++) {
            for (let longitude = 0; longitude <= this.slices; longitude++) {
                let phi = longitude * alpha;
                let theta = beta * latitude;

                // Calculate coordinates on the sphere
                let x = this.radius * Math.cos(phi) * Math.sin(theta);
                let y = this.radius * Math.cos(theta);
                let z = this.radius * Math.sin(phi) * Math.sin(theta);

                // Apply noise for roughness
                let noiseX = this.generateNoise();
                let noiseY = this.generateNoise();
                let noiseZ = this.generateNoise();

                x += noiseX;
                y += noiseY;
                z += noiseZ;

                // Apply position offset
                x += this.x;
                y += this.y;
                z += this.z;

                this.vertices.push(x, y, z);

                // Calculate and store normal
                let normal = vec3.fromValues(x, y, z);
                vec3.normalize(normal, normal);
                this.normals.push(normal[0], normal[1], normal[2]);

                // Store texture coordinates
                this.texCoords.push(longitude / this.slices, latitude / this.stacks);
            }
        }

        for (let latitude = 0; latitude < this.stacks; latitude++) {
            for (let longitude = 0; longitude < this.slices; longitude++) {
                let a = latitude * (this.slices + 1) + longitude;
                let b = a + this.slices + 1;

                this.indices.push(b, a + 1, a);
                this.indices.push(b + 1, a + 1, b);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    generateNoise() {
        return (Math.random() - 0.5) * this.roughness;
    }
}
