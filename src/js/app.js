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

const pomodoro = new Timer(25*60);
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

function switchButton(pomoButton) {
  const buttons = document.querySelectorAll('.pomo-btn');
  buttons.forEach(btn => btn.classList.remove('pomo-btn-active'));
  pomoButton.classList.add('pomo-btn-active');
}

timerButton.addEventListener('click', () => {
  currentTimer.toggleStartPause();
  updateTimerButtonText();
});

const timerMap = [
  {button: pomodoroButton, timer: pomodoro},
  {button: shortBreakButton, timer: shortBreak},
  {button: longBreakButton, timer: longBreak}
];

timerMap.forEach(({button, timer})=>{
  button.addEventListener('click', ()=>{
    switchTimer(timer);
    switchButton(button);
  });
})

pomodoro.showTime();
updateTimerButtonText();
