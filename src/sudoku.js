import { crearFormulario, crearTableroDOM, crearNumeros, 
  getNumeroSeleccionado, setNumeroSeleccionado, getCeldaSeleccionada, 
  setCeldaSeleccionada, actualizarTableroArray, instrucciones } from "./ui";

import { solveSudoku, generarTablero, prepararTableroInicial, esTableroCorrecto, arrayDosDim, isValido} from "./solver";

import { guardarEstado, cargarEstado, borrarEstado } from "./storage.js";
import { getElapsedMs, restoreTimerFrom, startTimer, stopTimer, timmer } from "./timmer";

export class Sudoku {
  constructor() {
    this.sudoku = []; // Array para guardar datos del tablero
    this.errores = 0; // Contador de errores
  }

  ingresarSudoku() {
    borrarEstado();

    document.getElementById('ingresar').classList.replace('active', 'inactive');
    document.getElementById('generar').classList.replace('active', 'inactive');
    document.getElementById('continuar').classList.replace('active', 'inactive');
    
    instrucciones.textContent = `Seleccione una a una la celda e ingrese los números correspondientes y pulse "Aceptar"`;

    const { inputs, btnAceptar } = crearFormulario();

    btnAceptar.onclick = () => {

      const tableroIngresado = inputs.map(i => i.value || "0");
      
      if (tableroIngresado.every(celda => celda === "0")) instrucciones.textContent = 'TABLERO VACÍO → creando uno automático';

      // Validación completa
      const tableroListo = prepararTableroInicial(tableroIngresado);

      if (tableroListo === null) {
          alert("El tablero ingresado NO cumple las reglas del Sudoku.");
          return;
      }

      if (tableroListo === "NO_SOLUCION") {
          alert("El tablero ingresado NO tiene solución.");
          return;
      }

      setTimeout(() => {
        this.sudoku = tableroListo;

          console.log("Sudoku listo para jugar:", this.sudoku);

          crearTableroDOM(this.sudoku);

          instrucciones.textContent = 'Pulse "Cargar Formulario"';
        document.getElementById('cargar').classList.replace('inactive', 'active');
      }, 1500);

    };
  }

  // Método para iniciar el juego
  iniciarJuego() {
    instrucciones.textContent = 'Cargando sudoku...';

    setTimeout(() => {

      crearNumeros();

      instrucciones.textContent = '¡Sudoku cargado correctamente!'

      setTimeout(() => {

        instrucciones.textContent = '';

        // Insercción del timmer en el DOM
        timmer.classList.replace('inactive', 'active');
        document.getElementById('errors').classList.replace('inactive', 'active');
        document.getElementById('resolver').classList.replace('inactive', 'active');
        startTimer(); // Inicia el contador del tiempo

        this.marcarTablero(); // Se marca en el tablero

      }, 1500);
    }, 1000);
    document.getElementById('cargar').classList.replace('active', 'inactive');
  }

  // Método para marcar en el tablero del DOM
  marcarTablero() {

    const tableroDOM = document.getElementById('board');
    const numeroTableroDOM = [...tableroDOM.children];
    const digitos = document.getElementById('digits');
    const numeros = [...digitos.children];

    // CLICK EN CELDAS DEL TABLERO
    for (let celda of numeroTableroDOM) {

      celda.addEventListener('click', () => {

        if (celda.classList.contains('fija')) return;

        const numeroSeleccionadoActual = getNumeroSeleccionado();
        if (!numeroSeleccionadoActual) return; // No seleccionó número

        const fila = parseInt(celda.dataset.r);
        const col = parseInt(celda.dataset.c);

        // Validación ANTES de pintar
        const tablero2D = arrayDosDim([...this.sudoku]);

        const esCorrecto = isValido(tablero2D, numeroSeleccionadoActual, fila, col);

        if (!esCorrecto) {
          this.registrarError();
          celda.classList.add("error-anim");

          setTimeout(() => celda.classList.remove("error-anim"), 300);

          return; // NO colocar el número
        }

        // SI ES CORRECTO → colocar número
        celda.textContent = numeroSeleccionadoActual;
        setCeldaSeleccionada(celda);

        this.sudoku = actualizarTableroArray(tableroDOM);

        this.guardar(); 

        this.juegoGanado();
      });
    }

    // CLICK EN LOS DIGITOS 1-9
    for (let num of numeros) {
      num.addEventListener('click', () => {
        numeros.forEach(n => n.classList.remove('selected'));
        num.classList.add('selected');
        setNumeroSeleccionado(num.textContent);
      });
    }
  }

