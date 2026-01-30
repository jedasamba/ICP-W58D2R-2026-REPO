const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const statusText = document.getElementById("statusText");

searchBtn.addEventListener("click", searchBooks);

async function searchBooks() {
  const query = searchInput.value.trim();

  if (!query) {
    statusText.textContent = "Please enter a topic to search.";
    return;
  }

  resultsDiv.innerHTML = "";
  statusText.textContent = "Loading resources...";

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    if (data.docs.length === 0) {
      statusText.textContent = "No resources found.";
      return;
    }

    statusText.textContent = `Found ${data.docs.length} results`;

    data.docs.slice(0, 10).forEach(book => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author_name ? book.author_name[0] : "Unknown"}</p>
        <p>First published: ${book.first_publish_year || "N/A"}</p>
      `;

      resultsDiv.appendChild(card);
    });

  } catch (error) {
    statusText.textContent = "Something went wrong. Please try again.";
  }
}
