import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import {MyCover} from './MyCover.js';

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);

        // Top
        this.top = new MyQuad(this.scene, 22, 22);
        this.topFront = new MyQuad(this.scene, 22, 2);
        this.topLeft = new MyQuad(this.scene, 22, 2);
        this.topRight = new MyQuad(this.scene, 22, 2);
        this.topBack = new MyQuad(this.scene, 22, 2);
        this.topBottom = new MyQuad(this.scene, 22, 22);

        // First Hive
        this.front1 = new MyQuad(this.scene, 20, 10);
        this.left1 = new MyQuad(this.scene, 20, 10);
        this.rigth1 = new MyQuad(this.scene, 20, 10);
        this.back1 = new MyQuad(this.scene, 20, 10);
        this.bottom1 = new MyQuad(this.scene, 20, 20);

        // Second Hive
        this.front2 = new MyQuad(this.scene, 20, 10);
        this.left2 = new MyQuad(this.scene, 20, 10);
        this.rigth2 = new MyQuad(this.scene, 20, 10);
        this.back2 = new MyQuad(this.scene, 20, 10);
        this.bottom2 = new MyQuad(this.scene, 20, 20);

        // Third Hive
        this.front3 = new MyQuad(this.scene, 20, 10);
        this.left3 = new MyQuad(this.scene, 20, 10);
        this.rigth3 = new MyQuad(this.scene, 20, 10);
        this.back3 = new MyQuad(this.scene, 20, 10);
        this.bottom3 = new MyQuad(this.scene, 20, 20);

        // Cover
        this.cover = new MyCover(this.scene);


        this.initMaterials();
    }

    initMaterials() {
      
      // Sides
      this.sidesMaterial = new CGFappearance(this.scene);
      this.sidesMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
      this.sidesMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
      this.sidesMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
      this.sidesMaterial.setTexture(
        new CGFtexture(this.scene, "./images/hive_side.png")
      );
      this.sidesMaterial.setTextureWrap("REPEAT", "REPEAT");

      // Front
      this.frontMaterial = new CGFappearance(this.scene);
      this.frontMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
      this.frontMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
      this.frontMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
      this.frontMaterial.setTexture(
        new CGFtexture(this.scene, "./images/hive_front.png")
      );
      this.frontMaterial.setTextureWrap("REPEAT", "REPEAT");

      // Top
      this.topMaterial = new CGFappearance(this.scene);
      this.topMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
      this.topMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
      this.topMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
      this.topMaterial.setTexture(
        new CGFtexture(this.scene, "./images/hive_top.png")
      );
      this.topMaterial.setTextureWrap("REPEAT", "REPEAT");

      // Inside
      this.insideMaterial = new CGFappearance(this.scene);
      this.insideMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
      this.insideMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
      this.insideMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
      this.insideMaterial.setTexture(
        new CGFtexture(this.scene, "./images/hive_inside.png")
      );
      this.insideMaterial.setTextureWrap("REPEAT", "REPEAT");
    }

    display() {

      // Top
      this.scene.pushMatrix();
      this.scene.translate(0, 25, 10);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.insideMaterial.apply();
      this.top.display();
      this.scene.popMatrix();

      // Top Front
      this.scene.pushMatrix();
      this.scene.translate(0, 25, -1);
      this.topMaterial.apply();
      this.topFront.display();
      this.scene.popMatrix();

      // Top Left
      this.scene.pushMatrix();
      this.scene.translate(0, 25, 21);
      this.topMaterial.apply();
      this.topLeft.display();
      this.scene.popMatrix();

      // Top Rigth
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.scene.translate(-10, 25, 11);
      this.topMaterial.apply();
      this.topRight.display();
      this.scene.popMatrix();

      // Top Back
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.scene.translate(-10, 25, -11);
      this.topMaterial.apply();
      this.topBack.display();
      this.scene.popMatrix();

      // Top Bottom
      this.scene.pushMatrix();
      this.scene.translate(0, 24, 10);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.topMaterial.apply();
      this.topBottom.display();
      this.scene.popMatrix();

      // Rigth 1
      this.scene.pushMatrix();
      this.scene.translate(0, 0, 0);
      this.sidesMaterial.apply();
      this.rigth1.display();
      this.scene.popMatrix();

      // Left 1
      this.scene.pushMatrix();
      this.scene.translate(0, 0, 20);
      this.sidesMaterial.apply();
      this.left1.display();
      this.scene.popMatrix();

      // Front 1
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.scene.translate(-10, 0, 10);
      this.frontMaterial.apply();
      this.front1.display();
      this.scene.popMatrix();

      // // Back 1
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.scene.translate(-10, 0, -10);
      this.sidesMaterial.apply();
      this.back1.display();
      this.scene.popMatrix();

      // Bottom 1
      this.scene.pushMatrix();
      this.scene.translate(0, -5, 10);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.sidesMaterial.apply();
      this.bottom1.display();
      this.scene.popMatrix();

      // Rigth 2
      this.scene.pushMatrix();
      this.scene.translate(0, 10, 0);
      this.sidesMaterial.apply();
      this.rigth2.display();
      this.scene.popMatrix();

      // Left 2
      this.scene.pushMatrix();
      this.scene.translate(0, 10, 20);
      this.sidesMaterial.apply();
      this.left2.display();
      this.scene.popMatrix();

      // Front 2
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.scene.translate(-10, 10, 10);
      this.frontMaterial.apply();
      this.front2.display();
      this.scene.popMatrix();

      // Back 2
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.scene.translate(-10, 10, -10);
      this.sidesMaterial.apply();
      this.back2.display();
      this.scene.popMatrix();

      // Bottom 2
      this.scene.pushMatrix();
      this.scene.translate(0, 5, 10);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.sidesMaterial.apply();
      this.bottom2.display();
      this.scene.popMatrix();

      // Rigth 3
      this.scene.pushMatrix();
      this.scene.translate(0, 20, 0);
      this.sidesMaterial.apply();
      this.rigth3.display();
      this.scene.popMatrix();

      // Left 3
      this.scene.pushMatrix();
      this.scene.translate(0, 20, 20);
      this.sidesMaterial.apply();
      this.left3.display();
      this.scene.popMatrix();

      // Front 3
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.scene.translate(-10, 20, 10);
      this.frontMaterial.apply();
      this.front3.display();
      this.scene.popMatrix();

      // Back 3
      this.scene.pushMatrix();
      this.scene.rotate(Math.PI/2, 0, 1, 0);
      this.scene.translate(-10, 20, -10);
      this.sidesMaterial.apply();
      this.back3.display();
      this.scene.popMatrix();

      // Bottom 3
      this.scene.pushMatrix();
      this.scene.translate(0, 15, 10);
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.sidesMaterial.apply();
      this.bottom3.display();
      this.scene.popMatrix();

      // Cover

      this.scene.pushMatrix();
      this.scene.translate(0, -15, 9);
      this.scene.rotate(-5*Math.PI/12, 1, 0, 0);
      this.cover.display();
      this.scene.popMatrix();
    }
    
}
