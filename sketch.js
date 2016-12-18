var population;
var rocket;

function setup() {
  createCanvas(600,600);
  rocket = new Rocket();
  population = new Population();
}

function draw(){
  background(0);
  population.run();

}

function Population(){
  this.rockets = [];
  this.popsize = 25;

  for(var i = 0; i < this.popsize; i++){
    this.rockets[i] = new Rocket();
  }


  this.run = function(){
    for(var i = 0; i < this.popsize; i++){
      this.rockets[i].applyForce(random(10),random(10));
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }



}




function Rocket(){
  //Postion of Rocket is in the center of the screen
  this.pos = createVector(width/2, height/2);
  //Velocity of Rocket
  this.vel = createVector();
  //Acceleration of Rocket
  this.acc = createVector();

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
