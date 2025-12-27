let startTime = null;
let interval = null;
const target = 10.00;
let isRunning = false; // 🔐 prevents double start

function startTimer() {
  if (isRunning) return; // prevent multiple intervals

  startTime = Date.now();
  interval = setInterval(updateTimer, 50); // smooth & slow
  isRunning = true;

  document.getElementById("result").innerText = "";
  document.body.classList.remove("party");
  document.getElementById("confetti").innerHTML = "";
}

function updateTimer() {
  const elapsed = (Date.now() - startTime) / 1000;
  document.getElementById("timer").innerText = elapsed.toFixed(2);
}

function stopTimer() {
  if (!isRunning) return;

  clearInterval(interval);   // ⏹️ STOP TIMER
  isRunning = false;

  const time = parseFloat(document.getElementById("timer").innerText);

  if (Math.abs(time - target) <= 0.05) {
    win();
  } else {
    showPopup(); // ❌ show custom message box
  }
}

function win() {
  document.getElementById("result").innerText = "🔥 PERFECT!";
  document.body.classList.add("party");

  for (let i = 0; i < 80; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    c.style.animationDuration = (Math.random() * 3 + 2) + "s";
    document.getElementById("confetti").appendChild(c);
  }
}

/* ❌ Wrong attempt popup */
function showPopup() {
  document.getElementById("popup").classList.remove("hidden");
}

/* ✅ OK button → reset game */
function closePopup() {
  document.getElementById("popup").classList.add("hidden");
  resetTimer();
}

/* 🔄 Reset timer cleanly */
function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  startTime = null;
  document.getElementById("timer").innerText = "00.00";
}
