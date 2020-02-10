"use strict";

var gWin = document.getElementById("mainWindow");
//match css width (and zoom I guess)
gWin.width = gWin.clientWidth;
gWin.height = gWin.clientHeight; 

//get the drawable part of the game window
var cx = gWin.getContext("2d");

// TODO this is far off
class Tile {
	constructor(src) {
		this.image = new Image(20, 20)
			.src = src;
	}
}

//TODO svgs
const minoWidth = 20; //TODO relative

var empty = new Image(minoWidth, minoWidth);
empty.src = "assets/empty.svg";

function translate(x, y) {
	return (rel_x, rel_y) => [x + rel_x, y + rel_y];
}

var well = new (class Well {
	constructor() {
		this.width = 10;
		this.depth = 20;
		this.cells = new Array(this.depth).fill(0)
			.map(() => new Array(this.width).fill(empty));
	}
	draw() {
		let xy = translate(
			gWin.width / 2 - minoWidth * this.width / 2, //center
			gWin.height * 0.2
		);
		//draw boundry
		cx.strokeStyle = "black"
		cx.rect(...xy(0, 0), this.width * minoWidth, this.depth * minoWidth);
		cx.fillStyle = cx.createPattern(empty, "repeat");
		cx.fill();
		cx.stroke();
		//iterate through cells and draw them
		cx.drawImage(empty, 300, 300);
	}
})()
console.log(well);

var palletteTest = {
	draw() {
		for (let piece in pieces) {
			cx.fillStyle = pieces[piece].color;
			cx.fillRect(Math.random()*400, Math.random()*400, 100, 100);
		}
	}
}


//TODO core game loop

//place shadow

//drop shadow

/* Piece and rotation logic. See https://tetris.wiki/Super_Rotation_System */
//TODO reverse all y's

//jLszt
var kick3wide = {
	U: Array(4).fill((0, 0)),
	R: [[-1, 0], [-1, +1], [0, -2], [-1, -2]],
	//D is same as U
	L: [[+1, 0], [+1, +1], [0, -2], [+1, -2]],
}
//i
var kick4wide = {
	U: Array(4).fill((0, 0)),
	R: [[-2, 0], [+1, 0], [-2, -1], [+1, +2]],
	D: [[-3, 0], [+3, 0], [-3, +1], [+3, -1]],
	L: [[-1, 0], [+2, 0], [-1, +2], [+2, -1]],
}

var pieces = {
	j: {
		color: "dodgerblue",
		start:
		[
			[0, 0, 0],
			[1, 1, 1],
			[0, 0, 1],
		]
	},
	i: {
		color: "aqua",
		start:
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[1, 1, 1, 1],
			[0, 0, 0, 0],
		]
	},
	z: {
		color: "red",
		start:
		[
			[1, 1, 0],
			[0, 1, 1],
			[0, 0, 0],
		]
	},
	L: {
		color: "orange",
		start:
		[
			[0, 0, 1],
			[1, 1, 1],
			[0, 0, 0],
		]
	},
	o: {
		color: "yellow",
		start:
		[
			[1, 1],
			[1, 1],
		]
	},
	t: {
		color: "magenta",
		start:
		[
			[0, 1, 0],
			[1, 1, 1],
			[0, 0, 0],
		]
	},
	s: {
		color: "limegreen",
		start:
		[
			[0, 1, 1],
			[1, 1, 0],
			[0, 0, 0],
		]
	},
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

var paused = false;
// TODO fix
// document.body.onKeyDown = onDown;
// document.body.onKeyUp = onUp;
document.addEventListener("keydown", onDown)
document.addEventListener("keyup", onUp)
//when key is pressed, change the movement to true
function onDown(event)
{
	console.log("down: " + event.code);
	mover.going[event.code] = true
}

//undo the keypress
function onUp(event)
{
	console.log("up: " + event.code);
	mover.going[event.code] = false
	if (event.code == "KeyP"){
		paused = !paused;
	}
}

function updateImage()
{
	if (paused) {
		return;
	}
	//draw room
	palletteTest.draw();
	well.draw();
	mover.draw();
}

//60 fps is about 16 ms / frame 
//setInterval(updateImage, 16);
updateImage()
