var Ball = (function () {
    function Ball(g) {
        this.game = g;
    }
    Ball.prototype.place = function () {
        this.div.style.transform = "translate(100px,100px)";
    };
    return Ball;
}());
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Game = (function () {
    function Game() {
        this.setupMatter();
        this.addElements();
    }
    Game.prototype.setupMatter = function () {
        this.engine = Engine.create();
        this.render = Matter.Render.create({
            element: document.body,
            engine: this.engine
        });
        var boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
        var boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
        var ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        World.add(this.engine.world, [boxA, boxB, ground]);
        this.addPhysicsObject([boxA, boxB, ground]);
        Engine.run(this.engine);
        Render.run(this.render);
    };
    Game.prototype.addPhysicsObject = function (arr) {
        World.add(this.engine.world, arr);
    };
    Game.prototype.addElements = function () {
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
//# sourceMappingURL=main.js.map