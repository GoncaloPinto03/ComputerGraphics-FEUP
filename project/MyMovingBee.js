import { CGFobject } from "../lib/CGF.js";

export class MyMovingBee extends CGFobject {
  constructor(scene, bee, x, y, z) {
    super(scene);

    this.bee = bee;

    this.orientation = 0;
    this.speed = 0;
    this.elapsedTime = 0;
    this.auxElapsedTime = 0;

    this.height = 0;
    this.x = x;
    this.y = y;
    this.z = z;
    this.turnLeft = false;
    this.turnRight = false;

    this.speedFactor = 1;
    this.scaleFactor = 1;

  }

  accelerate(acceleration) {
    this.speed = acceleration;
  }

  turn(angle) {
    this.orientation += angle/3;

    if (angle > 0) this.turnRight = true;
    else this.turnLeft = true;
  }

  stopTurning() {
    this.turnLeft = false;
    this.turnRight = false;
  }

  update(t) {
    //Update elapsedTime for animations
    this.elapsedTime += t / 1000.0;

    var dirVector = [
      Math.sin(this.orientation),
      this.y,
      Math.cos(this.orientation),
    ];
    this.speedFactor = t;

    this.x += this.speed * dirVector[0] * t;
    this.z += this.speed * dirVector[2] * t;
  }

  reset() {
    this.speed = 0;
    this.orientation = 0;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.turnLeft = false;
    this.turnRight = false;
    this.speedFactor = 1;
  }

  display() {
    // Movement
    this.scene.translate(0, Math.sin(this.elapsedTime) * 0.5, 0);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.orientation, 0, 1, 0);
    this.scene.speedFactor = this.speedFactor;
    this.stopTurning();

    this.scene.pushMatrix();
    this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.bee.display();
    this.scene.popMatrix();

  }
}
