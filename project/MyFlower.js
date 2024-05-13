import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture, CGFobject } from "../lib/CGF.js";
import { MyStem } from "./MyStem.js";
import { MyLeaf } from "./MyLeaf.js";
import { MyReceptacle } from "./MyReceptacle.js";
import { MyPetal } from "./MyPetal.js";
import { MyPlane } from "./MyPlane.js";


/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
  constructor(scene) {
    super(scene);
    this.stemPositions = [];
    this.nrStems = Math.floor(Math.random() * 4) + 1; // random number of stems
    this.length;

    this.displayStem = true;
    this.displayLeafStem = true;
    this.displayReceptacle = true;
    this.displayPetals = true;
    // initial yPos for the first stem
    // need to adjust this value later (ex: -95)
    this.yPosStem = 0;
    console.log("nrStems: " + this.nrStems);
    this.stemRadius = 0.2 + Math.random() * (0.5 - 0.2);
    console.log("stemRadius " + this.stemRadius);

    // receptacle receptacleRadius
    this.receptacleRadius = 1.5 + Math.random() * (2.5 - 1.5);
    console.log("receptacleRadius = " + this.receptacleRadius);
    this.receptacleYPos;

    // petals y coord
    this.petalYPos;
    this.numPetals = Math.floor(6 + Math.random() * (10 - 6));
    this.angleIncrement = (2 * Math.PI) / this.numPetals;
    console.log("num petals = " + this.numPetals);
    this.petalsAngle = Math.PI / Math.floor(4 + Math.random() * (12 - 4));

    // stem texture
    // this.stemTextureTop = new CGFtexture(this, "images/stemColor.png");
    // this.stemTextureBottom = new CGFtexture(this, "images/stemColor.png");
    this.stemTextureSide = new CGFtexture(this.scene, "images/stemColor.png");
    this.stem = new MyStem(this.scene, 100, 20, this.stemTextureSide);

    // handle stem position
    for (let i = 0; i < this.nrStems; i++) {
      // generate random stem length
      let minLength = 1.0; // Minimum length for a substem
      let maxLength = 5.0; // Maximum length for a substem
      this.length = minLength + Math.random() * (maxLength - minLength);

      console.log("yPos: " + this.yPosStem);
      console.log("len: " + this.length);
      this.stemPositions.push({
        x: 0,
        y: this.yPosStem,
        z: 0,
        length: this.length,
      });

      this.yPosStem += this.length;
    }

    // stemLeaf texture
    // update this stuff and everything related to MyPetal
    this.leafStemTextureTop = new CGFtexture(this.scene, "images/leafColor.png");
    this.leafStemTextureBottom = new CGFtexture(this.scene, "images/leafColor.png");
    this.leafCurvature = Math.PI / (Math.floor(Math.random() * (8 - 5 + 1)) + 5);
    this.leafRandomValue = Math.random();
    this.leafStem1 = new MyLeaf(
      this.scene
      // this.leafStemTextureTop,
      // this.leafStemTextureBottom
    );
    this.leafStem2 = new MyLeaf(
      this.scene,
      // this.leafStemTextureTop,
      // this.leafStemTextureBottom
    );

    // receptacle texture
    this.receptacleTexture = new CGFtexture(this.scene, "images/receptacleColor.png");
    this.receptacle = new MyReceptacle(
      this.scene,
      1000,
      10,
      this.receptacleRadius,
      // this.receptacleTexture
    );

    // petals
    this.petalTextureTop = new CGFtexture(this.scene, "images/petalColor.png");
    this.petalTextureBottom = new CGFtexture(this.scene, "images/petalColor.png");
    this.petal1 = new MyPetal(
      this.scene,
      // this.petalTextureTop,
      // this.petalTextureBottom
    );
    this.petal2 = new MyPetal(
      this.scene,
      // this.petalTextureTop,
      // this.petalTextureBottom
    );
  }

  display() {
    let i = 1;
    let leafCurvature1 = 0;
    let leafCurvature2 = 0;
    let leafValue1 = 0;
    let leafValue2 = 0;
    for (const pos of this.stemPositions) {
      let k = i % 2 == 1 ? 1 : -1;
      this.scene.pushMatrix();
      this.stemTextureSide.bind();
      // this.stemMaterial.apply();
      this.scene.translate(pos.x, pos.y, pos.z);
      // this.scene.rotate(k * Math.PI/36,1,0,0);
      this.scene.rotate(Math.PI / 2, 1, 0, 0);
      this.scene.scale(this.stemRadius, this.stemRadius, 5);
      this.stem.display();
      this.scene.popMatrix();

      if (this.leafRandomValue >= 0.5) {
        leafCurvature1 = this.leafCurvature;
        leafCurvature2 = 0;
        leafValue1 = 0.6;
        leafValue2 = 0;
      } else {
        leafCurvature2 = this.leafCurvature;
        leafCurvature1 = 0;
        leafValue2 = 0.6;
        leafValue1 = 0;
      }

      if (this.displayLeafStem && i < this.nrStems && this.nrStems > 1) {
        // Position the leaf at the end of the substem
        let leafPositionZ = 1.3;

        // Render leaf at the end of the substem
        this.scene.pushMatrix();
        this.leafStemTextureTop.bind();
        this.leafStemTextureBottom.bind();
        this.scene.translate(pos.x, pos.y - leafValue1, pos.z + leafPositionZ);
        this.scene.rotate(leafCurvature1, 1, 0, 0); // add soft rotation to the stem leaves
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(1.5, 1.5, 1.5);
        this.leafStem1.display();
        this.scene.popMatrix();

        // Render leaf at the end of the substem
        this.scene.pushMatrix();
        this.leafStemTextureTop.bind();
        this.leafStemTextureBottom.bind();
        this.scene.translate(pos.x, pos.y - leafValue2, pos.z - leafPositionZ);
        this.scene.rotate(-leafCurvature2, 1, 0, 0); // add soft rotation to the stem leaves
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(1.5, 1.5, 1.5);
        this.leafStem2.display();
        this.scene.popMatrix();
      }
      i++;
    }

    if (this.displayReceptacle) {
      this.scene.pushMatrix();
      this.receptacleTexture.bind();
      this.receptacleYPos = this.yPosStem - this.length + this.receptacleRadius;
      this.scene.translate(0, this.receptacleYPos, 0);
      this.receptacle.display();
      this.scene.popMatrix();
    }
    if (this.displayPetals) {
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
          this.scene.rotate(k * this.petalsAngle, 0, 1, 0); // add soft rotation to the stem leaves
          this.scene.rotate(Math.PI / 2, 1, 0, 0);
          this.scene.rotate(Math.PI / 4, 1, 0, 0);
          this.scene.rotate(Math.PI / 2, 0, 1, 0);
          this.scene.scale(1, 1, 1);
          this.petal1.display();
          this.scene.popMatrix();

          // Render leaf at the end of the substem
          this.scene.pushMatrix();
          this.petalTextureTop.bind();
          this.petalTextureBottom.bind();
          this.scene.translate(0, this.petalYPos, 0);
          this.scene.rotate(angle, 1, 0, 0);
          this.scene.translate(0, 0, 2.8);
          this.scene.rotate(k * this.petalsAngle, 0, 1, 0); // add soft rotation to the stem leaves
          this.scene.rotate(Math.PI, 0, 1, 0);
          this.scene.rotate(Math.PI / 2, 1, 0, 0);
          this.scene.rotate(Math.PI / 4, 1, 0, 0);
          this.scene.rotate(Math.PI / 2, 0, 1, 0);
          this.scene.scale(1, 1, 1);
          this.petal2.display();
          this.scene.popMatrix();
        }
      }
    }
  }
}
