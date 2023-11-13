let currentMode = "random"; // Default mode
let mouseDown = false; // Variable to track whether the mouse is pressed

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Function to create a grid of a specified size
function createGrid(size) {
  const container = document.getElementById("grid-container");
  container.innerHTML = "";

  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");

    // Initialize custom properties for progressive darkening
    gridItem.dataset.interactions = 0;
    gridItem.dataset.red = Math.floor(Math.random() * 256);
    gridItem.dataset.green = Math.floor(Math.random() * 256);
    gridItem.dataset.blue = Math.floor(Math.random() * 256);

    gridItem.addEventListener("mouseover", (event) => {
      if (mouseDown) {
        handleMouseOver(event);
      }
    });

    container.appendChild(gridItem);
  }
}

// Event handler for mouseover
function handleMouseOver(event) {
  const square = event.target;
  let interactions = parseInt(square.dataset.interactions);

  // Increase interactions count
  interactions++;
  square.dataset.interactions = interactions;

  if (currentMode === "random") {
    if (interactions <= 10) {
      // Calculate the new color by darkening the original color
      const r = Math.floor(square.dataset.red * (1 - 0.1 * interactions));
      const g = Math.floor(square.dataset.green * (1 - 0.1 * interactions));
      const b = Math.floor(square.dataset.blue * (1 - 0.1 * interactions));
      square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else {
      // After 10 interactions, set color to black
      square.style.backgroundColor = "black";
    }
  } else if (currentMode === "black") {
    square.style.backgroundColor = "black";
  }

  // Eraser functionality
  if (currentMode === "eraser") {
    square.style.backgroundColor = ""; // Set to default or blank
  }
}

// Function to change the drawing mode
function changeMode(mode) {
  currentMode = mode;
}

// Event listeners for mode change buttons
document
  .getElementById("black-mode")
  .addEventListener("click", () => changeMode("black"));
document
  .getElementById("random-color-mode")
  .addEventListener("click", () => changeMode("random"));

// Function to change the grid size
function changeGridSize() {
  let newSize = prompt("Enter new grid size (max 100):", 16);
  newSize = parseInt(newSize);
  if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert("Please enter a valid number between 1 and 100.");
  }
}

// Function to reset grid colors
function resetGridColors() {
  const gridItems = document.querySelectorAll("#grid-container .grid-item");
  gridItems.forEach((item) => {
    item.style.backgroundColor = ""; // Reset to default or blank
    item.dataset.interactions = 0; // Reset interaction count if needed
  });
}

// Event listener for the 'Reset Grid Colors' button
document
  .getElementById("reset-colors")
  .addEventListener("click", resetGridColors);

// Event listener for the 'Change Grid Size' button
document
  .getElementById("change-size")
  .addEventListener("click", changeGridSize);

// Event listener for the 'Eraser Mode' button
document
  .getElementById("eraser-mode")
  .addEventListener("click", () => changeMode("eraser"));

// Initial call to create a 16x16 grid
createGrid(16);
