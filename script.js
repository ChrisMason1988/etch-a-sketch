//Finding the grid container in html and store it in the variable "gridContainer"
var gridContainer = document.querySelector(".grid-container");

// Finds the paragraph in the html which displays the state of the pen.
var pen = document.querySelector(".pen");

// This variable is used to show whether the pen is on or off.
var penOn = false;

// This gradually shades the current gridItem.
function colorShading (currentColor) {
  // Using .match method we look for numbers within the string. 
  // \d+ searches for 1 or more digits in the string. g(global) means it returns all the matches.
  // oldColor is the array of all the matches in currentColor.
  var oldColor = currentColor.match(/\d+/g);
  // We reduce the oldColor by roughly 10% which is 26(starts at 255 which is white)
  var newColor = oldColor[0]-26;
  // Make sure it doesn't go below 0
  if (newColor<0) newColor=0;
  // Return a new rgb string with the new shade.
  return "rgb("+ newColor + "," + newColor + "," + newColor + ")"
}
// This changes the background color when the pen is on.
function colorSwitch () {
  if (penOn) {
    // Finding current color of gridItem and storing it in currentColor.
    var currentColor = this.style.backgroundColor;
    // Call the colorShading function and pass currentColor as a parameter.
    // What the function returns is then set as the background color.
    this.style.backgroundColor = colorShading (currentColor);
  }
}

// This toggles the pen state when the mouse button is clicked.
function togglePen () {
  // The not operator (!) switches the state of penOn between true and false.
  penOn = !penOn
  if (penOn) {
    pen.textContent = "Pen ON";
    // Finding current color of gridItem and storing it in currentColor.
    var currentColor = this.style.backgroundColor;
    // Call the colorShading function and pass currentColor as a parameter.
    // What the function returns is then set as the background color.
    this.style.backgroundColor = colorShading (currentColor);
  }
  else {
    pen.textContent = "Pen OFF";
  }
  
}

function createGrid (gridSize) {
  var gridItem;
  //16x16 = 256
  for (var i = 1; i <= gridSize*gridSize; i++) {
    //Create div element and store it in gridItem
    gridItem = document.createElement("div");
    //Add the class grid-item to that element so that the background and border is formatted to the css
    gridItem.classList.add("grid-item");
    // Set the background color to white using rgb.
    gridItem.style.backgroundColor = "rgb(255,255,255)";
    //Add it to the gridContainer
    gridContainer.appendChild(gridItem);
    // Add the mouseover event to the gridItem's that we created. The colorSwitch function changes the background color .
    gridItem.addEventListener("mouseover", colorSwitch);
    // When the mouse is clicked on a gridItem, the pen state is switched on or off.
    gridItem.addEventListener("click", togglePen);
  }
}
//Creating the initial grid which is 50 by 50
var gridSize = 50;
var gridTemplate = "repeat(" + gridSize + ",calc(100%/" + gridSize + "))";
gridContainer.style.gridTemplateColumns = gridTemplate;
createGrid (gridSize);

//Clear the grid and create a new one of a size entered by the user
function resetGrid () {
  //First ask the user what size they want
  var gridSize = prompt("Please enter grid size:", "50");
  //Check a number has been entered
  if(isNaN(gridSize)) {
    alert ("Please enter a number");
    return;  
  }
  // Check number is between 1 and 100 as the grid shouldn't too big
  if (gridSize > 100 || gridSize < 1) {
    alert ("Please enter a number between 1 and 100");
    return;
  }
  
  //Loop through all the children of the grid container and remove them
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
  
  // Sets the grid size evenly according to the number entered e.g.100%/16
  var gridTemplate = "repeat(" + gridSize + ",calc(100%/" + gridSize + "))";
  gridContainer.style.gridTemplateColumns = gridTemplate;
  createGrid (gridSize);
}

