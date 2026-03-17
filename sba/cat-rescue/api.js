// api.js
const API_KEY = "live_0uXib1jEJihjeqVqO2w9jRUsfd0RnHHDCG4NujOJAF4GipsiFRP21Hl7xgmeXGZx"; 
const BASE_URL = "https://api.thecatapi.com/v1";

// GET cats with pagination
export async function fetchCats(page = 0, limit = 9, searchTerm = "") {
  const url = `${BASE_URL}/images/search?limit=${limit}&page=${page}&order=ASC&has_breeds=1`;

  const res = await fetch(url, {
    headers: { "x-api-key": API_KEY }
  });

  if (!res.ok) throw new Error("Failed to fetch cats");
  let data = await res.json();

  // Filter by breed name if searching
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();
    data = data.filter((cat) =>
      cat.breeds[0]?.name.toLowerCase().includes(term)
    );
  }

  return data;
}

// POST: Add cat to favorites
export async function favoriteCat(imageId) {
  const res = await fetch(`${BASE_URL}/favourites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY
    },
    body: JSON.stringify({ image_id: imageId })
  });

  if (!res.ok) throw new Error("Failed to favorite cat");
  return res.json();
}

// GET favorites
export async function fetchFavorites() {
  const res = await fetch(`${BASE_URL}/favourites`, {
    headers: { "x-api-key": API_KEY }
  });

  if (!res.ok) throw new Error("Failed to load favorites");
  return res.json();
}

// DELETE favorite (mark adopted)
export async function adoptCat(favoriteId) {
  const res = await fetch(`${BASE_URL}/favourites/${favoriteId}`, {
    method: "DELETE",
    headers: { "x-api-key": API_KEY }
  });

  if (!res.ok) throw new Error("Failed to mark adopted");
  return true;
}