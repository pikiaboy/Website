var population;

function setup() {
  createCanvas(600,600);
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
      var force = random(10);
      this.rockets[i].applyForce(force);
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }



}




function Rocket(){
  //Postion of Rocket is in the bottom center
  this.pos = createVector(width/2, height);
  //Velocity of Rocket
  this.vel = createVector();
  //Acceleration of Rocket
  this.acc = createVector();

  //giving the Rocket Acceleration value of force
  this.applyForce = function(force){
    this.acc.add(force);
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
