import { CGFobject } from "../lib/CGF.js";

export class MyMovingBee extends CGFobject {
  constructor(scene, bee, x, y, z, pollenPos) {
    super(scene);

    this.bee = bee;

    this.orientation = 0;
    this.speed = 0;
    this.elapsedTime = 0;

    this.x = x;
    this.y = y;
    this.z = z;
    this.turnLeft = false;
    this.turnRight = false;

    this.beeSpeedFactor = 1;
    this.beeScaleFactor = 1;

    this.height = 0;
    this.goingDown = false;
    this.clickedPTime = 0;  

    this.pollenPos = pollenPos;

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

  searchPollen() {
    var minDistance = 1000;
    var minIndex = -1;
    for (var i = 0; i < this.pollenPos.length; i++) {
      var distance = Math.sqrt(
        Math.pow(this.pollenPos[i][0] - this.x, 2) +
        Math.pow(this.pollenPos[i][1] - this.y, 2) +
        Math.pow(this.pollenPos[i][2] - this.z, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        minIndex = i;
      }
    }
    console.log("minIndex: " + minIndex);
    return minIndex;
  }

  goToPollen(pollenIndex) {
    var x = this.pollenPos[pollenIndex][0];
    var y = this.pollenPos[pollenIndex][1];
    var z = this.pollenPos[pollenIndex][2];
    var dx = x - this.x;
    var dy = y - this.y;
    var dz = z - this.z;
    var angle = Math.atan2(dz, dx);
    this.orientation = angle;
    this.speed = 1;
  }

  update(delta_t) {
    this.elapsedTime += delta_t / 1000.0;

    var position = [
      Math.sin(this.orientation),
      this.height,
      Math.cos(this.orientation),
    ];
    
    this.x += position[0] * this.speed * delta_t;
    this.y += this.height;
    this.z += position[2] * this.speed * delta_t;
    this.speedFactor = delta_t;
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.speed = 0;
    this.orientation = 0;
    this.turnLeft = false;
    this.turnRight = false;
    this.beeSpeedFactor = 1;
    this.goingDown = false;
  }

  display() {
    // Movement
    this.scene.translate(0, Math.sin(this.elapsedTime) * 0.5, 0);
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(this.orientation, 0, 1, 0);
    this.scene.beeSpeedFactor = this.beeSpeedFactor;
    this.stopTurning();

    this.scene.pushMatrix();
    this.scene.scale(this.beeScaleFactor, this.beeScaleFactor, this.beeScaleFactor);
    this.bee.display();
    this.scene.popMatrix();

  }
}
