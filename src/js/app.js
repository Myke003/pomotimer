import Timer from './timer.js';

const pomodoroButton = document.getElementById('pomodoro');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');
const timerButton = document.getElementById('timer-btn');

const pomodoro = new Timer(25*60);
const shortBreak = new Timer(5*60);
const longBreak = new Timer(15*60);

let currentTimer = pomodoro;

function stopCurrentTimer(){
  if(currentTimer){
    currentTimer.pause(); 
  }
}

function updateTimerButtonText() {
  if (currentTimer && currentTimer.isRunning) {
    timerButton.textContent = "Pause"; // Si el temporizador está corriendo, pon "Pause"
  } else {
    timerButton.textContent = "Start"; // Si el temporizador está pausado, pon "Start"
  }
}

function switchTimer(timer){
  stopCurrentTimer(timer);
  currentTimer = timer;
  currentTimer.showTime();
  updateTimerButtonText();

}

pomodoroButton.addEventListener('click', () => {
  switchTimer(pomodoro);
  console.log("pomodoro")
});

shortBreakButton.addEventListener('click', () => {
  switchTimer(shortBreak);
});

longBreakButton.addEventListener('click', () => {
  switchTimer(longBreak);
});

// Agregar evento al botón de timer
timerButton.addEventListener('click', () => {
  currentTimer.toggleStartPause();
  updateTimerButtonText();
});

// Inicialización
pomodoro.showTime();
updateTimerButtonText();
