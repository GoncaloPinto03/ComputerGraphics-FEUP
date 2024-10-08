import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyGarden } from "./MyGarden.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyBee } from "./MyBee.js";
import { MyMovingBee } from "./MyMovingBee.js";
import { MyHive } from "./MyHive.js";
import { MyGrassPatch } from "./MyGrassPatch.js";

function getStringFromUrl(url) {
    var xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", url, false); // synchronous request
    xmlHttpReq.send();
    return xmlHttpReq.responseText;
}
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

        this.pollensPos = [];
        this.speedFactor = 0.001 + Math.random() * (0.0035 - 0.001); // Adjust this value as needed
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

        this.setUpdatePeriod(50);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new MyPlane(this, 30);
        this.rockSet = new MyRockSet(this);
        this.garden = new MyGarden(this, this.gardenRows, this.gardenCols);
        this.pollenPos = this.garden.getPollenPositions();
        this.bee = new MyBee(this, 0, 0, 0);
        this.movingBee = new MyMovingBee(this, this.bee, 0, 0, 0,this. pollenPos);
        this.hive = new MyHive(this);
        this.grassPatch = new MyGrassPatch(this, 100, 100, 25000, this.speedFactor); // change this to 50x50 units

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1;
        this.beeScaleFactor = 1;
        this.beeSpeedFactor = 1;

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

        // earth texture
        this.earthTexture = new CGFtexture(this, "images/earth.jpg");
        this.earthAppearance = new CGFappearance(this);
        this.earthAppearance.setTexture(this.earthTexture);
        this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // rock texture
        this.rockTexture = new CGFtexture(this, "images/rock.jpg");
        this.rockAppearance = new CGFappearance(this);
        this.rockAppearance.setTexture(this.rockTexture);
        this.rockAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.startTime = Date.now();
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
            vec3.fromValues(0, -50, 40), //where the camera is
            vec3.fromValues(40,-60, 30) //the target
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

    checkKeys() {
      var text= "Keys pressed: ";
      var keysPressed= false;
  
      // Check for key codes e.g. in https://keycode.info/
      if (this.gui.isKeyPressed("KeyW")) {
        text += " W ";
        keysPressed = true;
        this.movingBee.accelerate(this.beeSpeedFactor);
      }
  
      if (this.gui.isKeyPressed("KeyS")) {
        text += " S ";
        keysPressed = true;
        this.movingBee.accelerate(0);
      }
  
      if (this.gui.isKeyPressed("KeyA")) {
        text += " A ";
        keysPressed = true;
        this.movingBee.turn(this.beeSpeedFactor);
      }
  
      if (this.gui.isKeyPressed("KeyD")) {
        text += " D ";
        keysPressed = true;
        this.movingBee.turn(-this.beeSpeedFactor);
      }
  
      if (this.gui.isKeyPressed("KeyR")) {
        text += " R ";
        keysPressed = true;
        this.movingBee.reset();
      }

      if (this.gui.isKeyPressed("KeyF")) {
        text += " F ";
        keysPressed = true;

        const pollenIndex = this.movingBee.searchPollen();
        this.movingBee.goToPollen(pollenIndex);
      }

      if (this.gui.isKeyPressed("KeyP")) {
        text += " P ";
        keysPressed = true;
      }
  
      if (keysPressed) console.log(text);
    }
    update() {
      this.checkKeys();
      this.movingBee.update((this.beeSpeedFactor));
      this.movingBee.beeSpeedFactor = this.beeSpeedFactor;
      this.movingBee.beeScaleFactor = this.beeScaleFactor;
    }
    updateGrass(currentTime){
      if (!this.startTime)
        this.startTime = currentTime;
        let elapsedTime = currentTime - this.startTime;
        this.grassPatch.update(elapsedTime);
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
        this.updateGrass(Date.now());
        
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
        this.translate(100, -81, 30);
        this.garden.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(50, -99, 50);
        this.scale(3, 1.5, 3);
        this.rockAppearance.apply();
        this.rockSet.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(40, -70, 0);
        this.scale(0.3, 0.3, 0.3);
        this.movingBee.display();
        this.movingBee.update((this.beeSpeedFactor));
        this.popMatrix();

        this.pushMatrix();
        this.translate(50, -81, 80);
        this.rotate(2*Math.PI/3, 0, 1, 0);
        this.scale(1.5, 1.5, 1.5);
        this.hive.display();
        this.popMatrix();

        this.pushMatrix();
        this.rotate(-Math.PI/2, 0, 1, 0);
        this.translate(0, -95, -60); // Position the grass patch as needed
        this.grassPatch.display();
        this.popMatrix();
  
        // ---- END Primitive drawing section
    }
}
