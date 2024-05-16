import { CGFtexture, CGFobject } from "../lib/CGF.js";
import { MyStem } from "./MyStem.js";
import { MyLeaf } from "./MyLeaf.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyPetal } from "./MyPetal.js";


/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
  constructor(scene) {     
    super(scene);

    this.stemPositions = [];
    // this.auxStemPositions = [];
    this.nrStems = Math.floor(1 + Math.random() * (5 - 1)); // random number of stems
    this.length;

    // stem
    this.yPosStem = -15;        // initial yPos for the first stem
    this.stemTextureSide = new CGFtexture(this.scene, "images/stemColor.png");
    this.stem = new MyStem(this.scene, 100, 20);
    this.stemRadius = this.stem.getRadius();
    // this.auxStemRadius = 0.05 + Math.random() * (0.2 - 0.05);

    // handle stem position
    for (let i = 0; i < this.nrStems; i++) {
      let minLength = 1.0; // Minimum length for a substem
      let maxLength = 5.0; // Maximum length for a substem
      this.length = minLength + Math.random() * (maxLength - minLength);

      this.stemPositions.push({
        x: 0,
        y: this.yPosStem,
        z: 0,
        length: this.length,
      });

      this.yPosStem += this.length;
    }

    // TODO: need to add colors later (stemColor, leafColor, receptacleColor, petalColor)

    // stems that come out of the main stem
    // this.auxStem = new MyStem(this.scene, 100, 20, this.stemTextureSide);
    // let minAuxLength = 0.5; // Maximum length for a substem
    // let maxAuxLength = 2.0; // Maximum length for a substem
    // this.auxLength = minAuxLength + Math.random() * (maxAuxLength - minAuxLength);

    // stem leaves
    this.leafStemTextureTop = new CGFtexture(this.scene, "images/leafColor.png");
    this.leafStemTextureBottom = new CGFtexture(this.scene, "images/leafColor.png");
    this.leafRandomValue = Math.random();
    this.leafStem1 = new MyLeaf(this.scene);
    this.leafStem2 = new MyLeaf(this.scene);
    this.leafStem1Angle = this.leafStem1.getAngle();
    this.leafStem2Angle = this.leafStem2.getAngle();

    // receptacle 
    this.receptacleYPos;
    this.receptacleTexture = new CGFtexture(this.scene, "images/receptacleColor.png");
    this.receptacle = new MyReceptacle(this.scene, 1000, 10);
    this.receptacleRadius = this.receptacle.getRadius();

    // petals
    this.petalYPos;
    this.numPetals = Math.floor(6 + Math.random() * (10 - 6));
    this.angleIncrement = (2 * Math.PI) / this.numPetals;
    this.petalsAngle = Math.PI / Math.floor(4 + Math.random() * (12 - 4));
    this.petalTextureTop = new CGFtexture(this.scene, "images/petalColor.png");
    this.petalTextureBottom = new CGFtexture(this.scene, "images/petalColor.png");
    this.petal1 = new MyPetal(this.scene);
    this.petal2 = new MyPetal(this.scene);
  }

  getNumPetals() {
    return this.numPetals;
  }
  getReceptacleRadius() {
    return this.receptacleRadius;
  }
  getStemRadius() {
    return this.stemRadius;
  }
  getNumStems() {
    return this.numStems;
  }

  display() {
    let i = 1;
    let leafValue1 = 0;
    let leafValue2 = 0;

    // stem display
    for (const pos of this.stemPositions) {
      let k = i % 2 == 1 ? 1 : -1;
      this.scene.pushMatrix();
      this.stemTextureSide.bind();
      this.scene.translate(pos.x, pos.y, pos.z);
      // this.scene.rotate(k * Math.PI/36,1,0,0);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.scene.scale(this.stemRadius, this.stemRadius, 5);
      this.stem.display();
      this.scene.popMatrix();

      if (this.leafRandomValue >= 0.5) {
        leafValue1 = 0.6;
        leafValue2 = 0;
        this.leafStem2Angle = 0;
      } else {
        leafValue2 = 0.6;
        leafValue1 = 0;
        this.leafStem1Angle = 0;
      }

      // leaf stem display
      if (i < this.nrStems && this.nrStems > 1) {
        // Position the leaf at the end of the substem
        let leafPositionZ = 1.3;

        // Render leaf at the end of the substem
        this.scene.pushMatrix();
        this.leafStemTextureTop.bind();
        this.leafStemTextureBottom.bind();
        this.scene.translate(pos.x, pos.y - leafValue1, pos.z + leafPositionZ);
        this.scene.rotate(this.leafStem1Angle, 1, 0, 0); // add soft rotation to the stem leaves
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(1.5, 1.5, 1.5);
        this.leafStem1.display();
        this.scene.popMatrix();

        // Render leaf at the end of the substem
        this.scene.pushMatrix();
        this.leafStemTextureTop.bind();
        this.leafStemTextureBottom.bind();
        this.scene.translate(pos.x, pos.y - leafValue2, pos.z - leafPositionZ);
        this.scene.rotate(-this.leafStem2Angle, 1, 0, 0); // add soft rotation to the stem leaves
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(1.5, 1.5, 1.5);
        this.leafStem2.display();
        this.scene.popMatrix();

        // // aux stem display
        // this.scene.pushMatrix();
        // this.stemTextureSide.bind();
        // this.scene.rotate(k * Math.PI/12,1,0,0);
        // this.scene.translate(pos.x, pos.y+this.auxLength, pos.z);
        // this.scene.rotate(Math.PI / 2, 1, 0, 0);
        // this.scene.scale(this.auxStemRadius, this.auxStemRadius, this.auxLength);
        // this.auxStem.display();
        // this.scene.popMatrix();
      }
      i++;
    }

    // receptacle display
    this.scene.pushMatrix();
    this.receptacleTexture.bind();
    this.receptacleYPos = this.yPosStem - this.length + this.receptacleRadius;
    this.scene.translate(0, this.receptacleYPos, 0);
    this.receptacle.display();
    this.scene.popMatrix();
    
    // petals display
    this.petalYPos = this.receptacleYPos + this.receptacleRadius / 3;
    for (let i = 0; i < this.numPetals; i++) {
      let angle = i * this.angleIncrement;
      
      for (const pos of this.stemPositions) {
        // Position the leaf at the end of the substem
        this.petalYPos = this.yPosStem - this.length + this.receptacleRadius;

        let k = this.leafRandomValue > 0.5 ? 1 : -1;

        // Render leaf at the end of the substem
        this.scene.pushMatrix();
        this.petalTextureTop.bind();
        this.petalTextureBottom.bind();
        this.scene.translate(0, this.petalYPos, 0);
        this.scene.rotate(angle, 1, 0, 0);
        this.scene.translate(0, 0, 2.8);
        this.scene.rotate(k*this.petalsAngle, 0, 1, 0); 
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.petal1.display();
        this.scene.popMatrix();

        // Render leaf at the end of the substem
        this.scene.pushMatrix();
        this.petalTextureTop.bind();
        this.petalTextureBottom.bind();
        this.scene.translate(0, this.petalYPos, 0);
        this.scene.rotate(angle, 1, 0, 0);
        this.scene.translate(0, 0, 2.8);
        this.scene.rotate(k*this.petalsAngle, 0, 1, 0); 
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.petal2.display();
        this.scene.popMatrix();
      }
    }
  }
}
