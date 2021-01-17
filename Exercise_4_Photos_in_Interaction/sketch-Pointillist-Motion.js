// Pointillist Motion

// https://openprocessing.org/sketch/1064776

// inspired by  minipenguin's Skyline https://www.openprocessing.org/sketch/354636
// inspired by minipenguin -- https://www.openprocessing.org/user/57679
 
let img; 
let dots;
let hslArr = [];
let cHue, cLum, cSat;
let eWidth;

function preload(){	  
	img = loadImage("wave_sunlight.png");
	//img = loadImage("elephant.jpg");
	//img = loadImage("skyline.png");
	//img = loadImage("hand.jpg");
	//img = loadImage("red_swirl.jpg");
}

function setup(){
	background(0);
	createCanvas(800,500);
	background(0);
	dots=1000;
	pixelDensity(1);
	img.loadPixels();
	frameRate(60);
	eWidth = 5;
}

function draw(){
	for(let i=0; i<dots; i++){
		let x = int(random(0,img.width));
		let y= int(random(0,img.height));
		noStroke();
		
		// retrieves the RGB colors of selected pixels
		let index = (int(x) + int(y) * img.width) * 4;
		let r = img.pixels[index];
		let g = img.pixels[index+1];
		let b = img.pixels[index+2];
		let c = color(r,g,b);
		
		// converts RGB r,g,b values to HSL color mode
		hslArr = RGBToHSL(r,g,b);
		cHue = hslArr[0];
		cSat = hslArr[1];
		cLum = hslArr[2];

		//substitute ellipses for all pixels for first 50 frames
		if (frameCount <= 50){ 
			fill(c);
			ellipse(x,y,7);

                // after 50 frames replace only those that are non-gray, black or white
		} else {
			if ((cLum > 5 && cLum < 95) && (cSat < 5)){	
			continue;
			}else {
				fill(c);
				ellipse(x,y,eWidth);
			}//else
		}//else
	} //for
	
} //draw

// converts RGB to HSL values
function RGBToHSL(r,g,b) {
	// Make r, g, and b fractions of 1

	r /= 255;
	g /= 255;
	b /= 255;

	// Find greatest and smallest channel values
	let cmin = Math.min(r,g,b);
	let cmax = Math.max(r,g,b);
	let delta = cmax - cmin;
    let h = 0;
	let s = 0;
	let l = 0;

	// Calculate hue
	// No difference
	if (delta == 0){
		h = 0;
	// Red is max
	} else if (cmax == r){
		h = ((g - b) / delta) % 6;
	
	// Green is max
	}else if (cmax == g){
		h = (b - r) / delta + 2;
	
	// Blue is max
	}else{
		h = (r - g) / delta + 4;
	}
	
	h = Math.round(h * 60);

	// Make negative hues positive behind 360°
	if (h < 0){
		h += 360;
	}
	
	// Calculate lightness
	l = (cmax + cmin) / 2;

	// Calculate saturation
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	// Multiply l and s by 100
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1); 
    
    let hslArr = [h,s,l];
 
	return hslArr;
}

// reset to beginning

function mousePressed(){
	setup();
	frameCount=0;
}
// save image

function keyTyped() {
  if (key == 's' || key == 'S'){
    save('pointillist.jpg');
	}    
}

// ellipse width defaults to 5
// use UP_ARROW increase ellipse diameter from current to 15; DOWN_ARROW decrease from current to 5

function keyPressed(){
	if (keyCode === UP_ARROW){
		eWidth += 1;
		if (eWidth > 15) {
			eWidth = 15;
		} 
	}else	if (keyCode === DOWN_ARROW){
		eWidth -= 1;
		if (eWidth < 5) {
			eWidth = 5;
		}
	}
}