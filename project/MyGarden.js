import { CGFobject } from "../lib/CGF.js";
import { MyFlower } from "./MyFlower.js";

export class MyGarden extends CGFobject {
    constructor(scene, rows, cols) {    
		super(scene);
        this.rows = rows;
        this.cols = cols;
        this.flowers = [];
        this.pollensPos = [];
        this.initFlowers();
	}

    // Initialize flowers
    initFlowers() {
        this.flowers = [];
        for (let i = 0; i < this.rows; i++) {
            this.flowers[i] = [];
            for (let j = 0; j < this.cols; j++) {
                const flower = new MyFlower(this.scene);
                this.flowers[i][j] = flower;
                const pollenPosition = flower.getPollenPosition();
                this.pollensPos.push(pollenPosition);
            }
        }
    }

    getPollenPositions() {
        return this.pollensPos;
    }

    updateSize(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        // Resize the flowers array without creating new MyFlower instances unnecessarily
        for (let i = 0; i < this.rows; i++) {
            if (!this.flowers[i]) {
                this.flowers[i] = [];
            }
            for (let j = 0; j < this.cols; j++) {
                if (!this.flowers[i][j]) {
                    this.flowers[i][j] = new MyFlower(this.scene);
                }
            }
        }

        // Remove extra flowers if the new size is smaller
        this.flowers.length = this.rows;
        for (let i = 0; i < this.rows; i++) {
            this.flowers[i].length = this.cols;
        }
    }

    display() {
        const spacingX = -20;
        const spacingZ = 20;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {                
                this.scene.pushMatrix();
                this.scene.translate(i * spacingX, 0, j * spacingZ * (-1));
                // this.scene.rotate(Math.PI/4, 0,1,0);
                this.flowers[i][j].display();
                this.scene.popMatrix();
            }
        }
    }
}
