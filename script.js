// Set canvas size
// Create flexbox rows
// Duplicate flexbox rows to specified columns
// Change canvas size
// Add functionality for on hover
// Add ability to pick different "brushes" (bonus)
// Add clear canvas (bonus)

// ---------- Variables ---------- //

// HTML Elements Variables
const canvas = document.querySelector("#canvas");
const canvasWidthInput = document.querySelector("#canvas-width");
const canvasHeightInput = document.querySelector("#canvas-height");
const setCanvasSizeButon = document.querySelector("#set-canvas-size");
const canvasSizeErrorElement = document.querySelector(".canvas-size-error");
const brushesContainer = document.querySelector("#brushes");

const paintButton = document.querySelector("#paint");
const randomColorPaintButton = document.querySelector("#random-color-paint");
const eraserButton = document.querySelector("#eraser");

// Input Defaults
canvasWidthInput.value = 10;
canvasHeightInput.value = 10;

// Global Variables
const canvasWidthMin = 10;
const canvasHeightMin = 10;
const canvasWidthMax = 100;
const canvasHeightMax = 100;
let canvasWidth = canvasWidthMin;
let canvasHeight = canvasHeightMin;
let pixelCalculatedWidth = 0;
let isPaint = true;
let isRandomPaint = false;
let isEraser = false;

// ---------- Functionality ---------- //

// Set canvas size
setCanvasSizeButon.addEventListener("click", (event) => {
    setCanvasSize();
})
function setCanvasSize () {
    const width = canvasWidthInput.value;
    const height = canvasHeightInput.value;

    if (width < canvasWidthMin ||
    height < canvasHeightMin ||
    width > canvasWidthMax ||
    height > canvasHeightMax) {
        canvasSizeErrorElement.textContent = "Please select a number between 10 and 100";
        canvasSizeErrorElement.classList.remove("hidden");
    } else {
        canvasSizeErrorElement.classList.add("hidden");
        destroyCanvas();
        canvasWidth = width;
        canvasHeight = height;
        createCanvas();
        brushesContainer.classList.remove("hidden");

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
            if (isEraser == true) {
                pixel.classList.remove("colored");
                pixel.removeAttribute("style");
            } else if (isPaint == true) {
                pixel.classList.add("colored");
                pixel.removeAttribute("style");
            } else if (isRandomPaint == true) {
                if (pixel.getAttribute("style") == null) {
                    pixel.setAttribute("style", `background-color: rgb(${randomRgb()}, ${randomRgb()}, ${randomRgb()});`);
                }
            }
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

// Brush types
paintButton.addEventListener("click", () => {
    isPaint = true;
    paintButton.classList.add("active");
    isRandomPaint = false;
    randomColorPaintButton.classList.remove("active");
    isEraser = false;
    eraserButton.classList.remove("active");
});

randomColorPaintButton.addEventListener("click", () => {
    isPaint = false;
    paintButton.classList.remove("active");
    isRandomPaint = true;
    randomColorPaintButton.classList.add("active");
    isEraser = false;
    eraserButton.classList.remove("active");
});

eraserButton.addEventListener("click", () => {
    isPaint = false;
    paintButton.classList.remove("active");
    isRandomPaint = false;
    randomColorPaintButton.classList.remove("active");
    isEraser = true;
    eraserButton.classList.add("active");
});

function randomRgb () {
    return Math.round(Math.random() * 255);
}