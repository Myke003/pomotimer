import '../styles/style.css';

import Timer from './timer.js';

const pomodoroButton = document.getElementById('pomodoro');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');
const timerButton = document.getElementById('timer-btn');

/* 
pomodoro = 25 * 60
shortBreak = 5 * 60
longBreak = 15 * 60
*/

const pomodoro = new Timer(10);
const shortBreak = new Timer(5*60);
const longBreak = new Timer(15*60);

let currentTimer = pomodoro;

function stopCurrentTimer(){
  if(currentTimer){
    currentTimer.reset(); 
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

timerButton.addEventListener('click', () => {
  currentTimer.toggleStartPause();
  updateTimerButtonText();
});

pomodoro.showTime();
updateTimerButtonText();
