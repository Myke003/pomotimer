import '../styles/style.css';
import Timer from './timer.js';

document.addEventListener('DOMContentLoaded', () => {
  const pomodoroButton = document.getElementById('pomodoro');
  const shortBreakButton = document.getElementById('short-break');
  const longBreakButton = document.getElementById('long-break');
  const timerButton = document.getElementById('timer-btn');

  // Verificar que los elementos existen
  if (!pomodoroButton || !shortBreakButton || !longBreakButton || !timerButton) {
    console.error('No se pudieron encontrar todos los elementos necesarios en el DOM');
    return;
  }

  /* 
  pomodoro = 25 * 60 (25 minutos)
  shortBreak = 5 * 60 (5 minutos)
  longBreak = 15 * 60 (15 minutos)
  */

  // Inicializar temporizadores
  const pomodoro = new Timer(25 * 60);
  const shortBreak = new Timer(5 * 60);
  const longBreak = new Timer(15 * 60);

  let currentTimer = pomodoro;

  function stopCurrentTimer() {
    if (currentTimer) {
      currentTimer.pause();
      currentTimer.reset();
    }
  }

  function updateTimerButtonText() {
    if (currentTimer && currentTimer.isRunning) {
      timerButton.textContent = "Pause";
    } else {
      timerButton.textContent = "Start";
    }
  }

  function switchTimer(timer) {
    stopCurrentTimer();
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

  // Usar un mapa para asociar botones con temporizadores
  const timerMap = [
    { button: pomodoroButton, timer: pomodoro },
    { button: shortBreakButton, timer: shortBreak },
    { button: longBreakButton, timer: longBreak }
  ];

  // Configurar los event listeners para los botones
  timerMap.forEach(({ button, timer }) => {
    button.addEventListener('click', () => {
      switchTimer(timer);
      switchButton(button);
    });
  });

  // Mostrar el tiempo inicial y configurar el botón
  pomodoro.showTime();
  updateTimerButtonText();

  // Técnica para mantener el temporizador funcionando con precisión incluso si la pestaña está inactiva
  // Esto usa localStorage para sincronización de tiempo entre pestañas
  window.addEventListener('storage', (e) => {
    if (e.key === 'timer-heartbeat') {
      if (currentTimer && currentTimer.isRunning) {
        currentTimer.showTime(); // Forzar actualización de la UI
      }
    }
  });

  // Enviar latido periódico para mantener activas otras pestañas
  setInterval(() => {
    if (currentTimer && currentTimer.isRunning) {
      localStorage.setItem('timer-heartbeat', Date.now().toString());
    }
  }, 1000);

  // Agregar un listener para cuando la página se cierre o cambie
  window.addEventListener('beforeunload', () => {
    // Limpiar todos los temporizadores para evitar fugas de memoria
    [pomodoro, shortBreak, longBreak].forEach(timer => {
      if (timer) timer.destroy();
    });
  });

  //Desactivar clic derecho
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  }, false);
});