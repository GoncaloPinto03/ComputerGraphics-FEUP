import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyAntennae extends CGFobject {
    constructor(scene) {
        super(scene);

        // Objects
        this.stick = new MySphere(this.scene, 16, 8, 0.5, false);
        this.top = new MySphere(this.scene, 16, 8, 1, false);

        // Materials
        this.initMaterials();
    }
    initMaterials() {

      // Stick
      this.stickMaterial = new CGFappearance(this.scene);
      this.stickMaterial.setAmbient(0.05, 0.05, 0.05, 0.0);
      this.stickMaterial.setDiffuse(0.05, 0.05, 0.05, 0.0);
      this.stickMaterial.setSpecular(1, 1, 1, 0.0);
      this.stickMaterial.setShininess(10.0);

      // Top
      this.topMaterial = new CGFappearance(this.scene);
      this.topMaterial.setAmbient(0.05, 0.05, 0.05, 0.0);
      this.topMaterial.setDiffuse(0.05, 0.05, 0.05, 0.0);
      this.topMaterial.setSpecular(1, 1, 1, 0.0);
      this.topMaterial.setShininess(10.0);

    }

    display() {

      // Stick
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI / 4, 1, 0, 0);
      this.scene.scale(0.2, 1.5, 0.2);
      this.stickMaterial.apply();
      this.stick.display();
      this.scene.popMatrix();

      // Top
      this.scene.pushMatrix();
      this.scene.translate(0, -0.2, 1.8);
      this.scene.rotate(-Math.PI / 3, 1, 0, 0);
      this.scene.scale(0.2, 1.5, 0.2);
      this.topMaterial.apply();
      this.top.display();
      this.scene.popMatrix();

    }
}