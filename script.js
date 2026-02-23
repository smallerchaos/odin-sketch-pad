// Set canvas size
// Create flexbox rows
// Duplicate flexbox rows to specified columns
// Change canvas size
// Add functionality for on hover
// Add ability to pick different "brushes" (bonus)
// Add clear canvas (bonus)

// HTML Elements Variables
const canvas = document.querySelector("#canvas");
// canvas.classList.add("pink");

// Global Variables
let canvasWidth = 10;
let canvasHeight = 5;

// Create flexbox row
function createRow () {
    const rowContainer = document.createElement("div");
    rowContainer.className = "row";
    for (let i = 0; i < canvasWidth; i++) {
        const pixel = document.createElement("div");
        pixel.textContent = "";
        pixel.className = "pixel";
        rowContainer.appendChild(pixel);
    }
    canvas.appendChild(rowContainer);
}

function createCanvas () {
    for (let i = 0; i < canvasHeight; i++) {
        createRow();
    }
}

createCanvas();