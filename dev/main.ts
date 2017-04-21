/// <reference path="ball.ts"/>
/// <reference path="../typings/matter.d.ts"/>


// global window shortcuts maken zodat je niet steeds Matter. hoeft te typen
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
 


class Game {
    
    private ball:Ball;
    private engine;
    private render;
        
    constructor() {
        this.setupMatter();
        this.addElements();
    }
    
    
    setupMatter(){
        this.engine = Engine.create();
        // create a renderer
        this.render = Matter.Render.create({
            element: document.body,
            engine: this.engine
        });

        // this.addPhysicsObject(this.engine.world);


        // create two boxes and a ground
        var boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
        var boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
        var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        World.add(this.engine.world,[boxA, boxB, ground]);
        this.addPhysicsObject([boxA, boxB, ground]);
        //this.addPhysicsObject(boxA);
        //this.addPhysicsObject(boxB);
        

        // run the engine
        Engine.run(this.engine);

        // run the renderer
        Render.run(this.render);
    }
    
    public addPhysicsObject(arr):void {
        World.add(this.engine.world, arr);
    }
    
    addElements():void {
        // this.ball = new Ball(this);        
    }
        
} 

window.addEventListener("load", function() {
    new Game();
    
});

