let seconds = 0;
let minutes = 0;
let hours = 0;
let timerInterval = null;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const infoText = document.getElementById("infoText");

function updateTimer() {
  seconds++;

  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes === 60) {
    minutes = 0;
    hours++;
  }

  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");

  timerDisplay.textContent = `${h}:${m}:${s}`;
}

startBtn.addEventListener("click", () => {
  if (!timerInterval) {
    timerInterval = setInterval(updateTimer, 1000);
    infoText.textContent = "Study session in progress...";
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  infoText.textContent = `Session stopped at ${timerDisplay.textContent}`;
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  seconds = 0;
  minutes = 0;
  hours = 0;
  timerDisplay.textContent = "00:00:00";
  infoText.textContent = "Timer reset. Ready for a new session.";
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
