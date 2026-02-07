const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 2 || message.length < 5 || !email.includes("@")) {
    formMsg.textContent = "Please fill out valid details!";
    formMsg.style.color = "red";
    return;
  }

  formMsg.textContent = "Message sent successfully! 🎉";
  formMsg.style.color = "green";
  form.reset();
});
