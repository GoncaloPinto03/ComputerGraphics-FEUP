import { CGFobject } from "../lib/CGF.js";
import { MyGrassPortion } from "./MyGrassPortion.js";

export class MyGrassPatch extends CGFobject {
    constructor(scene, width, depth, numPortions, minHeight = 1, maxHeight = 2) {    
        super(scene);
        this.width = width;
        this.depth = depth;
        this.numPortions = numPortions;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.grassPortions = [];
        this.initGrass();
    }

    initGrass() {
        for (let i = 0; i < this.numPortions; i++) {
            let portion = new MyGrassPortion(this.scene);
            // Randomize position and slight rotation
            portion.x = Math.random() * this.width - this.width / 2;
            portion.y = 0;
            portion.z = Math.random() * this.depth - this.depth / 2;
            portion.angle = Math.random() * Math.PI / 8 - Math.PI / 16; // Small random rotation
            this.grassPortions.push(portion);
        }
    }

    display() {
        for (let portion of this.grassPortions) {
            this.scene.pushMatrix();
            this.scene.translate(portion.x, portion.y, portion.z);
            this.scene.rotate(portion.angle, 0, 1, 0);

            // Apply wind effect
            let sway = Math.sin(Date.now() * 0.005 + portion.x + portion.z) * 0.1;
            this.scene.rotate(sway, 0, 0, 1);
            portion.display();
            this.scene.popMatrix();
        }
    }
}