  resolverSudoku() {

    console.log(this.sudoku)
    const solucion = solveSudoku(this.sudoku);

    if (!solucion) {
        alert("No tiene solución");
        return;
    }

    this.sudoku = solucion;

    instrucciones.textContent = "🎉 ¡Sudoku resuelto!";
    document.getElementById('resolver').classList.replace('active', 'inactive');

    crearTableroDOM(this.sudoku);

    stopTimer();

    borrarEstado();

    document.getElementById("reiniciar").classList.replace("inactive", "active");

  }

  generarSudoku() {
    borrarEstado();
    this.sudoku = generarTablero();
    document.getElementById('generar').classList.replace('active', 'inactive');
    document.getElementById('ingresar').classList.replace('active', 'inactive');
    document.getElementById('continuar').classList.replace('active', 'inactive');
    crearTableroDOM(this.sudoku);
    this.iniciarJuego();
  }

  juegoGanado() {

    // Convertir a 2D reutilizando tu función ya existente
    const tablero2D = arrayDosDim([...this.sudoku]);

    // Validar si el sudoku está correctamente resuelto
    const ganado = esTableroCorrecto(tablero2D);

    if (ganado) {
      
      stopTimer();
      borrarEstado();
      instrucciones.textContent = "🎉 ¡Sudoku completado correctamente!";
      document.getElementById("board").classList.add("bloqueado");
      document.getElementById('resolver').classList.replace('active', 'inactive');
      document.getElementById("reiniciar").classList.replace("inactive", "active");

      document.getElementById("reiniciar").classList.replace("inactive", "active");
    }

    return ganado;
  }

  // Método para registrar errores
  registrarError() {
    this.errores++;
    document.querySelector(".amountError").textContent = this.errores;
  }

  guardar() {
    const tiempoActual = getElapsedMs();
    guardarEstado(this.sudoku, this.errores, tiempoActual);
  }

  cargarPartidaSiExiste() {
      const estadoPrevio = cargarEstado();
      if (!estadoPrevio) return;

      const btnContinuar = document.getElementById("continuar");
      btnContinuar.classList.replace("inactive", "active");

      btnContinuar.onclick = () => {
          this.sudoku = estadoPrevio.tablero;
          this.errores = estadoPrevio.errores;
          document.getElementById('generar').classList.replace('active', 'inactive');
          document.getElementById('ingresar').classList.replace('active', 'inactive');
          document.getElementById('continuar').classList.replace('active', 'inactive');

          crearTableroDOM(this.sudoku);
          document.querySelector(".amountError").textContent = this.errores;

          // restaurar tiempo
          restoreTimerFrom(estadoPrevio.tiempoMs, true);

          this.iniciarJuego();
      };
  }

  reiniciar() {
    // 1. Detener tiempo
    stopTimer();

    // 2. Reset internos
    this.sudoku = []; // Método que ya tienes para crear la matriz 9x9 vacía
    this.errores = 0;

    // 3. Borrar localStorage
    borrarEstado();

    // 4. Limpieza visual
    document.getElementById("board").innerHTML = "";
    document.getElementById("digits").innerHTML = "";
    document.querySelector(".amountError").textContent = "0";
    document.getElementById("entrada-container").innerHTML = "";

    // 5. Resetear interfaz
    document.getElementById("resolver").classList.replace("active", "inactive");
    document.getElementById("reiniciar").classList.replace("active", "inactive");
    document.getElementById("continuar").classList.replace("active", "inactive");
    document.getElementById("timmer").classList.replace("active", "inactive");
    document.getElementById("errors").classList.replace("active", "inactive");

    document.getElementById("ingresar").classList.replace("inactive", "active");
    document.getElementById("generar").classList.replace("inactive", "active");
    document.getElementById("entrada-container").classList.remove('inactive');

    // 6. Reset mensaje inicial
    document.getElementById("instrucciones").textContent =
        "Ingresa tu propio sudoku pulsando Ingresar o pulsa Generar para iniciar uno automáticamente";

    // 7. Reset temporizador en pantalla
    timmer.textContent = "00:00:00";
    restoreTimerFrom(0, false); // limpiar estado interno del timer

    console.log("Juego reiniciado correctamente.");
  }

}
