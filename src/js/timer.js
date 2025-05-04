/**
 * Clase que implementa un temporizador con funcionalidades de inicio, pausa,
 * reinicio y visualización del tiempo restante. También reproduce un sonido
 * al finalizar el tiempo.
 */
class Timer {
  /**
   * Constructor de la clase Timer.
   * @param {number} timeInSeconds - El tiempo inicial del temporizador en segundos.
   */
  constructor(timeInSeconds) {
    /**
     * El tiempo inicial configurado para el temporizador en segundos.
     * @type {number}
     */
    this.initialTime = timeInSeconds;

    /**
     * El tiempo restante actual del temporizador en segundos.
     * @type {number}
     */
    this.time = timeInSeconds;

    /**
     * El ID del intervalo de tiempo utilizado para actualizar el temporizador.
     * @type {number|null}
     */
    this.interval = null;

    /**
     * Indica si el temporizador está actualmente en ejecución.
     * @type {boolean}
     */
    this.isRunning = false;

    /**
     * Indica si el temporizador está actualmente pausado.
     * @type {boolean}
     */
    this.isPaused = false;

    /**
     * El elemento HTML donde se mostrará el tiempo restante. Se espera que
     * exista un elemento con el ID 'time-string' en el DOM.
     * @type {HTMLElement}
     */
    this.clock = document.getElementById('time-string');

    /**
     * El objeto de audio que se reproducirá cuando el temporizador llegue a cero.
     * El archivo de audio se espera que esté en la ruta 'public/timer-done.mp3'.
     * @type {HTMLAudioElement}
     */
    this.ring = new Audio('public/timer-done.mp3');

    // Agrega un listener para manejar errores en la carga del archivo de audio.
    this.ring.addEventListener('error', () => {
      console.log("Error al cargar el archivo de audio");
    });

    // Muestra el tiempo inicial en el elemento del reloj.
    this.showTime();
  }

  /**
   * Reinicia el temporizador a su tiempo inicial. Si el temporizador está
   * corriendo, primero lo pausa.
   */
  reset() {
    // Si el temporizador está en ejecución, lo pausamos.
    if (this.isRunning) {
      this.pause();
    }

    // Restablecemos el tiempo al valor inicial.
    this.time = this.initialTime;
    this.isPaused = false;

    // Actualizamos la visualización del tiempo.
    this.showTime();

    console.log("Timer reset.");
  }

  /**
   * Inicia el temporizador. Si ya está corriendo, muestra un mensaje en la consola
   * y no hace nada más. Establece un intervalo para decrementar el tiempo cada
   * segundo y actualizar la visualización. Cuando el tiempo llega a cero,
   * llama a la función `finish()` y reproduce el sonido.
   */
  start() {
    // Si el temporizador ya está corriendo, salimos de la función.
    if (this.isRunning) {
      console.log("Esta corriendo actualmente");
      return;
    }

    // Marcamos el temporizador como en ejecución y no pausado.
    this.isRunning = true;
    this.isPaused = false;

    // Establecemos un intervalo que se ejecuta cada 1000 milisegundos (1 segundo).
    this.interval = setInterval(() => {
      // Decrementamos el tiempo restante.
      this.time--;
      // Actualizamos la visualización del tiempo.
      this.showTime();

      // Si el tiempo llega a cero o menos.
      if (this.time <= 0) {
        // Finalizamos el temporizador.
        this.finish();
        // Reproducimos el sonido de finalización.
        this.ring.play();
      }
    }, 1000);

    console.log("Is started.");
  }

  /**
   * Pausa el temporizador si está en ejecución. Limpia el intervalo y actualiza
   * el estado `isRunning` y `isPaused`.
   */
  pause() {
    // Si el temporizador no está en ejecución, no hacemos nada.
    if (!this.isRunning) {
      return;
    }

    // Limpiamos el intervalo para detener la actualización del tiempo.
    clearInterval(this.interval);
    // Marcamos el temporizador como no en ejecución y pausado.
    this.isRunning = false;
    this.isPaused = true;

    console.log("Is paused.");
  }

  /**
   * Finaliza el temporizador, pausándolo, restableciendo el estado de pausa
   * y reiniciando el tiempo a su valor inicial.
   */
  finish() {
    // Pausamos el temporizador.
    this.pause();
    // Restablecemos el estado de pausa.
    this.isPaused = false;
    // Restablecemos el tiempo al valor inicial.
    this.time = this.initialTime;
    console.log("Is finished.");
  }

  /**
   * Actualiza la visualización del tiempo en el elemento HTML. Formatea el
   * tiempo restante en minutos y segundos (MM:SS), asegurándose de que los
   * segundos tengan siempre dos dígitos.
   */
  showTime() {
    // Calcula los minutos.
    const minutes = Math.floor(this.time / 60);
    // Calcula los segundos restantes.
    const seconds = this.time % 60;

    // Actualiza el contenido del elemento HTML con el tiempo formateado.
    this.clock.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  /**
   * Alterna el estado del temporizador entre iniciar y pausar. Si está
   * corriendo, lo pausa; si no está corriendo, lo inicia.
   */
  toggleStartPause() {
    // Si el temporizador está corriendo, lo pausamos.
    if (this.isRunning) {
      this.pause();
    } else {
      // Si no está corriendo, lo iniciamos.
      this.start();
    }
  }
}

/**
 * Exporta la clase Timer para que pueda ser utilizada en otros módulos.
 * @module Timer
 */
export default Timer;