/* 
	snake.js

	This file contains a JS implementation for the snake. It is 
	done using DOM manipulation and time out events to animate
	the snake.
*/
(function(){
	"use strict";

	// variable declarations for the game
	var food = null,
	SNAKE_LENGTH = 3,
	SNAKE_SPACING = 2,
	playArea = null,
	areaStyle = null,
	direction = 'down', // can be 'down', 'up', 'left', 'right'
	id;

	// attach this event to the window so that we can play the game without clicking a specific element first
	window.addEventListener("keydown", function(event) {
		
		if (event.defaultPrevented) {
			return; // do nothing if the event was already handled
		}
 
		switch (event.key) {

			// Part 1
			case "w":
			case "ArrowUp":
				if (direction != "down")
					direction = "up";
				break;
			case "s":
			case "ArrowDown":
				if (direction != "up")
					direction = "down";
				break;
			case "d":
			case "ArrowRight":
				if (direction != "left")
					direction = "right";
				break;
			case "a":
			case "ArrowLeft":
				if (direction != "right")
					direction = "left";
				break;
			

			default:
				// console.log("The " + event.key + " was pressed");
				return; // use 'return' instead of 'break' so that other key handlers can run for keys we don't support
		
		}


		event.preventDefault(); // cancels the event so it doesn't get handled twice

	}, true); // use capture to prevent any other arrow keydown handlers from getting executed

	// part - the html element that is displayed as this segment of the snake
	// compStyle - the most recent styles of the element, we use this to get the latest top & left values
	function SnakePart(part) {
		this.part = part;
		this.compStyle = getComputedStyle(part);
	}

	// snakeParts - an list of SnakeParts that make up the snake
	// snakeLength - the number of parts that make up the snake
	function Snake(length) {
		this.snakeParts = [];
		this.snakeLength = length;
	}

	// PART 2
	// checks to see if the head of the snake has collided with the food
	Snake.prototype.isFoodEaten = function () {
		var head = this.snakeParts[0];
		return (head.compStyle.left == food.compStyle.left && head.compStyle.top == food.compStyle.top);
		//no point in using ParseInt since the strings will be equal iff the numbers would be...
	};

	Snake.prototype.initSnake = function () {
		this.snakeParts.push(new SnakePart(document.getElementById("snake")));
		// get the element and styles for the play area
		playArea = document.getElementById("play-area");
		areaStyle = getComputedStyle(playArea);

		// create additional snake parts to make the whole snake
		for (var i = 1; i < this.snakeLength; i++) {
			var snakePart = this.snakeParts[0].part.cloneNode();
			snakePart.id = this.snakeParts[0].part.id + i;
			playArea.appendChild(snakePart);
			var newPart = new SnakePart(snakePart);
			newPart.part.style.top = parseInt(newPart.compStyle.top) - ((parseInt(newPart.compStyle.height) + SNAKE_SPACING) * i)  + "px";
			this.snakeParts.push(newPart);
		}

		// Init food, just a clone of a snakePart with new styles
		var foodPart = this.snakeParts[0].part.cloneNode();
		foodPart.id = this.snakeParts[0].part.id + i;
		foodPart.style.borderRadius = SNAKE_SPACING + "px";
		foodPart.style.backgroundColor = "green";
		playArea.appendChild(foodPart);
		food = new SnakePart(foodPart);
		var foodHeight = parseInt(food.compStyle.height) + SNAKE_SPACING;
		var foodWidth = parseInt(food.compStyle.width) + SNAKE_SPACING;
		// randomly place the food
		food.part.style.top = Math.round(Math.random() * (parseInt(areaStyle.height) - foodHeight) / foodHeight) * foodHeight + 2 + "px";
		food.part.style.left = Math.round(Math.random() * (parseInt(areaStyle.width) - foodWidth) / foodWidth) * foodWidth + 2 + "px";
	};

	// this function moves the snake in the play area by changing its 'left' and 'top' properties.
	// It also checks that the snake is within the play area and ends the game if it ever goes past 
	// the game boundary
	Snake.prototype.redrawSnake = function () {
		var tail = this.snakeParts.pop();
		

		//Now THIS is snake (new code)
		if (this.isFoodEaten()) {
			//add tail. surprisingly hard.
			var newtail = tail.part.cloneNode();
			playArea.appendChild(newtail);
			var tail2 = new SnakePart(newtail);
			this.snakeParts.push(tail2);
			tail2.part.id = this.snakeParts[0].part.id + this.snakeLength;
			this.snakeLength++;

			//sure why not
			playArea.style.borderColor = 'green'; 
			setTimeout( function() {playArea.style.borderColor = 'black';}, 75 * 5);

		
			// randomly place the food
			var foodHeight = parseInt(food.compStyle.height) + SNAKE_SPACING;
			var foodWidth = parseInt(food.compStyle.width) + SNAKE_SPACING;
			food.part.style.top = Math.round(Math.random() * (parseInt(areaStyle.height) - foodHeight) / foodHeight) * foodHeight + 2 + "px";
			food.part.style.left = Math.round(Math.random() * (parseInt(areaStyle.width) - foodWidth) / foodWidth) * foodWidth + 2 + "px";
		}

		var newTop = parseInt(this.snakeParts[0].compStyle.top);
		var newLeft = parseInt(this.snakeParts[0].compStyle.left);


		switch (direction) {
			case "left":
				newLeft = newLeft - (parseInt(tail.compStyle.width) + SNAKE_SPACING);
				break;
			case "up":
				newTop = newTop - (parseInt(tail.compStyle.height) + SNAKE_SPACING);
				break;
			case "right":
				newLeft = newLeft + (parseInt(tail.compStyle.width) + SNAKE_SPACING);
				break;
			case "down":
				newTop = newTop + (parseInt(tail.compStyle.height) + SNAKE_SPACING);
				break;
		}

		this.snakeParts.unshift(tail); //new head

		tail.part.style.top = newTop + "px";
		tail.part.style.left = newLeft + "px";
		

		// THIS IS NOT SNAKE >:( >:( >:(
//		if (this.isFoodEaten()) {
//			playArea.style.borderColor = 'green';
//			setTimeout(function() {
//				alert("You Win!");
//				clearInterval(id);
//			}, 5);
//			return;
//		}

		//Also new: collision
		for (let i = 1; i < this.snakeLength; ++i) {
			let ele = this.snakeParts[i];
			if (parseInt(ele.part.style.top) == newTop && parseInt(ele.part.style.left) == newLeft)
			{
				playArea.style.borderColor = 'red';
				setTimeout(function() {
					alert("Game Over");
					clearInterval(id);
				}, 5);
			}
		}

		if (parseInt(tail.compStyle.top) < SNAKE_SPACING	||	parseInt(tail.compStyle.bottom) < SNAKE_SPACING ||
			parseInt(tail.compStyle.left) < SNAKE_SPACING	||	parseInt(tail.compStyle.right) < SNAKE_SPACING) {
			playArea.style.borderColor = 'red';
			setTimeout(function() {
				alert("Game Over");
				clearInterval(id);
			}, 5);
		}
	};

	document.addEventListener("DOMContentLoaded", function() {
		var snake = new Snake(SNAKE_LENGTH);
		snake.initSnake();
		id = setInterval(function() {
			snake.redrawSnake();
		}, 75);

		// this can be used to test, especially if you have no way to end the game i.e. your boundary checks aren't working
		// setTimeout(function() { clearInterval(id); }, 7000);
	});

})();
