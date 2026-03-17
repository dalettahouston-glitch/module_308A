// main.js
import { fetchCats } from "./api.js";
import { renderCats, updatePageInfo, showMessage } from "./ui.js";

const catsContainer = document.getElementById("cats-container");
const favoritesContainer = document.getElementById("favorites-container");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");
const messageElement = document.getElementById("message");

let currentPage = 1;
const limit = 9;
let currentSearch = "";
let currentCats = [];

// -----------------------------------------------------
// Load Cats from API
// -----------------------------------------------------
async function loadCats() {
  try {
    showMessage(messageElement, "Loading...");
    const cats = await fetchCats(currentPage, limit, currentSearch);

    currentCats = cats;
    renderCats(cats, catsContainer);
    updatePageInfo(currentPage, pageInfo);

    showMessage(messageElement, "");
  } catch (err) {
    showMessage(messageElement, err.message, true);
  }
}

// -----------------------------------------------------
// Search
// -----------------------------------------------------
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchInput.value.trim();
  currentPage = 1;
  loadCats();
});

// -----------------------------------------------------
// Pagination
// -----------------------------------------------------
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadCats();
  }
});

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  loadCats();
});

// -----------------------------------------------------
// Handle Cat Card Clicks (Select Cat)
// -----------------------------------------------------
catsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("select-btn")) {
    const id = e.target.dataset.id;
    const cat = currentCats.find((c) => c.id === id);

    if (cat) {
      addCatToFavorites(cat);
    }
  }
});

// -----------------------------------------------------
// Add Selected Cat to Favorites Section
// -----------------------------------------------------
function addCatToFavorites(cat) {
  const card = document.createElement("div");
  card.classList.add("favorite-card");

  card.innerHTML = `
    <img src="${cat.url}" alt="Selected Cat" />
    <h3>${cat.breeds?.[0]?.name || "Unknown Breed"}</h3>
    <p>${cat.breeds?.[0]?.description || "No description available."}</p>
  `;

  favoritesContainer.appendChild(card);
}

// -----------------------------------------------------
// Initial Load
// -----------------------------------------------------
loadCats();