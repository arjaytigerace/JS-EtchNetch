// Function to create a grid of a specified size
function createGrid(size) {
  // Accessing the container div from the DOM
  const container = document.getElementById("grid-container");

  // Setting the grid template columns and rows based on the specified size
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Loop to create each grid item
  for (let i = 0; i < size * size; i++) {
    // Creating a new div element for each grid item
    const gridItem = document.createElement("div");

    // Adding a class to the grid item for styling purposes
    gridItem.classList.add("grid-item");

    // Appending the grid item to the container div
    container.appendChild(gridItem);
  }
}

// Calling the function to create a 16x16 grid
createGrid(16);
