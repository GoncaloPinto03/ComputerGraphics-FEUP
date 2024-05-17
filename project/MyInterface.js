import { CGFinterface, dat } from "../lib/CGF.js";

/**
 * MyInterface
 * @constructor
 */
export class MyInterface extends CGFinterface {
  constructor() {
    super();
  }
  init(application) {
    // call CGFinterface init
    super.init(application);
    
    // init GUI. For more information on the methods, check:
    // https://github.com/dataarts/dat.gui/blob/master/API.md
    this.gui = new dat.GUI();    

    //Slider element in GUI
    this.gui.add(this.scene, 'displayAxis').name('Display Axis');
    this.gui.add(this.scene, "scaleFactor", 0.1, 5).name("Scale Factor");
    this.gui.add(this.scene, 'gardenRows', 1, 10).name('Garden Rows').step(1).onChange(this.scene.setGardenDimensions.bind(this.scene));
    this.gui.add(this.scene, 'gardenCols', 1, 10).name('Garden Cols').step(1).onChange(this.scene.setGardenDimensions.bind(this.scene));
    this.gui.add(this.scene, "beeScaleFactor", 0.1, 5).name("Bee Scale Factor");
    this.gui.add(this.scene, "beeSpeedFactor", 0.1, 3).name("Bee Speed Factor");

    this.initKeys();

    return true;
  }

  initKeys() {
    this.scene.gui=this;
    this.processKeyboard=function(){};
    this.activeKeys={};
  }
  processKeyDown(event) {
    this.activeKeys[event.code]=true;
  }
  processKeyUp(event) {
    this.activeKeys[event.code]=false;
  }
  isKeyPressed(keyCode) {
    return this.activeKeys[keyCode] || false;
  }

}
