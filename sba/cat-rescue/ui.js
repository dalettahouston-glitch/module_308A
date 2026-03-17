// ui.js

// -----------------------------------------------------
// Show a message (loading, errors, success)
// -----------------------------------------------------
export function showMessage(element, message, isError = false) {
  element.textContent = message;
  element.style.color = isError ? "red" : "black";
}

// -----------------------------------------------------
// Update pagination text
// -----------------------------------------------------
export function updatePageInfo(currentPage, pageInfoElement) {
  pageInfoElement.textContent = `Page ${currentPage}`;
}

// -----------------------------------------------------
// Render cat cards into the Available Cats section
// -----------------------------------------------------
export function renderCats(cats, container) {
  container.innerHTML = ""; // Clear old results

  if (!cats || cats.length === 0) {
    container.innerHTML = "<p>No cats found.</p>";
    return;
  }

  cats.forEach(cat => {
    const card = document.createElement("div");
    card.classList.add("cat-card");

    card.innerHTML = `
      <img src="${cat.url}" alt="Cat Image" />
      <h3>${cat.breeds?.[0]?.name || "Unknown Breed"}</h3>
      <button class="select-btn" data-id="${cat.id}">Select</button>
    `;

    container.appendChild(card);
  });
}