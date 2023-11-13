let currentMode = "random"; // Default mode

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

    gridItem.addEventListener("mouseover", handleMouseOver);

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

// Event listener for the 'Change Grid Size' button
document
  .getElementById("change-size")
  .addEventListener("click", changeGridSize);

// Initial call to create a 16x16 grid
createGrid(16);
