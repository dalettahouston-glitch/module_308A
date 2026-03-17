// api.js
const API_KEY = "live_5KKBzHHGBF5IwGF610vL5bRg9RFr4sLvB2iXDo4aNHuVFdlc8rgZNBhGAq8n6YUx";
const BASE_URL = "https://api.thecatapi.com/v1";

// -----------------------------------------------------
// Fetch cats with breed search + pagination
// -----------------------------------------------------
export async function fetchCats(page = 0, limit = 9, searchTerm = "") {
  // Step 1: Get all breeds
  const breedRes = await fetch(`${BASE_URL}/breeds`, {
    headers: { "x-api-key": API_KEY }
  });

  if (!breedRes.ok) {
    throw new Error("Failed to load breed list");
  }

  const breeds = await breedRes.json();

  // Step 2: Match user search to a breed ID
  let breedId = "";
  if (searchTerm.trim()) {
    const match = breeds.find(b =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    breedId = match?.id || "";
  }

  // Step 3: Fetch cats using breed ID
  const url = `${BASE_URL}/images/search?limit=${limit}&page=${page}&breed_ids=${breedId}&has_breeds=1`;

  const res = await fetch(url, {
    headers: { "x-api-key": API_KEY }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cats");
  }

  const data = await res.json();

  // Normalize structure for UI
  return data.map(cat => ({
    id: cat.id,
    url: cat.url,
    breeds: cat.breeds || []
  }));
}