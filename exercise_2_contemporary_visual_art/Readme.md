This is a rendition of Julian Stanczak 'Constellation Red'. Stanczak was one of the founders and leaders of the Op Art movement A copy of the original is provided at:

https:geoform.net/artists/julian-stanczak/

A reproduction is provided in a .png file in this sub-directory. A different rendition ('Constellation in Green') can be found at: 

https:geoform.net/interviews/an-interview-with-artist-julian-stanczak/

From the original version it is easy to see that painting consists of a series of 36 squares. The coloration of each square is a gradation of either 2 or 3 colors -- usually emanating from the center. In the painted version many of the squares appear to consist of grids of smaller squares. This particular feature is not provided in this program.

In this program each square is treated as an object of the same size. The coloration of each square is produced by creating a series of concentric rectangles that are decreasing in size and whose colors are gradated from the edge to the center using the three main colors of the square in the original painting. The code for doing this appears at in the 'display' method of the 'tile' object:

    for (let i = this.w; i>0 ;i--){
      if (i > this.w/2){
        this.amt = map(i, this.w, int(this.w/2), 1, 0);
        this.c = lerpColor(this.clr[1], this.clr[0], this.amt)
      } else {
        this.amt = map(i, this.w/2, 0, 1, 0);
        this.c = lerpColor(this.clr[2], this.clr[1], this.amt)
      }

Basically, those concentric rectangles that are further away than half the distance between the edge and center of the square a gradated
with clr[0] and clr[1], and those that are within half the distance to the center are gradated with clr[1] and clr[2].

As it turns out, many of the squares have the same color scheme. For instance squares (0,0) and (4,2) are the same. Overall, there are only 11 schemes.
Each scheme is designated as an array of abbreviations which is converted into their RBG counterpart. For example, the first square in the upper right corner is has the
following color scheme (see colorScheme function) 

['b', 'dbl', 'bl'] which represents black, dark blue, and blue

These are converted by the 'selectColor' function to:

color(5,5,5), color(38, 58, 165), and color(31, 57,  212).

Both the code and a .png of the resulting output are provided in this sub-directory. They can also be found at: https://www.openprocessing.org/sketch/1050977.
