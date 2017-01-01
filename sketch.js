//Array of total rockets
var population;
//Number of rockets in population
var popSize = 25;
//Max time for a generation
var maxTick = 200;
//Current Time
var tickCount = 0;
//Target Rockets are trying to reach
var target;
var vectTarget;
//Max length from rocket to target
var maxLength = 0;
//Rocket Test
var rocket;


function setup() {
  //frameRate(30);
  var canvas = createCanvas(600, 600);
  rocket = new Rocket();
  population = new Population();
  target = ellipse(300, 100, 50, 50);
  vectTarget = createVector(target.x, target.y);

  //Finding the max distance the rocket can be
  var leftCornerLength = createVector(target.x, height);
  var rightCornerLength = createVector(target.x, width);

  if (vectTarget.dist(leftCornerLength) > vectTarget.dist(rightCornerLength)) {
    maxLength = vectTarget.dist(leftCornerLength);
  } else if (vectTarget.dist(leftCornerLength) < vectTarget.dist(
      rightCornerLength)) {
    maxLength = vectTarget.dist(rightCornerLength);
  } else {
    maxLength = vectTarget.dist(rightCornerLength);
  }

}

function draw() {
  background(0);
  ellipse(300, 100, 50, 50);
  if (tickCount == maxTick) {
    population.clearPopulation();
    population.repopulate();
    tickCount = 0;
  } else {
    population.run();
    tickCount++;
  }


}

function Population() {
  this.rockets = [];

  for (var i = 0; i < popSize; i++) {
    this.rockets[i] = new Rocket();
  }


  //update and show Rockets
  this.run = function() {
    for (var i = 0; i < popSize; i++) {
      //this.rockets[i].applyForce(random(10),random(10));
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }

  //Delete current population
  this.clearPopulation = function() {
    for (var i = 0; i < popSize; i++) {
      delete this.rockets[i];
    }
  }

  this.repopulate = function() {
    for (var i = 0; i < popSize; i++) {
      this.rockets[i] = new Rocket();
    }
  }


}

/*
DNA of rocket.
Contains the instructions of the rocket
*/

//DNA should have acceleration for each tick?
function DNA() {
  //Array of Accelerations
  this.instructions = [];
  for (var i = 0; i < maxTick; i++) {
    this.instructions[i] = createVector(random(-1, 1), random(-1, 1));
  }
}

/*
The rocket itself.
It has a postion, a velocity, and an accleration all of which are vectors
*/

function Rocket() {
  //Postion of Rocket is in the center of the screen
  this.pos = createVector(width / 2, height * .9);
  //Velocity of Rocket
  this.vel = createVector();
  //Acceleration of Rocket
  this.acc = createVector();

  this.fitness = 0;

  //If crashed, will not update rocket
  this.crashed = false;

  this.DNA = new DNA();

  this.calcFitness = function() {
    this.fitness = this.pos.dist(vectTarget) / 1000;
  }


  //giving the Rocket Acceleration value of force
  this.applyForce = function(forceX, forceY) {
    this.acc = createVector(forceX, forceY);
  }


  this.update = function() {
    //keeping the rockets in screen
    //should replace 600 with global variable
    if (this.pos.x >= 600 || this.pos.x <= 0) {
      this.crashed = true;
      this.calcFitness();
    }
    if (this.pos.y >= 600 || this.pos.y <= 0) {
      this.crashed = true;
      this.calcFitness();
    }

    if (this.crashed == false) {
      this.acc = this.DNA.instructions[tickCount];
      //adding Acceleration to Velocity
      this.vel.add(this.acc);
      //updating the position according the the velocity
      this.pos.add(this.vel);
    }
  }


  //Draw the position of the rockets
  this.show = function() {
    push();
    noStroke();
    if (this.crashed) {
      fill(random(255), random(255), random(255));
    } else {
      fill(255, 0, 0);
    }
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    //The actual Rocket is the center of the rectangle
    rectMode(CENTER);
    rect(0, 0, 25, 5)
    pop();
  }
}
