import { CGFobject } from "../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";

export class MyGarden extends CGFobject {
    constructor(scene) {    
		super(scene);
        this.rows = 5;
        this.cols = 5;
        this.flowers = [];

        // Initialize flowers
        for (let i = 0; i < this.rows; i++) {
            this.flowers[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.flowers[i][j] = new MyFlower(scene);
            }
        }
	}

    display() {
        const spacingX = -20;
        const spacingZ = 20;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.flower = new MyFlower(this.scene);
                
                this.scene.pushMatrix();
                this.scene.translate(i * spacingX, 0, j * spacingZ);
                this.flowers[i][j].display();
                this.scene.popMatrix();
            }
        }
    }
}
