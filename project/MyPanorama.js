import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

/**
* MyPanorama
* @constructor
*/
export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.sphere = new MySphere(this.scene, 100, 100, 500, true)
        this.texture = texture;
    }

    display(){

        this.scene.pushMatrix();
        this.texture.apply();
        this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
        this.sphere.display();
        this.scene.popMatrix();
        
    }
}
