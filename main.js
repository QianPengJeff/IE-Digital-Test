// global variables
var id = "";
var positionX;
var positionY;
var position = "";
var faceDirection = "";

// update the style of the grid when the robot move out
function oldStyle(id) {
	document.getElementById( id ).style.background	= "gray";
	document.getElementById( id ).style.border	= "none";
	document.getElementById( id ).innerHTML = ""+id;
}

// update the style of the grid when the robot move in
function newStyle(id){						
	document.getElementById( id ).style.background	= "#0000FF";
	document.getElementById( id ).innerHTML = "";
}

// the place function
function place(x,y,f){
	id =  x + "-" + y;
	positionX = parseInt(x);
	positionY = parseInt(y);
	position = ""+x+y;
	f = f.toUpperCase();
	faceDirection = f;
	
	document.getElementById( id ).style.background	= "#0000FF";
	document.getElementById(id).innerHTML = "";
	
	if(f == "NORTH"){
		document.getElementById( id ).style.borderTop	= "thick solid #0000FF";
	}else if (f == "SOUTH") {
		document.getElementById( id ).style.borderBottom	= "thick solid #0000FF";
	}else if (f == "EAST") {
		document.getElementById( id ).style.borderRight	= "thick solid #0000FF";
	}else if (f == "WEST") {
		document.getElementById( id ).style.borderLeft	= "thick solid #0000FF";
	}
}

// the move function
function move(){
	if(faceDirection == "NORTH" && positionY < 4){
		oldStyle(id);
		positionY = parseInt(positionY) + 1;
		id =  positionX + "-" + positionY;
		position = ""+positionX+positionY;
		newStyle(id);
		document.getElementById( id ).style.borderTop	= "thick solid #0000FF";
	}else if (faceDirection == "SOUTH" && positionY > 0) {
		oldStyle(id);
		positionY = parseInt(positionY) - 1;
		id =  positionX + "-" + positionY;
		position = ""+positionX+positionY;
		newStyle(id);
		document.getElementById( id ).style.borderBottom	= "thick solid #0000FF";
	}else if (faceDirection == "EAST" && positionX < 4) {
		oldStyle(id);
		positionX = parseInt(positionX) + 1;
		id =  positionX + "-" + positionY;
		position = ""+positionX+positionY;
		newStyle(id);
		document.getElementById( id ).style.borderRight	= "thick solid #0000FF";
	}else if (faceDirection == "WEST" && positionX > 0) {
		oldStyle(id);
		positionX = parseInt(positionX) - 1;
		id =  positionX + "-" + positionY;
		position = ""+positionX+positionY;
		newStyle(id);
		document.getElementById( id ).style.borderLeft	= "thick solid #0000FF";
	}else {
		alert("Cannot go forward, please change the direction");
		console.log("error");
	}
}

// report the out put
function report(){
	console.log(id);
	console.log(position);
	console.log(faceDirection);
	document.getElementById("outPut").innerHTML = "Output: " + positionX +"," + positionY + "," + faceDirection;
}

//left function
function left(){
	if(faceDirection == "NORTH"){
		faceDirection = "WEST";
		document.getElementById( id ).style.border	= "none";
		document.getElementById( id ).style.borderLeft	= "thick solid #0000FF";	
	}else if (faceDirection == "SOUTH") {
		faceDirection = "EAST";
		document.getElementById( id ).style.border	= "none";
		document.getElementById( id ).style.borderRight	= "thick solid #0000FF";
	}else if (faceDirection == "EAST") {
		faceDirection = "NORTH";
		document.getElementById( id ).style.border	= "none";
		document.getElementById( id ).style.borderTop	= "thick solid #0000FF";
	}else if (faceDirection == "WEST") {
		faceDirection = "SOUTH";
		document.getElementById( id ).style.border	= "none";
		document.getElementById( id ).style.borderBottom	= "thick solid #0000FF";
	}
}

//the right function
function right(){
	if(faceDirection == "NORTH"){
		faceDirection = "EAST";
		document.getElementById( id ).style.border	= "none";
		document.getElementById( id ).style.borderRight	= "thick solid #0000FF";	
	}else if (faceDirection == "SOUTH") {
		faceDirection = "WEST";
		document.getElementById( id ).style.border	= "none";
		document.getElementById( id ).style.borderLeft	= "thick solid #0000FF";
	}else if (faceDirection == "EAST") {
		faceDirection = "SOUTH";
		document.getElementById( id ).style.border	= "none";
		document.getElementById( id ).style.borderBottom	= "thick solid #0000FF";
	}else if (faceDirection == "WEST") {
		faceDirection = "NORTH";
		document.getElementById( id ).style.border	= "none";
		document.getElementById( id ).style.borderTop	= "thick solid #0000FF";
	}
}

// deal with the user input
function userInput(str){
	let commandType = str.split(" ", 1).toString().toUpperCase();
	if (positionX == undefined && positionX == null && positionY == undefined && positionY == null) {				
		if (str.indexOf(' ') >= 0) {
			let strArray = str.split(',');
			let posX = strArray[0].split(" ")[1].toString();
			let posY = strArray[1];
			let direction = strArray[2];		
			if (commandType == "PLACE") {
				place(posX,posY,direction);
				console.log("place");
			}else {
				console.log("error");
			}
		}else {
			alert("Please enter the PLACE command first");					
		}	
	}else if (commandType == "PLACE" && positionX != undefined && positionX != null && positionY != undefined && positionY != null) {
		if (str.indexOf(' ') >= 0) {
			let strArray = str.split(',');
			let posX = strArray[0].split(" ")[1].toString();
			let posY = strArray[1];
			let direction = strArray[2];
			oldStyle(id);		
			place(posX,posY,direction);
		}else {
			console.log("error");
		}
	}else {
		console.log(commandType);
		if (commandType == "MOVE") {
			move();
			console.log("move");
		}else if (commandType == "LEFT") {
			left();
			console.log("left");
		}else if (commandType == "RIGHT") {
			right();
			console.log("right");
		}else if (commandType == "REPORT") {
			report();
		}else {
			console.log("error");
		}
	}
				
}

// get the user input and execute the command		
function getInputValue() {
	let str = document.getElementById('textInput').value;
	userInput(str);
}
