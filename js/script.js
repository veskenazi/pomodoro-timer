// Displays
let sessionDisplay = document.getElementById("sessionDisplay");
let breakDisplay = document.getElementById("breakDisplay");
let currentStatusDisplay = document.getElementById("currentStatusDisplay");
let timerDisplay = document.getElementById("timerDisplay");

// Settings
let minusSessionBtn = document.getElementById("minusSessionBtn");
let plusSessionBtn = document.getElementById("plusSessionBtn");
let minusBreakBtn = document.getElementById("minusBreakBtn");
let plusBreakBtn = document.getElementById("plusBreakBtn");
let startBtn = document.getElementById("startBtn");
let refreshBtn = document.getElementById("refreshBtn");
let pauseBtn = document.getElementById("pauseBtn");
let stopBtn = document.getElementById("stopBtn");
let timeOutSound = document.getElementById("timeOutSound");

// Default Values
let sessionMinutes = 25;
let breakMinutes = 5;

// Timer
const timer = {
    sessionTime: sessionMinutes * 60,
    breakTime: breakMinutes * 60,
    isPaused: true,
    status: "Session"
};

// Controls
minusSessionBtn.addEventListener("click", () => {
    if (sessionMinutes > 1) {
        sessionMinutes -= 1;
        updateValues();
        updateDisplays();
    }
});

plusSessionBtn.addEventListener("click", () => {
    if (sessionMinutes < 60) {
        sessionMinutes += 1;
        updateValues();
        updateDisplays();
    }
});

minusBreakBtn.addEventListener("click", () => {
    if (breakMinutes > 1) {
        breakMinutes -= 1;
        updateValues();
        updateDisplays();
    }
});

plusBreakBtn.addEventListener("click", () => {
    if (breakMinutes < 60) {
        breakMinutes += 1;
        updateValues();
        updateDisplays();
    }
});

startBtn.addEventListener("click", () => {
    timer.isPaused = false;
});

refreshBtn.addEventListener("click", () => {
    sessionMinutes = 25;
    breakMinutes = 5;
    timer.isPaused = true;
    timer.status = "Session";
    updateValues();
    updateDisplays();
})

pauseBtn.addEventListener("click", () => {
    timer.isPaused = true;
});

stopBtn.addEventListener("click", () => {
    timer.isPaused = true;
    timer.status = "Session";
    updateValues();
    updateDisplays();
});


// Updating values
const updateValues = () => {
    timer.sessionTime = sessionMinutes * 60;
    timer.breakTime = breakMinutes * 60;
}

// Updating displays
const updateDisplays = () => {
    sessionDisplay.textContent = sessionMinutes;
    breakDisplay.textContent = breakMinutes;
    currentStatusDisplay.textContent = timer.status;

    let currentMinutes;
    let currentSeconds;
    switch (timer.status) {
        case "Session":
            currentMinutes = parseInt(timer.sessionTime / 60);
            currentSeconds = parseInt(timer.sessionTime % 60);
            break;

        case "Break":
            currentMinutes = parseInt(timer.breakTime / 60);
            currentSeconds = parseInt(timer.breakTime % 60);  
    }
    colorTimerDisplay(currentMinutes, currentSeconds);

    currentMinutes = (currentMinutes < 10) ? "0" + currentMinutes : currentMinutes;
    currentSeconds = (currentSeconds < 10) ? "0" + currentSeconds : currentSeconds;
    timerDisplay.textContent = currentMinutes + ":" + currentSeconds;

    if (parseInt(currentMinutes) == 0 && parseInt(currentSeconds) == 0) {
        timeOutSound.play();
        switch (currentStatusDisplay.textContent) {
            case "Session":
                timer.status = "Break";
                break;
            case "Break":
                timer.status = "Session";
        }
        updateDisplays();
    }
}

// Starting the timer
window.setInterval(() => {
    if (!timer.isPaused) {
        switch (timer.status) {
            case "Session":
                timer.sessionTime -= 1;
                break;
            case "Break":
                timer.breakTime -= 1;
        }
        updateDisplays();
    }
}, 1000);

// Coloring the timer's display
const colorTimerDisplay = (currentMinutes, currentSeconds) => {
    let initialMinutes = (timer.status == "Session") ? sessionMinutes : breakMinutes;
    if (currentMinutes == initialMinutes && !timer.isPaused) {
        timerDisplay.style.color = "green";
    } else if (currentMinutes < initialMinutes) {
        if (currentMinutes != 0 || (currentMinutes == 0 && currentSeconds > 15)) {
            timerDisplay.style.color = "green";
        } else if (currentMinutes == 0 && (currentSeconds > 5 && currentSeconds <= 15)) {
            timerDisplay.style.color = "yellow";
        } else {
            timerDisplay.style.color = "red";
        }
    } else {
        timerDisplay.style.color = "white";
    }
}