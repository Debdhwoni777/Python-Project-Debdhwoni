let timer;
let isRunning = false;
let elapsedTime = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('stop');
    } else {
        timer = setInterval(updateTime, 1000);
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.add('stop');
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    elapsedTime = 0;
    displayTime(0);
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('stop');
    isRunning = false;
});

function updateTime() {
    elapsedTime += 1;
    displayTime(elapsedTime);
}

function displayTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    display.textContent = `${hrs}:${mins}:${secs}`;
}

// Initialize display
displayTime(0);
