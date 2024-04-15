import { CGFobject } from '../lib/CGF.js';
import { MyRock } from "./MyRock.js";

export class MyRockSet extends CGFobject {
    constructor(scene, numRocks) {
        super(scene);
        this.numRocks = numRocks;
        this.rocks = [];

        this.initRocks();
    }

    initRocks() {
        let baseRadius = 10; // Base radius for the largest rock at the bottom
        let baseRoughness = 3; // Base roughness for noise
        let baseScale = 1.0; // Base scale for the largest rock

        // Generate pyramid of rocks
        for (let i = 0; i < this.numRocks; i++) {
            let radius = Math.random() * baseRadius + baseRadius / 2; // Random radius for the rock
            let roughness = Math.random() * baseRoughness + baseRoughness / 2; // Random roughness

            // Calculate scale for current rock based on its position in the pyramid
            let scale = baseScale * (1 - i / this.numRocks); // Decrease scale as we go higher in the pyramid

            // Position the rock on top of the previous one
            let x = (Math.random() - 0.5) * 10; // Random x position within a range
            let y = i * radius * 1.5; // Increase y position to stack rocks on top of each other
            let z = (Math.random() - 0.5) * 10; // Random z position within a range

            // Create a rock with random parameters and position
            let rock = new MyRock(this.scene, 25, 25, radius, roughness, x, y, z);

            // Add the rock to the list of rocks
            this.rocks.push(rock);
        }
    }

    display() {
        for (let rock of this.rocks) {
            rock.display();
        }
    }
}
