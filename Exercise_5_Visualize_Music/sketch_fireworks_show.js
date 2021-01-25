// fork of Daniel Shiffman's with added sounds
// https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_027_FireWorks/P5
// Code for: https://youtu.be/CKeyIbT3vXI

var fireworks = [];
var gravity;
var bg;

var sound_boom, sound_crackle, sound_whistle, sound_whistle_soft;

function preload(){
	bg = loadImage('data/purple_skyline.jpg');
  	sound_boom = loadSound('data/sound_boom.mp3');
  	sound_whistle = loadSound('data/sound_whistle.mp3');
  	sound_swoosh = loadSound('data/sound_swoosh.mp3');
}

function setup() {
	createCanvas(900, 600);
	colorMode(HSB);
	gravity = createVector(0, 0.2);
	stroke(255);
	strokeWeight(4);
}

function draw(){
  colorMode(HSB);
  background(bg);
  
  if (random(1) < 0.02) {
    fireworks.push(new Firework());
  }

  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
	}
  }
}

function Firework() {
  this.hu = int(random(0, 360));
  if (this.hu > 200 && this.hu < 250){
  	  this.hu = 200;
  } else if (this.hu >= 250 && this.hu <300){
		this.hu = 300;
  }
  this.typ = 0;
  let randSnd = random(1);
  if (randSnd < .1){
  	  sound_whistle.play();
  	  this.typ = 1;
  } else if (randSnd >= .1 && randSnd <.4){
  	  sound_swoosh.play();
  	  this.typ = 2;
  }
  
  this.firework = new Particle(random(width), height/1.3, this.hu, this.typ, true); // orig no height divisor
  this.exploded = false;
  this.particles = [];

  this.done = function() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  this.update = function() {
    if (!this.exploded) {
      this.firework.update();
      this.firework.applyForce(gravity);
 
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
        sound_boom.play();
      }
    }

    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  };

  this.explode = function() {
  	// pos.y is the height of firework at explosion
  	// 100 is the number of particles
  	// could set iLen to value between 100 and 200 depending on height
  	for (var i = 0; i < 100; i++) { //100
      var p = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        this.hu,
        false
      );
      this.particles.push(p);
    }
  };

  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  };
}

function Particle(x, y, hu, typ, firework) {
  this.pos = createVector(x, y);
  this.firework = firework;
  this.lifespan = 255;
  this.hu = (hu + int(random(-30,30))) % 360;
  this.acc = createVector(0, 0);

  if (this.firework) {
    this.vel = createVector(0, random(-13.5, -8)); -12
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 10));//10
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  };

  this.update = function() {
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  };

  this.show = function() {
    colorMode(HSB);
    if (!this.firework) {
      strokeWeight(4);
      stroke(hu, 255, 255, this.lifespan);
      point(this.pos.x, this.pos.y);
    } else {
      if (typ === 0){
	      strokeWeight(6);
	      stroke(hu, 255, 255);
	      point(this.pos.x, this.pos.y);
	  } else if (typ === 1){
      	  noStroke();
      	  fill(hu,255,255,255);
      	  ellipse(this.pos.x, this.pos.y, 1, 25);
	  } else if (typ === 2){
	  	  noStroke();
      	  fill(hu,255,255,50);
		  ellipse(this.pos.x, this.pos.y, 4, 15);	      	
	  }  
  	};
  }
}