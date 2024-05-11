import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyLeg } from "./MyLeg.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyAntennae } from "./MyAntennae.js";

export class MyBee extends CGFobject {
  constructor(scene, x, y, z) {
    super(scene);

    this.x = x;
    this.y = y;
    this.z = z;
    this.orientation = 0;
    this.speed = 0;
    this.elapsedTime = 0;

    this.turnLeft = false;
    this.turnRight = false;

    // Objects
    this.head = new MySphere(this.scene, 16, 8, 5, false);
    this.leftEye = new MySphere(this.scene, 16, 8, 2, false);
    this.rightEye = new MySphere(this.scene, 16, 8, 2, false);
    this.torax = new MySphere(this.scene, 16, 8, 5, false);
    this.adbomen = new MySphere(this.scene, 16, 8, 6, false);
    this.leg1 = new MyLeg(this.scene);
    this.leg2 = new MyLeg(this.scene);
    this.leg3 = new MyLeg(this.scene);
    this.leg4 = new MyLeg(this.scene);
    this.leg5 = new MyLeg(this.scene);
    this.leg6 = new MyLeg(this.scene);
    this.sting = new MyCylinder(this.scene, 16, 8);
    this.antennae1 = new MyAntennae(this.scene);
    this.antennae2 = new MyAntennae(this.scene);
    this.wing1 = new MySphere(this.scene, 16, 8, 2, false);
    this.wing2 = new MySphere(this.scene, 16, 8, 2, false);
    this.wing3 = new MySphere(this.scene, 16, 8, 2, false);
    this.wing4 = new MySphere(this.scene, 16, 8, 2, false);

    // Materials
    this.initMaterials();
  }
  initMaterials() {
    this.defaultMaterial = new CGFappearance(this.scene);
    this.defaultMaterial.setAmbient(0.05, 0.05, 0.05, 0.0);
    this.defaultMaterial.setDiffuse(0.6, 0.05, 0.05, 0.0);
    this.defaultMaterial.setSpecular(0.5, 0.5, 1, 0.2);
    this.defaultMaterial.setShininess(10.0);

    // Head
    this.headMaterial = new CGFappearance(this.scene);
    this.headMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.headMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.headMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.headMaterial.setTexture(
      new CGFtexture(this.scene, "./images/bee2.jpeg")
    );
    this.headMaterial.setTextureWrap("REPEAT", "REPEAT");

    // Eyes
    this.eyeMaterial = new CGFappearance(this.scene);
    this.eyeMaterial.setAmbient(0.05, 0.05, 0.05, 0.0);
    this.eyeMaterial.setDiffuse(0.05, 0.05, 0.05, 0.0);
    this.eyeMaterial.setSpecular(1, 1, 1, 0.0);
    this.eyeMaterial.setShininess(10.0);

    // Torax
    this.toraxMaterial = new CGFappearance(this.scene);
    this.toraxMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.toraxMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.toraxMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.toraxMaterial.setTexture(
      new CGFtexture(this.scene, "./images/bee2.jpeg")
    );
    this.toraxMaterial.setTextureWrap("REPEAT", "REPEAT");

    // Abdomen
    this.abdomenMaterial = new CGFappearance(this.scene);
    this.abdomenMaterial.setAmbient(0.8, 0.8, 0.8, 0.0);
    this.abdomenMaterial.setDiffuse(0.95, 0.95, 0.95, 0.0);
    this.abdomenMaterial.setSpecular(0.5, 0.5, 0.5, 0.0);
    this.abdomenMaterial.setTexture(
      new CGFtexture(this.scene, "./images/bee.png")
    );
    this.abdomenMaterial.setTextureWrap("REPEAT", "REPEAT");

    this.scene.gl.blendFunc(
      this.scene.gl.SRC_ALPHA,
      this.scene.gl.ONE_MINUS_SRC_ALPHA
    );
    this.scene.gl.enable(this.scene.gl.BLEND);

    // Wings
    this.wingMaterial = new CGFappearance(this.scene);
    this.wingMaterial.setAmbient(0.05, 0.05, 0.05, 0.1);
    this.wingMaterial.setDiffuse(0.6, 0.05, 0.05, 0.1);
    this.wingMaterial.setSpecular(0.5, 0.5, 1, 0.1);
    this.wingMaterial.setEmission(0.5, 0.5, 0.5, 0.1);
    this.wingMaterial.setShininess(10.0);
  }

  turn(angle) {
    this.orientation += angle;

    if (angle > 0) this.turnRight = true;
    else this.turnLeft = true;
  }

  stopTurning() {
    this.turnLeft = false;
    this.turnRight = false;
  }

  accelerate(val) {
    if (this.speed + val < 0) {
      this.speed = 0;
      this.scene.speedFactor = 1;
    } else {
      this.speed += val;
    }
  }

  update(delta_t) {
    // Update elapsedTime for animations
    this.elapsedTime += delta_t / 1000.0;

    // Update position based on speed and orientation
    let deltaX = Math.cos(this.orientation) * this.speed * (delta_t / 1000.0);
    let deltaY = 0; // Assuming bee doesn't move vertically
    let deltaZ = Math.sin(this.orientation) * this.speed * (delta_t / 1000.0);

    this.x += deltaX;
    this.y += deltaY;
    this.z += deltaZ;
  }

