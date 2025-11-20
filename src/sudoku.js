import { crearFormulario, crearTableroDOM, crearNumeros, 
  getNumeroSeleccionado, setNumeroSeleccionado, getCeldaSeleccionada, 
  setCeldaSeleccionada, actualizarTableroArray } from "./ui";

import { solveSudoku } from "./solver";

export class Sudoku {
  constructor() {
    this.sudoku = []; // Array para guardar datos del tablero
  }

  ingresarSudoku() {
    const { inputs, btnAceptar } = crearFormulario();

    btnAceptar.onclick = () => {
      this.sudoku = inputs.map(i => i.value || "0"); // Se ingresan datos del tablero proporcionado por el usuario
      console.log("Sudoku cargado:", this.sudoku);
      crearTableroDOM(this.sudoku);
    };
  }

  // Método para iniciar el juego
  iniciarJuego() {
    crearNumeros();
    document.getElementById('cargar').classList.replace('active', 'inactive');
    document.getElementById('resolver').classList.replace('inactive', 'active');
    this.marcarTablero();
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

        setCeldaSeleccionada();
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

    const solucion = solveSudoku(this.sudoku);

    if (!solucion) {
        alert("No tiene solución");
        return;
    }

    this.sudoku = solucion;

    crearTableroDOM(this.sudoku);
  
  }
}
