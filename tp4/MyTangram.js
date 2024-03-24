import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.trianglePink = new MyTriangle(this.scene);
        this.triangleBlue = new MyTriangleBig(this.scene, [0, 0, 1, 0, 0.5, 0.5, 0, 0, 1, 0, 0.5, 0.5]);
        this.triangleOrange = new MyTriangleBig(this.scene, [1, 0, 1, 1, 0.5, 0.5, 1, 0, 1, 1, 0.5, 0.5]);
        this.trianglePurple = new MyTriangleSmall(this.scene, [0, 0, 0, 0.5, 0.25, 0.25, 0, 0, 0, 0.5, 0.25, 0.25]);
        this.triangleRed = new MyTriangleSmall(this.scene, [0.25, 0.75, 0.75, 0.75, 0.5, 0.5, 0.25, 0.75, 0.75, 0.75, 0.5, 0.5]);
        this.parallelogram = new MyParallelogram(this.scene);
        this.initMaterials();
    }

    initMaterials() {

        // this.diamond
        this.diamondMaterial = new CGFappearance(this.scene);
        this.diamondMaterial.setAmbient(0, 1, 0, 1.0);
        this.diamondMaterial.setDiffuse(0, 1, 0, 0)
        this.diamondMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.diamondMaterial.setShininess(10.0);

        // big this.triangle blue
        this.triangleBlueBigMaterial = new CGFappearance(this.scene);
        this.triangleBlueBigMaterial.setAmbient(60/255, 150/255, 255/255, 1.0);
        this.triangleBlueBigMaterial.setDiffuse(76 / 255, 0 / 255, 153 / 255, 0)
        this.triangleBlueBigMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleBlueBigMaterial.setShininess(10.0);

        // big this.triangle orange
        this.triangleOrangeBigMaterial = new CGFappearance(this.scene);
        this.triangleOrangeBigMaterial.setAmbient(255/255, 153/255, 51/255, 1.0);
        this.triangleOrangeBigMaterial.setDiffuse(255 / 255, 153 / 255, 204 / 255, 0);
        this.triangleOrangeBigMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleOrangeBigMaterial.setShininess(10.0);

        // small this.triangle red
        this.triangleRedSmallMaterial = new CGFappearance(this.scene);
        this.triangleRedSmallMaterial.setAmbient(255/255, 0, 0, 1.0);
        this.triangleRedSmallMaterial.setDiffuse(255 / 255, 128 / 255, 0 / 255, 0)
        this.triangleRedSmallMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.triangleRedSmallMaterial.setShininess(10.0);

        // small this.triangle purple
        this.trianglePurpleSmallMaterial = new CGFappearance(this.scene);
        this.trianglePurpleSmallMaterial.setAmbient(255/255, 0, 255/255, 1.0);
        this.trianglePurpleSmallMaterial.setDiffuse(0, 0, 1, 0)
        this.trianglePurpleSmallMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.trianglePurpleSmallMaterial.setShininess(10.0);

        // this.parallelogram 
        this.parallelogramMaterial = new CGFappearance(this.scene);
        this.parallelogramMaterial.setAmbient(255/255, 153/255, 255/255, 1.0);
        this.parallelogramMaterial.setDiffuse(1, 1, 0, 0);
        this.parallelogramMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.parallelogramMaterial.setShininess(10.0);        

        // this.triangle pink
        this.trianglePinkMaterial = new CGFappearance(this.scene);
        this.trianglePinkMaterial.setAmbient(255/255, 153/255, 255/255, 1.0);
        this.trianglePinkMaterial.setDiffuse(1, 1, 0, 0);
        this.trianglePinkMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.trianglePinkMaterial.setShininess(10.0);
        
        // Tangram texture
        this.texture = new CGFappearance(this.scene);
        this.texture.setAmbient(0.1, 0.1, 0.1, 1);
        this.texture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.texture.setSpecular(0.1, 0.1, 0.1, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('images/tangram.png');
    }

    display() {

        this.scene.pushMatrix();
        let translationMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.4, 1.4, 0, 1
        ];

        this.scene.multMatrix(translationMatrix)
        this.scene.translate(0.1 , -0.9, 0);
        this.diamondMaterial.apply();
        this.texture.apply()
        this.diamond.display()
        this.scene.popMatrix()

        //Blue triangle
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -Math.sqrt(2), 0);
        this.scene.rotate(-135*Math.PI/180,0,0,1);
        this.triangleBlueBigMaterial.apply();
        this.texture.apply();
        this.triangleBlue.display();
        this.scene.popMatrix();

        // Draw orange big triangle
        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.scene.rotate(180*Math.PI/180,0,0,1);
        this.triangleOrangeBigMaterial.apply();
        this.texture.apply();
        this.triangleOrange.display();
        this.scene.popMatrix();

        // Draw red small triangle
        this.scene.pushMatrix();
        var x_mov = 1 + 0.5;      // just to make it more readable (triangle height + slight difference)
        var y_mov = -0.5;
        this.scene.translate(x_mov,y_mov,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.triangleRedSmallMaterial.apply();
        this.texture.apply();
        this.triangleRed.display();
        this.scene.popMatrix();

        // Draw purple small triangle 
        this.scene.pushMatrix();
        var xi_mov = (Math.sqrt(2)+1) / 2;      // just to make it more readable (triangle height + slight difference)
        var yi_mov = 3 + 1/2 - Math.sqrt(2)/2;
        this.scene.translate(xi_mov,yi_mov,0);
        this.trianglePurpleSmallMaterial.apply();
        this.texture.apply();
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.trianglePurple.display();
        this.scene.popMatrix();

        // Draw parallelogram
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0.5,0);
        this.scene.rotate(-Math.PI/2,0,0,1);  // colocar na vertical
        this.scene.rotate(Math.PI,0,1,0);     // inverter
        this.parallelogramMaterial.apply();
        this.texture.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        // Draw pink triangle
        this.scene.pushMatrix();
        this.scene.translate(0,-Math.sqrt(2),0);
        this.scene.rotate(-225*Math.PI/180,0,0,1);
        this.trianglePinkMaterial.apply();
        this.texture.apply();
        this.trianglePink.display();
        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.diamond.enableNormalViz()
        this.triangle.enableNormalViz()
        this.triangleBig.enableNormalViz()
        this.triangleSmall.enableNormalViz()
        this.parallelogram.enableNormalViz()
    };

    disableNormalViz(){
        this.diamond.disableNormalViz()
        this.triangle.disableNormalViz()
        this.triangleBig.disableNormalViz()
        this.triangleSmall.disableNormalViz()
        this.parallelogram.disableNormalViz()
    };
}
