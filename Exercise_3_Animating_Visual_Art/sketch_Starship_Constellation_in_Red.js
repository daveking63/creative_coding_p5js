// fork of Luis Ruiz (openprocessing.org/sketch/971685) 
// which is a fork of Richard Bourne (openprocessing.org/sketch/770524) 

// update 20191014 tie node addition to frameRate

let rootNode;
let depth;

let img = [];
let numImgs = 6;
let lineColor;

// These tiles are based on tiles from the well known OpArt artist Julian Stanczak's
// Constellation in Red. The facsimiles were generated from gradiants based
// on the primary border color and inner color.

function preload(){
	img[0] = loadImage('rd_or_tile.png');//red-orange
	img[1] = loadImage('b_bl_tile.png'); //black-blue
	img[2] = loadImage('b_rd_tile.png'); //black-red
	img[3] = loadImage('pr_pi_tile.png'); //purple-pink
	img[4] = loadImage('dr_rd_tile.png'); //dark red-red
	img[5] = loadImage('pr_or_tile.png'); //purple-orange
}

const nodes = [],
			rt3 = Math.sqrt(3);

function setup() {
	createCanvas(windowWidth, screen.availHeight, WEBGL);
  setAttributes('antialias', true);
	createEasyCam({distance:260});
	
	// suppress right-click context menu
  document.oncontextmenu = function() { return false; };
	
	strokeWeight(2);
	lineColor = color(139,0,39); // color of connecting lines between nodes
	let imgNo = int(random(0,numImgs));
	rootNode = new Node(0, 0, 0, 1, imgNo);
	nodes.push(rootNode);
	rootNode.addChildren(6);
}

function draw() {
	background(0);
	rotateY(frameCount*0.004);
	if (frameCount % 180 === 60) rootNode.stimulate();
	rootNode.draw();
}

class Node {
	constructor(x, y, z, depth, imgNo) {
		this.pos = new p5.Vector(x, y, z);
		this.depth = depth;
		this.born = frameCount;
		this.lastStimulation = -Infinity;
		this.children = [];
		this.imgTile = img[imgNo];
	}
	
	addChildren(n) {
		for (let i = 0; i < n; i ++) {
			if (frameCount === 0 && Math.random() > 1 / this.depth) continue;
			const coords = random([[1, 0,0], 
														 [1 / 2, rt3 / 2,0], 
														 [-1 / 2, rt3 / 2,0], 
														 [-1, 0,0], 
														 [-1 / 2, -rt3 / 2,0], 
														 [1 / 2, -rt3 / 2,0],
														 [0,0,1],
														 [0,0,-1]]),
						x = this.pos.x + 50 * coords[0],
						y = this.pos.y + 50 * coords[1],
						z = this.pos.z + 50 * coords[2];

			if (nodes.some(node => Math.pow(node.pos.x - x, 2) + Math.pow(node.pos.y - y, 2) + Math.pow(node.pos.z - z, 2) < 1)) continue;
      let imgNo = int(random(0,numImgs));
			const child = new Node(x, y, z, this.depth + 1, imgNo);
			this.children.push(child);
			nodes.push(child);
			
			if (frameCount === 0) child.addChildren(2);
				
		}
	}
	
	stimulate() {
		this.lastStimulation = frameCount;
		if (Math.random() < 0.5 && frameRate()>24) this.addChildren(1);
	}
	
	draw() {
		push();
		const q = frameCount - this.born;
		//stroke(0, q < 50 ? 200 * q / 50: 200, 200);

		const t = frameCount - this.lastStimulation;
		if (t === 10) {
			for (const child of this.children) child.stimulate();
		}
		
		for (const child of this.children) {
			push();
			  stroke(lineColor) //global value -- color of connecting lines

			  line(this.pos.x, this.pos.y, this.pos.z,  child.pos.x, child.pos.y, child.pos.z);
			pop();
			
			if (t < 10) {
				push();
				  strokeWeight(1);
				  //fill(50,255,0);
				  translate(this.pos.x + (child.pos.x - this.pos.x) * t / 10, this.pos.y + (child.pos.y - this.pos.y) * t / 10, this.pos.z + (child.pos.z - this.pos.z) * t / 10);
				box(1.5);
				pop();
			}
			
			child.draw();
		}
		
		//fill(t < 30 ? 255 * Math.pow(1.1, -t) : 0, 0, 0); //original box fill
		translate(this.pos.x, this.pos.y, this.pos.z);
		strokeWeight(1);
		
		texture(this.imgTile);
		box(15);
		pop();
	}
	//if (depth > 10) save('pix.jpg');
}