//Array of total rockets
var population;
//Number of rockets in population
var popSize = 1;
var tickCount;
//Rocket Test
var rocket;

function setup() {
  frameRate(20);
  createCanvas(600,600);
  rocket = new Rocket();
  population = new Population();
  for(var i = 0; i < popSize; i++){
    population.rockets[i].applyForce(random(-5,5),random(-5,5));
  }
}

function draw(){
  background(0);
  population.run();
  tickCount++;
}

function Population(){
  this.rockets = [];

  for(var i = 0; i < popSize; i++){
    this.rockets[i] = new Rocket();
  }


  //update and show Rockets
  this.run = function(){
    for(var i = 0; i < popSize; i++){
      //this.rockets[i].applyForce(random(10),random(10));
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }



}

//DNA should have acceleration for each tick?
function DNA() {
  this.instructions = [];

  this.instructions[tickCount] = createVector(random(-5,5),random(-5,5));
}

function Rocket(){
  //Postion of Rocket is in the center of the screen
  this.pos = createVector(width/2, height/2);
  //Velocity of Rocket
  this.vel = createVector();
  //Acceleration of Rocket
  this.acc = createVector();

  this.DNA = new DNA();

  //giving the Rocket Acceleration value of force
  this.applyForce = function(forceX,forceY){
    this.acc = createVector(forceX,forceY);
  }


  this.update = function(){
    //adding Acceleration to Velocity
    this.vel.add(this.acc);
    //updating the position according the the Acceleration
    this.pos.add(this.vel);
    /*
    The Acceleration is made 0 since we want an
    array of vectors to act upon the Rocket
    */
    this.acc = 0;

    //keeping the rockets in screen
    //should replace 600 with global variable
    if(this.pos.x <= 0){
      this.pos.x = 600;
    }else if (this.pos.x >= 600) {
      this.pos.x = 0;
    }
    if(this.pos.y <= 0){
      this.pos.y = 600;
    } else if (this.pos.y >= 600) {
      this.pos.y = 0;
    }
  }

  this.show = function () {
    push();
    noStroke();
    fill(255,0,0);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    //The actual Rocket is the center of the rectangle
    rectMode(CENTER);
    rect(0,0,25,5)
    pop();
  }
}
