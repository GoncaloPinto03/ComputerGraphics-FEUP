import { CGFobject, CGFtexture, CGFappearance, CGFshader } from "../lib/CGF.js";
import { MyGrassPortion } from "./MyGrassPortion.js";

export class MyGrassPatch extends CGFobject {
    constructor(scene, width, depth, numPortions, speedFactor = 0.002, minHeight = 1, maxHeight = 2) {    
        super(scene);
        this.width = width;
        this.depth = depth;
        this.numPortions = numPortions;
        this.speedFactor = speedFactor;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.grassPortions = [];
        const vertShader = "shaders/grass.vert";
        const fragShader = "shaders/grass.frag";
        this.grassShader = new CGFshader(this.scene.gl, vertShader, fragShader);
        this.grassShader.setUniformsValues({ timeFactor: 0 });
        this.initGrassPatch();
    }

    initGrassPatch() {
        for (let i = 0; i < this.numPortions; i++) {
            this.grassPortionHeight = 0.5 + Math.random() * (2 - 0.5);
            let portion = new MyGrassPortion(this.scene, this.grassPortionHeight);
            // Randomize position and slight rotation
            portion.x = Math.random() * this.width - this.width / 2;
            portion.y = 0;
            portion.z = Math.random() * this.depth - this.depth / 2;
            portion.angle = Math.random() * Math.PI / 8 - Math.PI / 16; // Small random rotation
            this.grassPortions.push(portion);
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.grassShader);

        for (let portion of this.grassPortions) {
            this.scene.pushMatrix();
            this.scene.translate(portion.x, portion.y, portion.z);
            this.scene.rotate(portion.angle, 0, 1, 0);
            portion.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

    update(time) {
        this.grassShader.setUniformsValues({ timeFactor: time * this.speedFactor });
    }
}
