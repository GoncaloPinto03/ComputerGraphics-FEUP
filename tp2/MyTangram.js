import { CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

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
        var transposedMatrix = [
            this.scaleFactor, 0, 0, 0,
            0, this.scaleFactor, 0, 0,
            0, 0, this.scaleFactor, 0,
            0.5, 0.5, 0, this.scaleFactor
        ]

        // ---- BEGIN Primitive drawing section

        // Draw blue big triangle
        // NOTE: first we rotate and then translate, but in code we do the reverse reasoning
        this.pushMatrix();
        this.translate(-Math.sqrt(2), -Math.sqrt(2), 0);
        this.rotate(-135*Math.PI/180,0,0,1);
        this.triangleBig.display();
        this.popMatrix();
        

        // Draw orange big triangle
        this.pushMatrix();
        this.translate(-2, 0, 0);
        this.rotate(180*Math.PI/180,0,0,1);
        this.triangleBig.display();
        this.popMatrix();
        

        // Draw red small triangle 
        this.pushMatrix();
        var x_mov = 1 + 0.5;      // just to make it more readable (triangle height + slight difference)
        var y_mov = -0.5;
        this.translate(x_mov,y_mov,0);
        this.rotate(Math.PI/2,0,0,1);
        this.triangleSmall.display();
        this.popMatrix();

        // Draw purple small triangle 
        this.pushMatrix();
        var xi_mov = (Math.sqrt(2)+1) / 2;      // just to make it more readable (triangle height + slight difference)
        var yi_mov = 3 + 1/2 - Math.sqrt(2)/2;
        this.translate(xi_mov,yi_mov,0);
        this.rotate(3*Math.PI/4,0,0,1);
        this.triangleSmall.display();
        this.popMatrix();
        
        
        // Draw parallelogram
        this.pushMatrix();
        this.translate(-0.5,0.5,0);
        this.rotate(-Math.PI/2,0,0,1);  // colocar na vertical
        this.rotate(Math.PI,0,1,0);     // inverter
        this.parallelogram.display();
        this.popMatrix();
        

        // Draw pink triangle
        this.pushMatrix();
        this.translate(0,-Math.sqrt(2),0);
        this.rotate(-225*Math.PI/180,0,0,1);
        this.triangle.display();
        this.popMatrix();
        

        // Draw diamond
        this.pushMatrix();
        this.multMatrix(transposedMatrix);  // same as this.translate(0.5,0.5,0);
        this.diamond.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }
}