  reset(x, y, z) {
    this.speed = 0;
    this.orientation = 0;
    this.x = x;
    this.y = y;
    this.z = z;
    this.turnLeft = false;
    this.turnRight = false;
}

  display() {
    this.scene.translate(0, Math.sin(this.elapsedTime) * 0.5, 0);

    // Head
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 0.8);
    this.scene.translate(0, 0, 0);
    this.scene.rotate(Math.PI / 4, 0, 1, 0);
    this.headMaterial.apply();
    this.head.display();
    this.scene.popMatrix();

    // Left Eye
    this.scene.pushMatrix();
    this.scene.translate(3, 1.5, 2);
    this.scene.scale(0.8, 1, 0.8);
    this.eyeMaterial.apply();
    this.leftEye.display();
    this.scene.popMatrix();

    // Right Eye
    this.scene.pushMatrix();
    this.scene.translate(-3, 1.5, 2);
    this.scene.scale(0.8, 1, 0.8);
    this.scene.rotate(Math.PI / 8, 0, 1, 0);
    this.eyeMaterial.apply();
    this.rightEye.display();
    this.scene.popMatrix();

    // Torax
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 1.5);
    this.scene.translate(0, 0.2, -7);
    this.toraxMaterial.apply();
    this.torax.display();
    this.scene.popMatrix();

    // Abdomen
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 4, 1, 0, 0);
    this.scene.scale(1, 1, 1.2);
    this.scene.translate(0, 15, -15);
    this.toraxMaterial.apply();
    this.adbomen.display();
    this.scene.popMatrix();

    // Leg 1
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 16, 0, 0, 1);
    this.scene.translate(-4, 0, -7);
    this.leg1.display();
    this.scene.popMatrix();

    // Leg 2
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 8, 0, 0, 1);
    this.scene.translate(-4, 0, -10);
    this.leg2.display();
    this.scene.popMatrix();

    // Leg 3
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 16, 0, 0, 1);
    this.scene.translate(-4, 0, -13);
    this.leg3.display();
    this.scene.popMatrix();

    // Leg 4
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.rotate(Math.PI / 16, 0, 0, 1);
    this.scene.translate(-4, 0, 7);
    this.leg4.display();
    this.scene.popMatrix();

    // Leg 5
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.rotate(Math.PI / 8, 0, 0, 1);
    this.scene.translate(-4, 0, 10);
    this.leg5.display();
    this.scene.popMatrix();

    // Leg 6
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.rotate(Math.PI / 16, 0, 0, 1);
    this.scene.translate(-4, 0, 13);
    this.defaultMaterial.apply();
    this.leg6.display();
    this.scene.popMatrix();

    // Sting
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 8, 1, 0, 0);
    this.scene.scale(0.1, 0.1, 1);
    this.scene.translate(0, 50, -30);
    this.eyeMaterial.apply();
    this.sting.display();
    this.scene.popMatrix();

    // Antennae 1
    this.scene.pushMatrix();
    this.scene.rotate(-Math.PI / 8, 0, 1, 0);
    this.scene.translate(-1, 5, 0);
    this.antennae1.display();
    this.scene.popMatrix();

    // Antennae 2
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 8, 0, 1, 0);
    this.scene.translate(1, 5, 0);
    this.antennae1.display();
    this.scene.popMatrix();

    // Wing 1
    this.scene.pushMatrix();
    this.scene.rotate(-Math.sin(this.elapsedTime) * 0.1, 1, 0, 0);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    this.scene.rotate(-Math.PI / 8, 0, 1, 0);
    this.scene.scale(0.5, 1, 1.5);
    this.scene.translate(3, 0, -7);
    this.wingMaterial.apply();
    this.wing1.display();
    this.scene.popMatrix();

    // Wing 2
    this.scene.pushMatrix();
    this.scene.rotate(-Math.sin(this.elapsedTime) * 0.1, 1, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.scene.rotate(Math.PI / 8, 0, 1, 0);
    this.scene.scale(0.5, 1, 1.5);
    this.scene.translate(-3, 0, -7);
    this.wingMaterial.apply();
    this.wing2.display();
    this.scene.popMatrix();

    // Wing 3
    this.scene.pushMatrix();
    this.scene.rotate(-Math.sin(this.elapsedTime) * 0.1, 1, 0, 0);
    this.scene.rotate(Math.PI / 4, 0, 0, 1);
    this.scene.rotate(-Math.PI / 8, 0, 1, 0);
    this.scene.scale(0.5, 1, 2.5);
    this.scene.translate(0, 0, -7);
    this.wingMaterial.apply();
    this.wing3.display();
    this.scene.popMatrix();

    // Wing 4
    this.scene.pushMatrix();
    this.scene.rotate(-Math.sin(this.elapsedTime) * 0.1, 1, 0, 0);
    this.scene.rotate(-Math.PI / 4, 0, 0, 1);
    this.scene.rotate(Math.PI / 8, 0, 1, 0);
    this.scene.scale(0.5, 1, 2.5);
    this.scene.translate(0, 0, -7);
    this.wingMaterial.apply();
    this.wing4.display();
    this.scene.popMatrix();
  }
}
