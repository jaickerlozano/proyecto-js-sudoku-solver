import { crearFormulario, crearTableroDOM, crearNumeros, 
  getNumeroSeleccionado, setNumeroSeleccionado, getCeldaSeleccionada, 
  setCeldaSeleccionada, actualizarTableroArray, instrucciones } from "./ui";

import { solveSudoku, generarTablero, prepararTableroInicial} from "./solver";

export class Sudoku {
  constructor() {
    this.sudoku = []; // Array para guardar datos del tablero
  }

  ingresarSudoku() {

    document.getElementById('ingresar').classList.replace('active', 'inactive');
    document.getElementById('generar').classList.replace('active', 'inactive');
    
    instrucciones.textContent = `Seleccione una a una la celda e ingrese los números correspondientes y pulse "Aceptar"`;

    const { inputs, btnAceptar } = crearFormulario();

    btnAceptar.onclick = () => {

      const tableroIngresado = inputs.map(i => i.value || "0");

      // Validación completa
      const tableroListo = prepararTableroInicial(tableroIngresado);

      if (tableroListo === null) {
          alert("El tablero ingresado NO cumple las reglas del Sudoku.");
          return;
      }

      this.sudoku = tableroListo;

      console.log("Sudoku listo para jugar:", this.sudoku);

      crearTableroDOM(this.sudoku);

      instrucciones.textContent = 'Pulse "Cargar Formulario"';
      document.getElementById('cargar').classList.replace('inactive', 'active');
    };
  }

  // Método para iniciar el juego
  iniciarJuego() {
    instrucciones.textContent = 'Cargando sudoku...';

    setTimeout(() => {

      crearNumeros();

      instrucciones.textContent = '¡Sudoku cargado correctamente!'
      document.getElementById('resolver').classList.replace('inactive', 'active');

      this.marcarTablero();

      setTimeout(() => {
        instrucciones.textContent = '';
      }, 2000);
    }, 2000);
    document.getElementById('cargar').classList.replace('active', 'inactive');
  }

  // Método para marcar en el tablero del DOM
  marcarTablero() {

    const tableroDOM = document.getElementById('board');
    const numeroTableroDOM = [...tableroDOM.children];
    const digitos = document.getElementById('digits');
    const numeros = [...digitos.children];

    // Se recorre el tablero
    for (let num of numeroTableroDOM) {
      num.addEventListener('click', () => {
        
        if (num.classList.contains('fija')) return;

        num.textContent = getNumeroSeleccionado();

        setCeldaSeleccionada(num);
        this.sudoku = actualizarTableroArray(tableroDOM); // Se actualiza el array del tablero inicial con la celda marcada
      })
    }

    // Se recorre los dígitos
    for (let num of numeros) {
      num.addEventListener('click', () => {

        numeros.forEach(element => element.classList.remove('selected')); // Elimino el número seleccionado

        num.classList.add('selected'); // Marco el número seleccionado

        setNumeroSeleccionado(num.textContent); // Fijo el número seleccionado

        console.log(`numero seleccionado ${getNumeroSeleccionado()}`)
      })
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

    crearTableroDOM(this.sudoku);
  }

  generarSudoku() {
    this.sudoku = generarTablero();
    document.getElementById('generar').classList.replace('active', 'inactive');
    document.getElementById('ingresar').classList.replace('active', 'inactive');
    crearTableroDOM(this.sudoku);
    this.iniciarJuego();
  }
}
