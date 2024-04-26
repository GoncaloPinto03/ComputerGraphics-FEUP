import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyLeg extends CGFobject {
    constructor(scene) {
        super(scene);

        // Objects
        this.leg1 = new MySphere(this.scene, 16, 8, 2, true);
        this.leg2 = new MySphere(this.scene, 16, 8, 2, true);
        this.finger = new MySphere(this.scene, 16, 8, 2, true);

        // Materials
        this.initMaterials();
    }
    initMaterials() {

      // Legs
      this.legMaterial = new CGFappearance(this.scene);
      this.legMaterial.setAmbient(0.05, 0.05, 0.05, 0.0);
      this.legMaterial.setDiffuse(0.05, 0.05, 0.05, 0.0);
      this.legMaterial.setSpecular(1, 1, 1, 0.0);
      this.legMaterial.setShininess(10.0);
    }

    display() {

      // Leg 1
      this.scene.pushMatrix();
      this.scene.rotate(-Math.PI / 4, 0, 0, 1);
      this.scene.scale(0.2, 1.5, 0.2);
      this.legMaterial.apply();
      this.leg1.display();
      this.scene.popMatrix();

      // Leg 2
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI / 8, 0, 0, 1);
      this.scene.scale(0.2, 1.5, 0.2);
      this.scene.translate(-13, -2.6, 0);
      this.legMaterial.apply();
      this.leg2.display();
      this.scene.popMatrix();

      // Finger 1
      this.scene.pushMatrix();
      this.scene.rotate(-Math.PI / 4, 0, 0, 1);
      this.scene.scale(0.2, 0.5, 0.2);
      this.scene.translate(25, -10, 0);
      this.legMaterial.apply();
      this.finger.display();
      this.scene.popMatrix();

    }
}