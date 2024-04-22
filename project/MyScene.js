import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyStem } from "./MyStem.js";
import { MyPanorama } from "./MyPanorama.js";

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
    this.plane = new MyPlane(this,30);
    this.stem = 
  
    this.enableTextures(true);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayStem = true;
    this.scaleFactor = 1;

    // terrain texture
    this.terrainTexture = new CGFtexture(this, "images/terrain.jpg");
    this.terrainAppearance = new CGFappearance(this);
    this.terrainAppearance.setTexture(this.terrainTexture);
    this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');
    
    // panorama texture
    this.panoramaTexture = new CGFtexture(this, "images/panorama1.jpg");
    this.panoramaAppearance = new CGFappearance(this);
    this.panoramaAppearance.setTexture(this.panoramaTexture);
    this.panoramaAppearance.setEmission(1, 1, 1, 1); 
    this.panoramaAppearance.setTextureWrap('REPEAT', 'REPEAT');
    
    this.panorama = new MyPanorama(this, this.panoramaAppearance);
    
    // stem texture 
    this.textureTop = new CGFtexture(this, "images/mineTop.png")
    this.textureBottom = new CGFtexture(this, "images/mineBottom.png")
    this.textureSide = new CGFtexture(this, "images/mineSide.png")
    this.stem = new MyStem(this, 100, 20, this.textureTop, this.textureBottom, this.textureSide);
  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
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

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.terrainAppearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.pushMatrix();
    this.panoramaAppearance.apply();
    this.panorama.display();
    this.popMatrix();

    if (this.displayStem) {
      // this.textureBottom.bind();
      // this.textureSide.bind();
      this.pushMatrix();
      this.textureTop.bind();
      // need to apply the faces of the stem, like quad in MyUnitCubeQuad
      this.scale(0.5, 0.5, 5);
      this.stem.display();
      this.popMatrix();
    }
    // ---- END Primitive drawing section
  }
}
