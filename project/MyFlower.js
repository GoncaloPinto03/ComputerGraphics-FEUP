import { CGFobject } from "../lib/CGF.js";

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
    constructor(
        scene,
        stemSlices, stemStacks, stemTextureSide,
        leafTextureTop, leafTextureBottom,
        petalTextureTop, petalTextureBottom,
        receptacleSlices, receptacleStacks, receptacleRadius, receptacleTexture) 
    {    
        super(scene);
        this.stem = new MyStem(scene, stemSlices, stemStacks, stemTextureSide);
        this.leaf = new MyLeaf(scene, leafTextureTop, leafTextureBottom);
        this.petal = new MyPetal(scene, petalTextureTop, petalTextureBottom);
        this.receptacle = new MyReceptacle(scene, receptacleSlices, receptacleStacks, receptacleRadius, receptacleTexture);
    }
    
    display() {

    }
}
