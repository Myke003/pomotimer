class Timer {
  constructor(timeInSeconds, audio) {
    this.time = timeInSeconds;
    this.interval = null;
    this.ring = new Audio(audio);
    this.isRunning = false;
    
    this.timerButton = document.getElementById('timer-btn');
    this.clock = document.getElementById('time-string'); 

    this.showTime();
  }

  start() {
    if(this.isRunning){
      console.log("Esta corriendo actualmente")
      return
    }

    this.isRunning = true;

    this.interval = setInterval(() => {
      this.showTime();
      this.time--;

      if (this.time < 0) {
        this.stop();
        this.ring.play();
      }
    }, 1000);
  }

  showTime() {
    const minutes = Math.floor(this.time / 60); 
    const seconds = this.time % 60;

    this.clock.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  stop() {
    clearInterval(this.interval);
  }

  pause(){
    if(this.timerButton.textContent == "Start"){
      console.log()
    }
  } 

  notificationSound(){
    if(this.ring){
      this.ring.play();
      console.log("Sonido reproducido");
    } else{
      console.error("No se pudo reproducir el sonido");
    }
  }
}

const timer = new Timer(1500, "/public/soft-bell-countdown.wav");

document.getElementById('timer-btn').addEventListener("click", ()=>{
  timer.start();
  timer.pause();
})