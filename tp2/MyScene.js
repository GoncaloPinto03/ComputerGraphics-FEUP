import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.triangleSmall = new MyTriangleSmall(this);
    this.triangleBig = new MyTriangleBig(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayDiamond = true;
    this.displayTriangle = true;
    this.displayParallelogram = true;
    this.displayTriangleSmall = true;
    this.displayTriangleBig = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];
    
    this.multMatrix(sca);

    var transposedMatrix = [
      this.scaleFactor, 0, 0, 0,
      0, this.scaleFactor, 0, 0,
      0, 0, this.scaleFactor, 0,
      0.5, 0.5, 0, this.scaleFactor
    ]

    // ---- BEGIN Primitive drawing section

    // Draw big triangle
    // NOTE: first we rotate and then translate, but in code we do the reverse reasoning
    if (this.displayTriangleBig) {
      this.pushMatrix();
      this.translate(-Math.sqrt(2), -Math.sqrt(2), 0);
      this.rotate(-135*Math.PI/180,0,0,1);
      this.triangleBig.display();
      this.popMatrix();
    }

    // Draw big triangle
    if (this.displayTriangleBig) {
      this.pushMatrix();
      this.translate(-2, 0, 0);
      this.rotate(180*Math.PI/180,0,0,1);
      this.triangleBig.display();
      this.popMatrix();
    }

    // Draw small triangle 
    if (this.displayTriangleSmall) {
      this.pushMatrix();
      var x_mov = 1 + 0.5;      // just to make it more readable (triangle height + slight difference)
      var y_mov = -0.5;
      this.translate(x_mov,y_mov,0);
      this.rotate(Math.PI/2,0,0,1);
      this.triangleSmall.display();
      this.popMatrix();
    }

    // Draw small triangle 
    if (this.displayTriangleSmall) {
      this.pushMatrix();
      var xi_mov = (Math.sqrt(2)+1) / 2;      // just to make it more readable (triangle height + slight difference)
      var yi_mov = 3 + 1/2 - Math.sqrt(2)/2;
      this.translate(xi_mov,yi_mov,0);
      this.rotate(3*Math.PI/4,0,0,1);
      this.triangleSmall.display();
      this.popMatrix();
    }
    
    // Draw parallelogram
    if (this.displayParallelogram) {
      this.pushMatrix();
      this.translate(-0.5,0.5,0);
      this.rotate(-Math.PI/2,0,0,1);  // colocar na vertical
      this.rotate(Math.PI,0,1,0);     // inverter
      this.parallelogram.display();
      this.popMatrix();
    }

    // Draw triangle
    if (this.displayTriangle) {
      this.pushMatrix();
      this.translate(0,-Math.sqrt(2),0);
      this.rotate(-225*Math.PI/180,0,0,1);
      this.triangle.display();
      this.popMatrix();
    }

    // Draw diamond
    if (this.displayDiamond) {
      this.multMatrix(transposedMatrix);  // same as this.translate(0.5,0.5,0);
      this.diamond.display();
    }
    
    // ---- END Primitive drawing section
  }
}
