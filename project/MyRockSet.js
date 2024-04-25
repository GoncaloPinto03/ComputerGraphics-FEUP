import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet {
    constructor(scene) {
        this.scene = scene;

        this.rocks = [];

        this.initRocks();
    }

    initRocks() {
        // create a pyramid of 35 rocks
        for (let i = 0; i < 35; i++) {
            const rock = new MyRock(this.scene, 10, 10, 1);
            this.rocks.push(rock);
        }
    }

    display() {
        const rock = new MyRock(this.scene, 10, 10, 1);

        // base
        for (let i = 0; i < 5; i++) {
            this.scene.translate(0, 0, 2);
            rock.display();
        }
        this.scene.translate(2, 0, 1);
        for (let i = 0; i < 4; i++) {
            this.scene.translate(0, 0, -2);
            rock.display();
        }
        this.scene.translate(2, 0, 7);
        for (let i = 0; i < 3; i++) {
            this.scene.translate(0, 0, -2);
            rock.display();
        }
        this.scene.translate(2, 0, -1);
        for (let i = 0; i < 2; i++) {
            this.scene.translate(0, 0, 2);
            rock.display();
        }
        this.scene.translate(2, 0, -1);
        rock.display();

        // first layer
        this.scene.translate(-7, 1.5, -5);
        for (let i = 0; i < 4; i++) {
            this.scene.translate(0, 0, 2);
            rock.display();
        }
        this.scene.translate(2, 0, 1);
        for (let i = 0; i < 3; i++) {
            this.scene.translate(0, 0, -2);
            rock.display();
        }
        this.scene.translate(2, 0, 5);
        for (let i = 0; i < 2; i++) {
            this.scene.translate(0, 0, -2);
            rock.display();
        }
        this.scene.translate(2, 0, 1);
        rock.display();

         // second layer
         this.scene.translate(-5, 1.5, -4);
         for (let i = 0; i < 3; i++) {
             this.scene.translate(0, 0, 2);
             rock.display();
         }
         this.scene.translate(2, 0, 1);
         for (let i = 0; i < 2; i++) {
             this.scene.translate(0, 0, -2);
             rock.display();
         }
         this.scene.translate(2, 0, 1);
         rock.display();

         // third layer
         this.scene.translate(-3, 1.5, -3);
         for (let i = 0; i < 2; i++) {
             this.scene.translate(0, 0, 2);
             rock.display();
         }
         this.scene.translate(2, 0, -1);
         rock.display();

         // top layer
         this.scene.translate(-1, 1.5, 0);
         rock.display();
    
    }
}
