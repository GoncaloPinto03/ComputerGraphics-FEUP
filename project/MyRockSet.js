import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initRocks();
    }

    initRocks() {
        this.rocks = [];
        for (let i = 0; i < 35; i++) {
            this.rocks.push(new MyRock(this.scene, 10, 10, 1, Math.random(), Math.random(), Math.random()));
        }
    }

    display() {
        let rockIndex = 0;

        // base
        for (let i = 0; i < 5; i++) {
            this.scene.translate(0, 0, 2);
            this.rocks[rockIndex++].display();
        }
        this.scene.translate(2, 0, 1);
        for (let i = 0; i < 4; i++) {
            this.scene.translate(0, 0, -2);
            this.rocks[rockIndex++].display();
        }
        this.scene.translate(2, 0, 7);
        for (let i = 0; i < 3; i++) {
            this.scene.translate(0, 0, -2);
            this.rocks[rockIndex++].display();
        }
        this.scene.translate(2, 0, -1);
        for (let i = 0; i < 2; i++) {
            this.scene.translate(0, 0, 2);
            this.rocks[rockIndex++].display();
        }
        this.scene.translate(2, 0, -1);
        this.rocks[rockIndex++].display();

        // first layer
        this.scene.translate(-7, 1.5, -5);
        for (let i = 0; i < 4; i++) {
            this.scene.translate(0, 0, 2);
            this.rocks[rockIndex++].display();
        }
        this.scene.translate(2, 0, 1);
        for (let i = 0; i < 3; i++) {
            this.scene.translate(0, 0, -2);
            this.rocks[rockIndex++].display();
        }
        this.scene.translate(2, 0, 5);
        for (let i = 0; i < 2; i++) {
            this.scene.translate(0, 0, -2);
            this.rocks[rockIndex++].display();
        }
        this.scene.translate(2, 0, 1);
        this.rocks[rockIndex++].display();

        // second layer
        this.scene.translate(-5, 1.5, -4);
        for (let i = 0; i < 3; i++) {
            this.scene.translate(0, 0, 2);
            this.rocks[rockIndex++].display();
        }
        this.scene.translate(2, 0, 1);
        for (let i = 0; i < 2; i++) {
            this.scene.translate(0, 0, -2);
            this.rocks[rockIndex++].display();
        }
        this.scene.translate(2, 0, 1);
        this.rocks[rockIndex++].display();

        // third layer
        this.scene.translate(-3, 1.5, -3);
        for (let i = 0; i < 2; i++) {
            this.scene.translate(0, 0, 2);
            this.rocks[rockIndex++].display();
        }
        this.scene.translate(2, 0, -1);
        this.rocks[rockIndex++].display();

        // top layer
        this.scene.translate(-1, 1.5, 0);
        this.rocks[rockIndex++].display();
    }
}
