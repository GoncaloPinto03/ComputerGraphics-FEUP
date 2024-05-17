import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyGarden } from "./MyGarden.js";
import { MyGrassPatch } from "./MyGrassPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
        // Default garden dimensions
        this.gardenRows = 5;
        this.gardenCols = 5;
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
        this.plane = new MyPlane(this, 30);

        // initialize garden
        this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
        this.grassPatch = new MyGrassPatch(this, 100, 100, 25000, 1, 2); // change this to 50x50 units

        //Objects connected to MyInterface
        this.scaleFactor = 1;

        this.enableTextures(true);

        // terrain texture
        this.terrainTexture = new CGFtexture(this, "images/terrain.jpg");
        this.terrainAppearance = new CGFappearance(this);
        this.terrainAppearance.setTexture(this.terrainTexture);
        this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // panorama texture
        this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");
        this.panoramaAppearance = new CGFappearance(this);
        this.panoramaAppearance.setTexture(this.panoramaTexture);
        this.panoramaAppearance.setEmission(1, 1, 1, 1);
        this.panoramaAppearance.setTextureWrap('REPEAT', 'REPEAT');
        this.panorama = new MyPanorama(this, this.panoramaAppearance);
    }

    initLights() {

        this.lights[0].setPosition(15, 0, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setAmbient(0.2,0.2,0.2,1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setPosition(10, -60, 40, 1);
        this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setAmbient(0.2,0.2,0.2,1.0);
        this.lights[1].enable();
        this.lights[1].update();
    
        this.lights[2].setPosition(35, 35, 30, 1);
        this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setAmbient(0.2,0.2,0.2,1.0);
        this.lights[2].enable();
        this.lights[2].update();
    
        this.lights[3].setPosition(15, 35, 80, 1);
        this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[3].setAmbient(0.2,0.2,0.2,1.0);
        this.lights[3].enable();
        this.lights[3].update();
      }
    initCameras() {
        this.camera = new CGFcamera(
            1.5,
            0.1,
            1000,
            vec3.fromValues(0, -55, 45), //where the camera is
            vec3.fromValues(20,-70.3,50) //the target
        );
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }


    setGardenDimensions() {
        this.garden.updateSize(this.gardenRows, this.gardenCols);
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
      
        // Draw axis
        if (this.displayAxis) this.axis.display();

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();
        this.terrainAppearance.apply();
        this.translate(0, -100, 0);
        this.scale(400, 400, 400);
        this.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.plane.display();
        this.popMatrix();

        this.pushMatrix();
        this.panoramaAppearance.apply();
        this.panorama.display();
        this.popMatrix();
        
        this.pushMatrix();
        this.garden.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-30, -95, -30); // Position the grass patch as needed
        this.grassPatch.display();
        this.popMatrix();
  
        // ---- END Primitive drawing section
    }
}