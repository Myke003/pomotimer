class Timer {
  constructor(timeInSeconds) {
    this.initialTime = timeInSeconds;
    this.time = timeInSeconds;
    this.interval = null;
    this.isRunning = false;
    this.isPaused = false;

    this.clock = document.getElementById('time-string');

    this.ring = new Audio('public/timer-done.mp3');
    this.ring.addEventListener('error', () => {
      console.log("Error al cargar el archivo de audio");
    });

    this.showTime();
  }

  reset() {
    if (this.isRunning) {
      this.pause();
    }
    
    this.time = this.initialTime;
    this.isPaused = false;
    
    
    this.showTime();
    
    console.log("Timer reset.");
  }

  start() {
    if (this.isRunning) {
      console.log("Esta corriendo actualmente")
      return
    }

    this.isRunning = true;
    this.isPaused = false;

    this.interval = setInterval(() => {
      this.time--;
      this.showTime();

      if (this.time <= 0) {
        this.finish();
        this.ring.play();
      }
    }, 1000);

    console.log("Is started.")
  }

  pause() {
    if (!this.isRunning) {
      return;
    }

    clearInterval(this.interval);
    this.isRunning = false;
    this.isPaused = true;

    console.log("Is paused.")

  }

  finish(){
    this.pause();
    this.isPaused = false;
    this.time = this.initialTime;
    console.log("Is finished.")
  }

  showTime() {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;

    this.clock.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  toggleStartPause() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }
}

export default Timer;