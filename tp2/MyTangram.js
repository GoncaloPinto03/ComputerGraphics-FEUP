import { CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.diamond = new MyDiamond(this.scene);
    this.triangle = new MyTriangle(this.scene);
    this.parallelogram = new MyParallelogram(this.scene);
    this.triangleSmall = new MyTriangleSmall(this.scene);
    this.triangleBig = new MyTriangleBig(this.scene);
  }

  display() {
    this.scene.pushMatrix();
    var translationMatrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0.5, 0.5, 0, 1,
    ];

    // Blue triangle
    this.scene.pushMatrix();
    this.scene.translate(-Math.sqrt(2), -Math.sqrt(2), 0);
    this.scene.rotate((-135 * Math.PI) / 180, 0, 0, 1);
    this.scene.setDiffuse(0, 0, 1, 0)
    this.triangleBig.display();
    this.scene.popMatrix();

    // Orange triangle
    this.scene.pushMatrix();
    this.scene.translate((-11 * Math.sqrt(2)) / 8, 0, 0);
    this.scene.rotate(-Math.PI, 0, 0, 1);
    this.scene.setDiffuse(255 / 255, 128 / 255, 0 / 255, 0)
    this.triangleBig.display();
    this.scene.popMatrix();

    // Red triangle
    this.scene.pushMatrix();
    this.scene.translate(1.5, -0.5, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.setDiffuse(1, 0, 0, 0)
    this.triangleSmall.display();
    this.scene.popMatrix();

    // Purple triangle
    this.scene.pushMatrix();
    this.scene.translate(1.2, 2.8, 0);
    this.scene.rotate((3 * Math.PI) / 4, 0, 0, 1);
    this.scene.setDiffuse(76 / 255, 0 / 255, 153 / 255, 0)
    this.triangleSmall.display();
    this.scene.popMatrix();

    // Yellow Parallelogram
    this.scene.pushMatrix();
    this.scene.translate(-0.5, 0.5, 0);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.setDiffuse(1, 1, 0, 0)
    this.parallelogram.display();
    this.scene.popMatrix();

    // Pink triangle
    this.scene.pushMatrix();
    this.scene.translate(0, -Math.sqrt(2), 0);
    this.scene.rotate((3 * Math.PI) / 4, 0, 0, 1);
    this.scene.setDiffuse(255 / 255, 153 / 255, 204 / 255, 0)
    this.triangle.display();
    this.scene.popMatrix();

    this.scene.multMatrix(translationMatrix);
    this.scene.setDiffuse(0, 255 / 255, 0, 0)
    this.diamond.display();
    this.scene.popMatrix();
  }
}
