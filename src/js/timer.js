class Timer {
  constructor(timeInSeconds) {
    this.initialTime = timeInSeconds;
    this.time = timeInSeconds;
    this.interval = null;
    this.isRunning = false;
    this.isPaused = false;

    this.timerButton = document.getElementById('timer-btn');
    this.clock = document.getElementById('time-string');

    this.ring = new Audio('public/timer-done.mp3');
    this.ring.addEventListener('error', () => {
      console.log("Error al cargar el archivo de audio");
    });

    this.showTime();
  }

  start() {
    if (this.isRunning) {
      console.log("Esta corriendo actualmente")
      return
    }

    this.isRunning = true;
    this.isPaused = false;
    this.updateButtonText();

    this.interval = setInterval(() => {
      this.time--;
      this.showTime();

      if (this.time < 0) {
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
    this.updateButtonText();

    console.log("Is paused.")

  }

  finish(){
    this.pause();
    this.isPaused = false;
    this.updateButtonText();
    this.notificationSound();

    console.log("Is finished.")
  }

  showTime() {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;

    this.clock.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  updateButtonText(){
    if(this.isRunning){
      this.timerButton.textContent = "Pause";
    } else {
      this.timerButton.textContent = "Start";
    }
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