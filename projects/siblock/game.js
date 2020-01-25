"use strict";
//centering game window
// var pageW = window.innerWidth; //webpage width
// var pageH = window.innerHeight; //webpage height
var gWin = $("#gameWin");
// var winW = gWin.width();
// var winH = gWin.height();
// var winTop = gWin.offset().top; //dist from top to game window
// var winLeft = gWin.offset().left;

//get the drawable part of the game window
var cx = gWin[0].getContext("2d");
// usage:
// cx.fillStyle = "brown";
// cx.fillRect(this.x, this.y, this.width, this.height);

var gameBoard = {
	//10x10 array
	cells: new Array(10).fill(0).map(() => new Array(10).fill(0 /*TODO replace with empty cells*/)),
	draw() {
		cx.fillStyle = "brown";
		cx.fillRect(20, 20, 100, 100);
		//iterate through cells and draw them
	}
}
console.log(gameBoard);

//TODO svgs

//TODO core game loop

//10x10 array of cells

//place shadow

//drop shadow

var pieces = {
	j: {color: "", kick: () => {}},
	i: {color: "", kick: () => {}},
	z: {color: "", kick: () => {}},
	L: {color: "", kick: () => {}},
	o: {color: "", kick: () => {}},
	t: {color: "", kick: () => {}},
	s: {color: "", kick: () => {}},
}

//kick tables)

//style??

var mover = {
	//usage: going.left = true
	going: {},
	draw() {

	}
}

// TODO replace all of this with on drag and drop events lmao

// TODO custom keybindings
var keycodes = {
	w: 87,
	a: 65,
	s: 83,
	d: 68,
	left: 37,
	up: 38,
	right: 39,
	down: 40,
}
// var code to keyname is reverse map

// TODO fix
// document.body.onKeyDown = onDown;
// document.body.onKeyUp = onUp;
$("body").keydown(onDown);
$("body").keyup(onUp);
//when key is pressed, change the movement to true
function onDown(event)
{
	console.log("down: " + event.keyCode);
	mover.going[event.keyCode] = true
}

//undo the keypress
function onUp(event)
{
	console.log("up: " + event.keyCode);
	mover.going[event.keyCode] = false
}

function updateImage()
{
	//draw room
	gameBoard.draw()
	if (mover.draw) {
		mover.draw();
	}
}

//60 fps is about 16 ms / frame 
setInterval(updateImage, 16);
