import { CGFobject, CGFtexture, CGFappearance } from "../lib/CGF.js";
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

        const vertShader = "shaders/grass.vert";
        const fragShader = "shaders/grass.frag";
        this.grassShader = new CGFshader(this.gl, vertShader, fragShader);
        this.grassShader.setUniformsValues({ timeFactor: 0 });
        this.initGrassPatch();
    }

    initGrassPatch() {
        this.grassTexture = new CGFtexture(this.scene, "images/grassColor.png");
        this.grassAppearance = new CGFappearance(this.scene);
        this.grassAppearance.setTexture(this.grassTexture);
        this.grassAppearance.setTextureWrap('REPEAT', 'REPEAT');

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
        this.scene.pushMatrix();
        this.grassAppearance.apply();
        this.scene.setActiveShader(this.grassShader);

        for (let portion of this.grassPortions) {
            this.scene.pushMatrix();
            this.grassAppearance.apply();
            this.scene.translate(portion.x, portion.y, portion.z);
            this.scene.rotate(portion.angle, 0, 1, 0);

            // Apply wind effect
            // let sway = Math.sin(Date.now() * 0.005 + portion.x + portion.z) * 0.1;
            // this.scene.rotate(sway, 0, 0, 1);
            portion.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }

    update(time) {
        const speedFactor = 0.001; // Adjust this value as needed
        this.grassShader.setUniformsValues({ timeFactor: time * speedFactor });
      }
}
