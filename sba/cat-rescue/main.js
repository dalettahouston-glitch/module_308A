// main.js
import { fetchCats, createCat, updateCat } from "./api.js";
import {
  renderCats,
  updatePageInfo,
  showMessage,
  fillFormForEdit,
} from "./ui.js";

const catsContainer = document.getElementById("cats-container");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");
const catForm = document.getElementById("cat-form");
const catIdInput = document.getElementById("cat-id");
const catNameInput = document.getElementById("cat-name");
const catDescriptionInput = document.getElementById("cat-description");
const messageElement = document.getElementById("message");

let currentPage = 1;
const limit = 9;
let currentSearch = "";
let currentCats = [];

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

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchInput.value;
  currentPage = 1;
  loadCats();
});

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

catForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = catNameInput.value.trim();
  const description = catDescriptionInput.value.trim();
  const id = catIdInput.value;

  if (!name || !description) {
    showMessage(messageElement, "Name and description required.", true);
    return;
  }

  try {
    showMessage(messageElement, "Saving...");

    if (id) {
      await updateCat(id, { title: name, body: description });
      showMessage(messageElement, "Cat updated!");
    } else {
      await createCat({ title: name, body: description });
      showMessage(messageElement, "Cat added!");
    }

    catForm.reset();
    catIdInput.value = "";
    loadCats();
  } catch (err) {
    showMessage(messageElement, err.message, true);
  }
});

catsContainer.addEventListener("click", async (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("edit-btn")) {
    const cat = currentCats.find((c) => c.id === id);
    if (cat) {
      fillFormForEdit(
        { id: catIdInput, name: catNameInput, description: catDescriptionInput },
        cat
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (e.target.classList.contains("adopt-btn")) {
    await updateCat(id, { adopted: true });
    showMessage(messageElement, "Cat marked as adopted!");
  }
});

loadCats();