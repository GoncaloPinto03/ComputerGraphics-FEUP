import {CGFinterface, dat} from '../lib/CGF.js';

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
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');
        this.gui.add(this.scene, 'gardenRows', 1, 10).name('Garden Rows').step(1).onChange(this.scene.setGardenDimensions.bind(this.scene));
        this.gui.add(this.scene, 'gardenCols', 1, 10).name('Garden Cols').step(1).onChange(this.scene.setGardenDimensions.bind(this.scene));

        return true;
    }
}