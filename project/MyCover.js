import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

export class MyCover extends CGFobject {
    constructor(scene) {
        super(scene);

        // Cover
        this.cover = new MyQuad(this.scene, 22, 22);
        this.coverFront = new MyQuad(this.scene, 22, 2);
        this.coverLeft = new MyQuad(this.scene, 22, 2);
        this.coverRight = new MyQuad(this.scene, 22, 2);
        this.coverBack = new MyQuad(this.scene, 22, 2);
        this.coverBottom = new MyQuad(this.scene, 22, 22);


        this.initMaterials();
    }

    initMaterials() {

      // Top
      this.topMaterial = new CGFappearance(this.scene);
      this.topMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
      this.topMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
      this.topMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
      this.topMaterial.setTexture(
        new CGFtexture(this.scene, "./images/hive_top.png")
      );
      this.topMaterial.setTextureWrap("REPEAT", "REPEAT");
    }

    display() {
      // Cover Front
      this.scene.pushMatrix();
      this.scene.translate(0, 16, -1);
      this.topMaterial.apply();
      this.coverFront.display();
      this.scene.popMatrix();

      // Cover Left
      this.scene.pushMatrix();
      this.scene.translate(0, 16, 21);
      this.topMaterial.apply();
      this.coverLeft.display();
      this.scene.popMatrix();

      // Cover Rigth
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.scene.translate(-10, 16, 11);
      this.topMaterial.apply();
      this.coverRight.display();
      this.scene.popMatrix();

      // Cover Back
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.scene.translate(-10, 16, -11);
      this.topMaterial.apply();
      this.coverBack.display();
      this.scene.popMatrix();

      // Cover Bottom
      this.scene.pushMatrix();
      this.scene.translate(0, 15, 10);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.topMaterial.apply();
      this.coverBottom.display();
      this.scene.popMatrix();
    }
    
}
