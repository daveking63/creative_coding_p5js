//Instagram Logo

// This sketch shows the manner in which this rendition of the
// logo is created -- basically as a series of layered 
// objects consisting of an:
//
//   1. outer square - has rounded edges. Serves 
//   as the background for the logo. Center of this 
//   square serves as center for inner square and inner circle.
//   Additionally, in this version the background square can 
//   either be a solid color or a color gradient that has
//   2 gradient bands (from c1 to c2 and c2 to c3).
//
//   2. inner square - has rounded edges. Only the edge of 
//   this square appears.
//
//   3. inner circle - Only the edge of the circle appears
//
//   4. inner point - appears halfway between outer and inner
//   square upper right corners
//
//   In this case, the edge of all of the 'inner' objects are
//   the same color (here 'white') and have essentially the
//   same stroke width ('strokeWeight').
//

// Key Parameters of the logo:

let nSteps = 4; // number of steps used to create logo

let w = 600; // width and height of Canvas
let h = 200;

let rectSpace; //distance between the outer squares in each step
let rectDist; //each square is a rect(xCent,yCent,rectDist,recDist,roundcrnr)
let roundcrnr; //diameter of rounded corner of squares
let xCent; //x loc of the center of the outer and inner squares and inner circle
let yCent; //y loc of the center of the outer and inner squares and inner circle
let gradFlag; //0 - outer square is solid color; 1 - color gradient
let fillFlag; //0- object will not be filled; 1-object will be filled
let sWgt; // strokeWeight of objects
let clr = []; //array containing gradient colors and the color of edges
let typeObj; //0 - outer; 1 - inner
let circleD; //diameter of inner circle and inner point
let step; //text denoting specific step

function setup() {
  createCanvas(w, h);
  rectMode(CENTER);  
  
  rectDist = 100;
  rectSpace = 20;
  roundcrnr = 20;
  yCent = h/2
  gradFlag = 0;
  sWgt = 7;
  circleD = 30;
  
  if (gradFlag){
    //gradient color outerSquare
    clr[0] = color(135,87,158); //purple-blue
    clr[1] = color(224,6,134);  //pink-red
    clr[2] = color(242,135,70); //orange-yellow
  }else{
    //solid color outerSquare
    clr[0] = clr[1] = clr[2] = color(224,6,134); //pink-red
  } 
  clr[3] = color(255,255,255); //edge color
	
  noLoop(); //draw function only 'paints' once
}

function draw(){
  background(255);

  // label steps
  for (let i = 0; i < 4; i++){
      let xCent = (i+1) * (rectDist + rectSpace);
      if (i == 0){
        renderTxt(xCent,yCent,'Step 1')
      } else if (i == 1){
        renderTxt(xCent,yCent,'Step 2')
      } else if (i == 2){
        renderTxt(xCent,yCent,'Step 3')
      } else {
        renderTxt(xCent,yCent,'Logo')
      }
   }
  
  // create objects
  for (i = 0; i < 4; i++){
    let xCent = (i+1) * (rectDist + rectSpace);
    if (i >= 0){ // outer square
      typeObj = 0;
      renderSquare(typeObj,gradFlag,clr,xCent,yCent,rectDist,roundcrnr);
    }

    if (i>0){ //inner square -- .75 of outer square
      typeObj = 1;
      renderSquare(typeObj,gradFlag,clr,xCent,yCent,0.75*rectDist,0.75*roundcrnr)
    }

    if (i > 1){ //inner circle
      typeObj = 1;
      fillFlag = 0;
      renderCircle(typeObj,0,clr,xCent,yCent,circleD);
    }
    
    if (i > 2){ // inner point
      typeObj = 1;
      fillFlag = 1;
      circleD = 7;
      xCentPt = xCent + (rectDist/5);
      yCentPt = yCent - (rectDist/5);
      xCentPt = xCent + 
      renderCircle(typeObj,fillFlag,clr,xCentPt,yCentPt,10);
    }   
  }
}

function renderSquare(tObj,gradF,clr,xCent,yCent,rectDist,roundcrnr){
  if (tObj == 0){
    if (gradF == 0){
      noStroke();
      fill(clr[0]);
      rect(xCent,yCent,rectDist,rectDist,roundcrnr)
    } else {
        for (let i = rectDist; i > 0; i--){
          if (i > rectDist/2){
            amt = map(i,rectDist,rectDist/2,1,0);
            c = lerpColor(clr[1],clr[0],amt);
          } else {
            amt = map(i,rectDist/2,0,1,0);
            c = lerpColor(clr[2],clr[1],amt);
          }
          stroke(c);
          fill(c);
          rect(xCent,yCent,i,i,roundcrnr);
        }
    }
  } else {
    strokeWeight(sWgt);
    stroke(clr[3]);
    noFill();
    rect(xCent,yCent,rectDist,rectDist,roundcrnr)
  }  
}

function renderCircle(tObj,fillFlag,clr,xCent,yCent,diametr){
  if (fillFlag==0){
    noFill();
    stroke(clr[3]);
    strokeWeight(sWgt)
    circle(xCent,yCent,diametr)
  }else{
    fill(clr[3]);
    noStroke();
    circle(xCent,yCent,diametr) 
  }
}

function renderTxt(xCent, yCent, step){
  textSize(15);
  text(step, xCent-25, 0.4 * yCent);
}

function keyTyped(){
  if (key == 's' || key == 'S') save('instagram_logo.png')
}