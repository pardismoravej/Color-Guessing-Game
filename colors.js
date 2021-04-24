
const numSquares = 6;
const colors = [];
const pickedColor;
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay" );
const messageDisplay = document.getElementById("message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
const modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	// mode buttons event listeners
	setupModeButtons();
	setupSquares();
	reset();
}

resetButton.addEventListener("click", function(){
	reset();
});

function reset() {
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();
	// change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	// change colors of squares
	for(const i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		} else{
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "#24727b";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
}

function changeColors(color){
	// loop through all squares
	for(const i = 0; i < squares.length; i++){
		// change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	const random = Math.floor(Math.random() * colors.length);
	return colors[random]; 
}

function generateRandomColors(num){
	// make an array
	const arr = []
	// repeat num times
	for(const i = 0; i < num; i++){
		// get random color and push into arr
		arr.push(randomColor())
	}
	// return that array
	return arr;
}

function randomColor(){
	// pick a "red" from 0-255
	const r = Math.floor(Math.random() * 256);
	// pick a "green" from 0-255
	const g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0-255
	const b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function setupModeButtons(){
	for(const i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		})
	}
}

function setupSquares(){
	for(const i = 0; i < squares.length; i++){
		// add click listeners to squares
		squares[i].addEventListener("click", function(){
			// grab color of clicked square
			const clickedColor = this.style.backgroundColor;
			// compare color to pickedColor
			if (clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#131919";
				messageDisplay.textContent = "Try Again";
			}
		});
	} 
}
