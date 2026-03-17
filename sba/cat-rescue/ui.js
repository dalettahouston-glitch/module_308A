// ui.js
export function renderCats(cats, container) {
  container.innerHTML = "";

  if (!cats.length) {
    container.innerHTML = "<p>No cats found.</p>";
    return;
  }

  cats.forEach((cat) => {
    const card = document.createElement("article");
    card.className = "cat-card";

    card.innerHTML = `
      <h3>${escapeHtml(cat.title)}</h3>
      <p>${escapeHtml(cat.body)}</p>
      <div class="cat-actions">
        <button data-id="${cat.id}" class="edit-btn">Edit</button>
        <button data-id="${cat.id}" class="adopt-btn">Mark Adopted</button>
      </div>
    `;

    container.appendChild(card);
  });
}

export function updatePageInfo(page, element) {
  element.textContent = `Page ${page}`;
}

export function showMessage(messageElement, text, isError = false) {
  messageElement.textContent = text;
  messageElement.style.color = isError ? "red" : "green";
}

export function fillFormForEdit(formElements, cat) {
  formElements.id.value = cat.id;
  formElements.name.value = cat.title;
  formElements.description.value = cat.body;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return map[c];
  });
}