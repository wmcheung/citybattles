/* ===================================================== 
 * Setup Matter Engine
 * ================================================== */
var Engine = Matter.Engine,
    Events = Matter.Events,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bounds = Matter.Bounds,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;


var engine;
var render;
var element;
var mouse;

var ground;

var isGameOver = false;

var box;
var box_counter;
var box_counter_resetter;
var box_counter_display;
var box_counter_increment = 50;


var bottom_wall;
var rope_container;
var rope;
var rope_box;
var rope_box_options;

var elastic;

var game = document.getElementById('game');

var screen_width = window.innerWidth;
var screen_height = window.innerHeight;
var screen_center = screen_width / 2;
var screen_middle = screen_height / 2;

game.width = screen_width;
game.height = screen_height;

var rope_position = { x: -15, y: 0 };

var box_texture = '';
var building = 'images/box.jpg';
var building_door = 'images/door.jpg';

function setupMatter() {
    // create engine
    engine = Engine.create({
        // enableSleeping: true
    });

    world = engine.world;    

    // create renderer
    render = Render.create({
        element: game,
        engine: engine,
        options: {
            width: Math.min(document.documentElement.clientWidth, screen_width),
            height: Math.min(document.documentElement.clientHeight, screen_height),
            background: 'images/city.jpg',
            showAngleIndicator: false,
            showCollisions: false,
            showVelocity: true,
            wireframes: false,
            hasBounds: false,
        },
    });
}

/* ===================================================== 
 * Drop a box
 * ================================================== */
// var Box = function() {
//     this.x = screen_center;
//     this.y = 100;
//     this.w = 200;
//     this.h = 80;
//     this.static = false;
//     this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, this.static);
//     this.body.restitution = 0;
// };

// Box.prototype.addBox = function() {
//     World.add(engine.world, this.body);
// };

// Box.prototype.removeBox = function() {
//     World.remove(engine.world, this.body);
// };

// Box.prototype.setHit = function() {
//     this.body.render.fillStyle = 'tomato';
//     this.body.render.strokeStyle = 'red';
// }


/* ===================================================== 
 * Event Listener and Handlers
 * ================================================== */

function addEventListeners() {
    window.addEventListener('keydown', handleKeydown, false);
}

function handleKeydown(event) {
    // spacebar
    if(!isGameOver) {
        if (event.keyCode === 32) {
            // var stack = Composites.stack(elastic.bodyB.position.x, elastic.bodyB.position.y, 1, 1, 0, 0, function(x, y) {
            //     console.log(elastic.bodyB.position.x);
            //     console.log(x);
            //     return Bodies.rectangle(x, y, 200, 80);
            // });

            // elastic.bodyB = box;
            // console.log(elastic.bodyB.position.x);
            // console.log(elastic.bodyB.position.y);

            // var stack = Composites.stack(screen_center, 100, 1, 1, 0, 0, function(x, y) {
            //     return Bodies.rectangle(x, y, 200, 80);
            // });

            // World.add(world, stack);
            // World.add(world, Bodies.rectangle(screen_center, 100, 200, 80, { isStatic: false }));
            // var box = new Box();
            // box.addBox();
            if(box_counter >= 1) { 
                box_texture = building;
            }
            box = Bodies.rectangle(elastic.bodyB.position.x, elastic.bodyB.position.y, 200, 70, { 
                    label: 'box',
                    render: {
                                sprite: {
                                    texture: box_texture
                                }
                            } 
                    });        

            World.add(world, box);

            resetGivePoints();
            showBoxSpawns();

            // engine.render.bounds.min.y = centerY + hero.bounds.min.y;
            // engine.render.bounds.max.y = centerY + hero.bounds.min.y + initialEngineBoundsMaxY;

            // console.log(game.height);
            // game.height += 100;
            // bottom_wall.position.y += 100;
            // render.options.height += 100;

            Body.translate(ground, { x: 0, y: 35 });
            Body.translate(bottom_wall, { x: 0, y: 35 });
        }

        if (event.keyCode === 37) {
            console.log('left');
            Body.translate(rope_container, { x: -20, y: 0 });
        }

        if (event.keyCode === 39) {
            console.log('right');
            Body.translate(rope_container, { x: 20, y: 0 });
        }
    }
}

/* ===================================================== 
 * The Walls
 * ================================================== */
function createWall() {
    bottom_wall = Bodies.rectangle(screen_center, screen_height - 25, screen_width, 50.5, { isStatic: true, label: 'bottom_wall' });

    World.add(world, [
        // Left
        Bodies.rectangle(0, screen_middle, 50, screen_height, { isStatic: true, label: 'left_wall' }),

        // Right
        Bodies.rectangle(screen_width, screen_middle, 50, screen_height, { isStatic: true, label: 'right_wall' }),

        bottom_wall
    ]);

    ground = Bodies.rectangle(screen_center, screen_height - 50, screen_width / 5, 50.5, { 
        isStatic: true, 
        label: 'ground',
        render: {
            fillStyle: '#C7F464',
        }
    });
    World.add(world, ground);
}

/* ===================================================== 
 * The Rope
 * ================================================== */
