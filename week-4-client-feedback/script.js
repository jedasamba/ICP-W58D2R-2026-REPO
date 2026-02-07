// State
let feedbackList = [];

// Elements
const form = document.getElementById("feedbackForm");
const feedbacksUL = document.getElementById("feedbacks");
const formMsg = document.getElementById("formMsg");
const searchInput = document.getElementById("search");

// Helper: Render Feedback
function renderFeedbacks(filter = "") {
  feedbacksUL.innerHTML = "";
  const filtered = feedbackList.filter(f => 
    f.name.toLowerCase().includes(filter) || 
    f.message.toLowerCase().includes(filter)
  );

  filtered.forEach(f => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${f.name}</span> (${f.rating}⭐): ${f.message}`;
    feedbacksUL.appendChild(li);
  });
}

// Helper: Sanitize input
function sanitize(str) {
  const temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
}

// Handle form submit
form.addEventListener("submit", e => {
  e.preventDefault();

  const name = sanitize(document.getElementById("name").value);
  const email = sanitize(document.getElementById("email").value);
  const message = sanitize(document.getElementById("message").value);
  const rating = document.getElementById("rating").value;

  feedbackList.push({ name, email, message, rating });
  formMsg.textContent = "Feedback submitted successfully!";
  form.reset();

  renderFeedbacks(searchInput.value);
});

// Handle search (debounced)
let debounceTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    renderFeedbacks(searchInput.value.toLowerCase());
  }, 250); // wait 250ms
});

// Initial render
renderFeedbacks();
