let seconds = 0, minutes = 0, hours = 0;
let timerInterval = null;
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const infoText = document.getElementById("infoText");
const historyList = document.getElementById("historyList");
const totalTimeEl = document.getElementById("totalTime");

// Total today stored in localStorage
let totalSecondsToday = Number(localStorage.getItem('totalToday') || 0);
updateTotalTimeDisplay();

// Session history from localStorage
let sessionHistory = JSON.parse(localStorage.getItem('sessionHistory') || "[]");
updateHistory();

function updateTimer() {
  seconds++;
  if (seconds === 60) { seconds = 0; minutes++; }
  if (minutes === 60) { minutes = 0; hours++; }
  timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(n){ return String(n).padStart(2,'0'); }

startBtn.addEventListener('click', ()=>{
  if(!timerInterval){
    timerInterval = setInterval(updateTimer, 1000);
    infoText.textContent = "Study session in progress...";
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
  }
});

pauseBtn.addEventListener('click', ()=>{
  clearInterval(timerInterval);
  timerInterval = null;
  infoText.textContent = "Session paused.";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
});

stopBtn.addEventListener('click', ()=>{
  if(hours+minutes+seconds > 0){
    saveSession(hours, minutes, seconds);
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = minutes = hours = 0;
    timerDisplay.textContent = "00:00:00";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    infoText.textContent = "Session stopped.";
  }
});

resetBtn.addEventListener('click', ()=>{
  clearInterval(timerInterval);
  timerInterval = null;
  seconds = minutes = hours = 0;
  timerDisplay.textContent = "00:00:00";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  stopBtn.disabled = true;
  infoText.textContent = "Timer reset. Ready for new session.";
});

darkModeBtn.addEventListener('click', ()=>{
  document.body.classList.toggle('dark-mode');
});

function saveSession(h, m, s){
  let timeStr = `${pad(h)}:${pad(m)}:${pad(s)}`;
  sessionHistory.unshift(timeStr);
  if(sessionHistory.length > 5) sessionHistory.pop();
  localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
  updateHistory();

  totalSecondsToday += h*3600 + m*60 + s;
  localStorage.setItem('totalToday', totalSecondsToday);
  updateTotalTimeDisplay();
}

function updateHistory(){
  historyList.innerHTML = "";
  sessionHistory.forEach((time)=> {
    let li = document.createElement('li'); li.textContent = time;
    historyList.appendChild(li);
  });
}

function updateTotalTimeDisplay(){
  let h = Math.floor(totalSecondsToday/3600);
  let m = Math.floor((totalSecondsToday%3600)/60);
  let s = totalSecondsToday%60;
  totalTimeEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
}