function createRope() {
    // add bodies
    // var group = Body.nextGroup(true);
    // rope_container = Bodies.rectangle(screen_center, 0, 50, 20, { isStatic: true });

    // rope = Composites.stack(screen_center, 0, 3, 2, 5, 5, function(x, y) {
    //     return Bodies.circle(x, y, 5, { collisionFilter: { group: group } });
    // });


    // rope_box = Composites.stack(screen_center, 100, 1, 1, 0, 0, function(x, y) {
    //      return Bodies.rectangle(x, y, 200, 80);
    // });

    // Composites.chain(rope, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2 });

    // Composite.add(rope, Constraint.create({ 
    //     bodyA: rope_container,
    //     bodyB: rope.bodies[0],
    //     pointA: { x: 0, y: -20 },
    //     pointB: { x: -20, y: 0 },
    //     stiffness: 0.5
    // }));


    // // console.log(rope_box);
    // World.add(world, rope_container);
    // World.add(world, rope);
    // World.add(world, rope_box);

    // add bodies
    rope_container      = Bodies.rectangle(screen_center, 10, 50, 20, { isStatic: true, isSensor: true });
    rope_box            = Bodies.rectangle(screen_center, 100, 200, 70, { 
                            isSensor: true,
                            render: {
                                sprite: {
                                    texture: building
                                }
                            } 
                        });
    anchor              = { x: 0, y: 10 };

    elastic             = Constraint.create({ 
                            pointA: anchor,
                            bodyA: rope_container, 
                            bodyB: rope_box, 
                            stiffness: 0.04
                        });

    World.add(world, [rope_container, rope_box, elastic]);
}

/* ===================================================== 
 * Update functions
 * ================================================== */
function moveRope() {
    if(rope_container.position.x <= 200) {        
        rope_position = { x: 15, y: 0 };
    }else if(rope_container.position.x >= (screen_width - 200)) {
        rope_position = { x: -15, y: 0 };
    }
   

    Body.translate(rope_container, rope_position);

    // console.log(rope_attach);
    // console.log('moving rope...');
}

/* ===================================================== 
 * Checking collisions
 * ================================================== */
function checkCollisionStart(event) {
    var pairs = event.pairs;
    pairs.forEach(function(item, index){
        if(item.bodyA.label == 'box' && item.bodyB.label == 'box') {
                // item.bodyB.render.fillStyle = '#fff';
                console.log('box A hit box B');
                give_points = true;
                givePointsChecker();
        }

        // Check if a box hit the ground.
        if (item.bodyA === ground) {
                // item.bodyB.render.fillStyle = '#fff';
                give_points = true;
                givePointsChecker();
        } else if (item.bodyB === ground) {
                // item.bodyA.render.fillStyle = '#fff';
        }  


        // If there is a collision with the bottom wall. Instant game over
        if (item.bodyA === bottom_wall) {
                // item.bodyA.render.fillStyle = '#e8e8e8';
                // console.log('game over 1');
                gameOver();
        } else if (item.bodyB  === bottom_wall) {
                // item.bodyA.render.fillStyle = '#777';
                gameOver();
        }
    });
}

function checkCollisionEnd(event) {
    // var pairs = event.pairs;
    // console.log(pairs);
}

/* ===================================================== 
 * The Game
 * ================================================== */
var score = 0;
var score_increment = 10;
var score_display;
var give_points = false;
var give_points_counter = 0;

var start = false;
var collision = false;

function runMatter() {
    // init the engine and renderer
    Engine.run(engine);
    Render.run(render);

    // Render.run(render);
    // var runner = Runner.create();
    // Runner.run(runner, engine);

    // Listeners for the game

    // Update the walls when the engine updates
    Events.on(engine, 'tick', moveRope);

    // Collision Event ends the game :-(
    Events.on(engine, 'collisionStart', checkCollisionStart);
    Events.on(engine, 'collisionEnd', checkCollisionEnd);

    // Events.on(engine, 'afterUpdate', function() {
    
    // });

    box_texture = building_door;
}

function mouseControls() {
    // add mouse control
    mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: screen_width, y: screen_height }
    });
}

function setupGUI() {
    score_display = document.getElementById('score_display');
    score_display.innerText = score;

    box_counter = 0;
    box_counter_resetter = 0;

    // Debugging box spawns
    box_counter_display = document.getElementById('box_counter');
    box_counter_display.innerText = box_counter;
}

function givePointsChecker() {
    give_points_counter++;
    if(give_points && give_points_counter == 1) {
        addPoints(score_increment);
        console.log(render);
        if(box_counter > 4){
            
        }
    }
}

function resetGivePoints() {
    give_points_counter = 0;
    give_points = false;
}

function addPoints(points) {
    score += points;
    score_display.innerText = score;
}

function showBoxSpawns() {
    // Debugging box spawns
    box_counter++;
    box_counter_resetter++;
    box_counter_display.innerText = box_counter;
}

function gameOver() {
    var game_over = document.getElementById('game_over');
    game_over.style.display = 'block';

    var game_over_score = document.getElementById('score_display_2');
    game_over_score.innerText = score;

    isGameOver = true;
}

window.onload = init();

// Initializes the game
function init() {
    // Setup the Matter engine and renderer
    setupMatter();

    // Add event listeners
    addEventListeners();

    // Add the necessary Matter bodies to the world    
    createWall();
    createRope();
    
    // mouseControls();

    // GUI 
    setupGUI();

    // Runs the engine and renderer
    runMatter();
}