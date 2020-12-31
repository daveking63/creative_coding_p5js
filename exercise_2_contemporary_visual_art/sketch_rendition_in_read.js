// This is a rendition of Julian Stanczak 'Constellation Red'.
// A copy of the original is provided at:
//   https://geoform.net/artists/julian-stanczak/
//
// A different rendition ('Constellation in Green') can be found at:
//   https://geoform.net/interviews/an-interview-with-artist-julian-stanczak/
//
// Stanczak was one of the founders and leaders of the Op Art movement.
//   See: https://www.theartstory.org/movement/op-art/
// 
// From the original version it is easy to see that painting consists
// of a series of 36 squares. The coloration of each square is a
// gradation of either 2 or 3 colors -- usually emanating from the center.
// In the painted version many of the squares appear to consist of grids
// of smaller squares.
//
// In this program the each square is treated as an object of the same
// size. The coloration of each square is produced by creating a series of
// concentric rectangles that are decreasing in size and whose colors are gradated
// from the edge to the center using the three main colors of the square
// in the original painting. The code for doing this appears at in the 'display'
// method of the 'tile' object:
/*
    for (let i = this.w; i>0 ;i--){
      if (i > this.w/2){
        this.amt = map(i, this.w, int(this.w/2), 1, 0);
        this.c = lerpColor(this.clr[1], this.clr[0], this.amt)
      } else {
        this.amt = map(i, this.w/2, 0, 1, 0);
        this.c = lerpColor(this.clr[2], this.clr[1], this.amt)
      }
*/
// Basically, those concentric rectangles that are further away than 
// half the distance between the edge and center of the square a gradated
// with clr[0] and clr[1], and those that are within half the distance
// to the center are gradated with clr[1] and clr[2]
//
// As it turns out, many of the squares have the same color scheme. For
// instance squares (0,0) and (4,2). Overall,there are only 11 schemes.
// Each scheme is designated as an array of abbreviations which are 
// converted into their RBG counterpart.
//
// For example, the first square in the upper right corner is has the
// following color scheme (see colorScheme function):
//
// ['b', 'dbl', 'bl'] which are black, dark blue, and blue 
//
// and are converted by the 'selectColor' function to:
//
// color(5,5,5), color(38, 58, 165), and color(31, 57,  212)..

let tileSize = 100; // width of the tiles that represent the squares in the painting
let rows = 6; // number of squares per row
let cols = 6; // number of squares per column
let tiles = []; //new Tile[rows][cols];
let clrs = []; // three colors used to produce the gradation for a tile
let gridFlag = 0; // if you want a white grid to separate the squares
let sNums = []; // there are 6x6=36 numbers that represent the individual
                // color schemes for each square
                // because

function setup() {

  createCanvas(600, 600);
  smooth();

  sNums = initSNums(); //numeric values of color schemes for all tiles/squares

  // create and display the tiles
  for (let i = 0; i < rows; i++) {
    tiles[i] = [];
    for (let j = 0; j < cols; j++) {
      let indx = i * rows + j;
      let schm = sNums[indx]
      clrs = colorScheme(schm);
      tiles[i][j] = new Tile(j * tileSize, i * tileSize, tileSize, clrs);
      tiles[i][j].display();
    }
  }

  if (gridFlag) {
    grid();
  }

} // end setup()

// optional grid on top of the squares
function grid() {
  stroke(255);
  strokeWeight(3);
  for (let i = 0; i < rows; i++) {
    line(0, i * tileSize, width, i * tileSize);
  }
  for (let j = 0; j < cols; j++) {
    line(j * tileSize, 0, j * tileSize, height);
  }
} //grid

