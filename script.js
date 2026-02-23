// Set canvas size
// Create flexbox rows
// Duplicate flexbox rows to specified columns
// Change canvas size
// Add functionality for on hover
// Add ability to pick different "brushes" (bonus)
// Add clear canvas (bonus)

// HTML Elements Variables
const canvas = document.querySelector("#canvas");
const canvasWidthInput = document.querySelector("#canvas-width");
const canvasHeightInput = document.querySelector("#canvas-height");
const setCanvasSizeButon = document.querySelector("#set-canvas-size");
const canvasSizeErrorElement = document.querySelector(".canvas-size-error");

// Input Defaults
canvasWidthInput.value = 10;
canvasHeightInput.value = 10;

// Global Variables
const canvasWidthMinimum = 10;
const canvasHeightMinimum = 10;
let canvasWidth = canvasWidthMinimum;
let canvasHeight = canvasHeightMinimum;
let pixelCalculatedWidth = 0;

// Set canvas size
setCanvasSizeButon.addEventListener("click", (event) => {
    setCanvasSize();
})
function setCanvasSize () {
    const width = canvasWidthInput.value;
    const height = canvasHeightInput.value;

    if (width < canvasWidthMinimum|| height < canvasHeightMinimum) {
        canvasSizeErrorElement.textContent = "Please select a number between 10 and 100";
        canvasSizeErrorElement.classList.remove("hidden");
    } else {
        canvasSizeErrorElement.classList.add("hidden");
        destroyCanvas();
        canvasWidth = width;
        canvasHeight = height;
        createCanvas();

        // Make row same height as pixel width for nice square shape
        const pixel = document.querySelector(".pixel");
        pixelCalculatedWidth = pixel.getBoundingClientRect().width;
        const allRows = document.querySelectorAll(".row");
        console.log(`allRows = ${allRows}`);
        allRows.forEach((item) => {
            item.setAttribute("style", `height: ${pixelCalculatedWidth}px`);
        });
    }

}

// Create flexbox row (with correct number of pixels)
function createRow () {
    const rowContainer = document.createElement("div");
    rowContainer.className = "row";
    for (let i = 0; i < canvasWidth; i++) {
        const pixel = document.createElement("div");
        pixel.textContent = "";
        pixel.className = "pixel";
        pixel.addEventListener("mouseenter", () => {
            pixel.classList.add("colored");
        });
        rowContainer.appendChild(pixel);
    }
    canvas.appendChild(rowContainer);
}

// Create canvas (add correct number of rows)
function createCanvas () {
    for (let i = 0; i < canvasHeight; i++) {
        createRow();
    }
}

// Remove existing rows
function destroyCanvas () {
    while (document.querySelector(".row") !== null) {
        const child = document.querySelector(".row");
        canvas.removeChild(child);
    }
}