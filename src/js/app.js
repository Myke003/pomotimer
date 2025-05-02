import Timer from 'timer.js';

const pomodoro = new Timer(25*60);
const shortBreak = new Timer(5*60);
const longBreak = new Timer(15*60);

document.getElementById('pomodoro').addEventListener('click', ()=>{
  pomodoro.start();
})

document.getElementById('short-break').addEventListener('click', ()=>{
  shortBreak.start();
})

document.getElementById('long-break').addEventListener('click', ()=>{
  longBreak.start();
})