class Tile {
  constructor(x, y, w, clrs) {
    this.x = x; //the x value of the upper right corner of a tile
    this.y = y; //the y value of the upper right corner of a tile
    this.w = w; //size of tile
    this.clr = clrs; //triplet of colors
    this.amt = 0; // used for computing gradation
    this.c = 0; // holds gradated color for each concentric rectangle
    
  } //constructor()

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    translate(this.w/2, this.w/2);
    strokeWeight(1);
    rectMode(CENTER);
    for (let i = this.w; i>0 ;i--){
      if (i > this.w/2){
        this.amt = map(i, this.w, int(this.w/2), 1, 0);
        this.c = lerpColor(this.clr[1], this.clr[0], this.amt)
      } else {
        this.amt = map(i, this.w/2, 0, 1, 0);
        this.c = lerpColor(this.clr[2], this.clr[1], this.amt)
      }
    stroke(this.c);
    fill(this.c);
    rect(0,0,i,i)
    }
    pop();
  } // end draw()
} // end class Tile

// sets up color schemes used in painting
function colorScheme(sNum) {

  let cSchm = [];
  let colrs = [];
  let cAbbrevs = [];

  cSchm[0] = ['b', 'dbl', 'bl'];
  cSchm[1] = ['bl', 'dr', 'r'];
  cSchm[2] = ['dpr', 'r', 'o'];
  cSchm[3] = ['dr', 'r', 'yo'];
  cSchm[4] = ['b', 'pr', 'pi'];
  cSchm[5] = ['dpr', 'pr', 'pi'];
  cSchm[6] = ['dbl', 'pr', 'o'];
  cSchm[7] = ['dr', 'mr', 'r'];
  cSchm[8] = ['r', 'pi', 'o'];
  cSchm[9] = ['dr', 'pr', 'bl'];
  cSchm[10] = ['b', 'dr', 'o'];

  for (let i = 0; i < 4; i++) {
    let cAbbrev = cSchm[sNum][i];
    colrs[i] = selectColor(cAbbrev);
  }
  return colrs;

}

// produces RBG value for each color in a scheme
function selectColor(cAbbrev) {
  let sCol = color(106, 18, 60);

  if (cAbbrev == 'b') { //black
    sCol = color(5, 5, 5);
  } else if (cAbbrev == 'g') { //dark gray
    sCol = color(115, 115, 115);
  } else if (cAbbrev == 'dbl') { //dark blue
    sCol = color(38, 58, 165);
  } else if (cAbbrev == 'bl') { //blue
    sCol = color(31, 57, 212);
  } else if (cAbbrev == 'dr') { //dark red
    sCol = color(106, 18, 60);
  } else if (cAbbrev == 'mr') { //medium red
    sCol = color(148, 20, 40);
  } else if (cAbbrev == 'r') { //red
    sCol = color(224, 14, 43);
  } else if (cAbbrev == 'o') { //orange
    sCol = color(230, 155, 39);
  } else if (cAbbrev == 'yo') { //yellow orange
    sCol = color(240, 163, 50);
  } else if (cAbbrev == 'mo') { //medium orange
    sCol = color(208, 141, 21);
  } else if (cAbbrev == 'pi') { //pink
    sCol = color(244, 119, 137);
  } else if (cAbbrev == 'dpr') { //dark purple
    sCol = color(104, 52, 115);
  } else if (cAbbrev == 'pr') { //red purple
    sCol = color(86, 43, 102);
  } else if (cAbbrev == 'br') { //brown
    sCol = color(185, 113, 113);
  } else if (cAbbrev == 'mbr') { //medium brown
    sCol = color(147, 85, 66);
  } else {
    sCol = color(255, 255, 255); // else white
  }
  return sCol;
}

// the schemes associated with each tile 
// 6x6 - 36 in all
function initSNums() {
  let snums = [0, 1, 10, 10, 5, 10,
    2, 7, 7, 4, 8, 9,
    7, 2, 5, 6, 0, 3,
    1, 7, 3, 2, 8, 10,
    6, 3, 0, 5, 9, 7,
    7, 10, 10, 7, 1, 10
  ];
  return snums;
}

function keyTyped() {
  if (key == 's' || key == 'S') save('sketch-constellation-in-red.jpg')
}