import { CGFobject } from "../lib/CGF.js";
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
        this.triangle = new MyTriangle(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
    }
    
    display() {
        this.scene.pushMatrix();
        var transposedMatrix = [
            this.scaleFactor, 0, 0, 0,
            0, this.scaleFactor, 0, 0,
            0, 0, this.scaleFactor, 0,
            0.5, 0.5, 0, this.scaleFactor
        ]

        // Draw diamond
        this.scene.multMatrix(transposedMatrix);  // same as this.translate(0.5,0.5,0);
        this.diamond.display();
        this.scene.popMatrix();

        // Draw blue big triangle
        // NOTE: first we rotate and then translate, but in code we do the reverse reasoning
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -Math.sqrt(2), 0);
        this.scene.rotate(-135*Math.PI/180,0,0,1);
        this.triangleBig.display();
        this.scene.popMatrix();

        // Draw orange big triangle
        this.scene.pushMatrix();
        this.scene.translate(-2, 0, 0);
        this.scene.rotate(180*Math.PI/180,0,0,1);
        this.triangleBig.display();
        this.scene.popMatrix();

        // Draw red small triangle 
        this.scene.pushMatrix();
        var x_mov = 1 + 0.5;      // just to make it more readable (triangle height + slight difference)
        var y_mov = -0.5;
        this.scene.translate(x_mov,y_mov,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.triangleSmall.display();
        this.scene.popMatrix();

        // Draw purple small triangle 
        this.scene.pushMatrix();
        var xi_mov = (Math.sqrt(2)+1) / 2;      // just to make it more readable (triangle height + slight difference)
        var yi_mov = 3 + 1/2 - Math.sqrt(2)/2;
        this.scene.translate(xi_mov,yi_mov,0);
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.triangleSmall.display();
        this.scene.popMatrix();
        
        // Draw parallelogram
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0.5,0);
        this.scene.rotate(-Math.PI/2,0,0,1);  // colocar na vertical
        this.scene.rotate(Math.PI,0,1,0);     // inverter
        this.parallelogram.display();
        this.scene.popMatrix();
        
        // Draw pink triangle
        this.scene.pushMatrix();
        this.scene.translate(0,-Math.sqrt(2),0);
        this.scene.rotate(-225*Math.PI/180,0,0,1);
        this.triangle.display();
        this.scene.popMatrix();
    }
}