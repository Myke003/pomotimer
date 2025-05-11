/**
 * Clase que implementa un temporizador con funcionalidades de inicio, pausa,
 * reinicio y visualización del tiempo restante. Usa Date para alta precisión.
 */
class Timer {
  constructor(timeInSeconds) {
    this.initialTime = timeInSeconds;
    this.time = timeInSeconds;
    this.interval = null;
    this.isRunning = false;
    this.isPaused = false;
    this.clock = document.getElementById('time-string');
    this.ring = new Audio('timer-done.mp3');
    this.startTimestamp = 0;
    this.pausedTimeRemaining = 0;

    this.ring.addEventListener('error', (e) => {
      console.log("Error al cargar el archivo de audio", e);
    });

    this.showTime();
  }

  reset() {
    if (this.isRunning) {
      this.pause();
    }
    this.time = this.initialTime;
    this.isPaused = false;
    this.pausedTimeRemaining = 0;
    this.showTime();
  }

  start() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.isPaused = false;
    
    // Si estamos reanudando después de una pausa, usamos el tiempo restante guardado
    if (this.pausedTimeRemaining > 0) {
      this.time = this.pausedTimeRemaining;
      this.pausedTimeRemaining = 0;
    }
    
    // Guardamos el tiempo actual y calculamos cuando debería terminar
    this.startTimestamp = Date.now();
    const endTime = this.startTimestamp + (this.time * 1000);
    
    // Usamos un intervalo más corto para actualización visual más fluida
    this.interval = setInterval(() => {
      // Calculamos el tiempo restante basado en el timestamp actual
      const now = Date.now();
      const timeLeft = Math.max(0, Math.floor((endTime - now) / 1000));
      
      // Solo actualizamos la UI si el tiempo ha cambiado
      if (timeLeft !== this.time) {
        this.time = timeLeft;
        this.showTime();
        
        // Si se acabó el tiempo, terminamos
        if (this.time <= 0) {
          this.finish();
          this.ring.play().catch(e => console.log("Error al reproducir sonido", e));
        }
      }
    }, 250);
  }

  pause() {
    if (!this.isRunning) return;

    clearInterval(this.interval);
    this.isRunning = false;
    this.isPaused = true;
    
    this.pausedTimeRemaining = this.time;
  }

  finish() {
    clearInterval(this.interval);
    this.isRunning = false;
    this.isPaused = false;
    this.time = 0;
    this.showTime();
    
    setTimeout(() => {
      this.time = this.initialTime;
      this.showTime();
    }, 1000);
  }

  showTime() {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;
    if (this.clock) {
      this.clock.textContent = `${minutes < 10 ? '0'+ minutes: minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
  }

  toggleStartPause() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }
  
  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

export default Timer;