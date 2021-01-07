The objective of this exercise was to utilize the sketch from the previous exercise, drawing an abstract artwork, in order to animate the art piece either in 2D or 3D.

The sketch in this exercise is based on the first sketch of Julian Stanczak 'Constellation in Red' provided in the file 'exercise_2_contemporary_visual_art' in this repository. As noted before, Stanczak was one of the founders and leaders of the Op Art movement. A discussion of the original painting is provided at:

https:geoform.net/artists/julian-stanczak/

A reproduction of the official version (a .png file) is provided in this sub-directory.

It is easy to see from the official version that the painting consists of a series of 36 tiles. Each tile looks as if it consist primarily of 2 or 3 colors, although in all cases there are really slight gradations across a series of colors. In the code generated version in exercise 2 (https://www.openprocessing.org/sketch/1050977, the coloration of each square is a gradation of 3 colors -- working from the outside in. 

In this exercise, I've created 2 sketches:

<ol>
  <li>First sketch -- Twinkling Constellation in Red (https://www.openprocessing.org/sketch/1051532). This sketch is similar to the first version. The major difference is that in the first version in first version were static, while in this instance the tiles can be 'toggled' to flash between two color schemes - the original scheme versus one were the first and third colors are reversed. In addition to the toggle, enables control of the speed with which the tiles are toggled , as well as enabling grid lines to be turned on or off. These events are controlled by the following keys:
    
    <ul>
    <li>Toggle the flashing color schemes -- typing 't' or 'T' toggles the flashing on or off</li>
    <li>Grid lines -- typing 'g' or 'G' turns grid lines on or off</li>
    <li>Frame Rate of the 'drawing' cycle - typing a number between 1-9 changes the rate from 5 to 45 in increments of 5 (5 is the default)</li>
    </ul>
   </li>
  <li>Second sketch -- Starship Constellation in Red (https://www.openprocessing.org/sketch/1053557) -- is a 3D version of the painting (. In this case, .png images of 6 of the original individual tiles are randomly assigned as 'texture' to 3d boxes that are connected by lines in a 3d network structure which rotates. The movement of the overall structure can be controlled by moving the mouse or by zooming in and out off the network. This particular sketch is based on a form of another version by fork of Luis Ruiz (openprocessing.org/sketch/971685) which is a fork of Richard Bourne (openprocessing.org/sketch/770524)</li>
</ol>



