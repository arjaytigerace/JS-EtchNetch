// Function to create a grid of a specified size
function createGrid(size) {
  // Accessing the container div from the DOM
  const container = document.getElementById("grid-container");

  // Clearing previous grid items if any
  container.innerHTML = "";

  // Setting the grid template columns and rows based on the specified size
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  // Loop to create each grid item
  for (let i = 0; i < size * size; i++) {
    // Creating a new div element for each grid item
    const gridItem = document.createElement("div");

    // Adding a class to the grid item for styling purposes
    gridItem.classList.add("grid-item");

    // Adding event listener for 'mouseover' event on each grid item
    gridItem.addEventListener("mouseover", () => {
      // Change the background color of the grid item when the mouse hovers over it
      gridItem.style.backgroundColor = "black"; // The color can be changed as needed
    });

    // Appending the grid item to the container div
    container.appendChild(gridItem);
  }
}

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
