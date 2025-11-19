import { crearFormulario, crearTableroDOM, crearNumeros, getNumeroSeleccionado, setNumeroSeleccionado } from "./ui";

export class Sudoku {
  constructor() {
    this.sudoku = [];
  }

  ingresarSudoku() {
    const { inputs, btnAceptar } = crearFormulario();

    btnAceptar.onclick = () => {
      this.sudoku = inputs.map(i => i.value || "0");
      console.log("Sudoku cargado:", this.sudoku);
      crearTableroDOM(this.sudoku);
    };
  }

  iniciarJuego() {
    crearNumeros();
    document.getElementById('iniciar').classList.replace('active', 'inactive');
    this.jugar();
  }

  jugar() {
    const digitos = document.getElementById('digits');
    const numeros = [...digitos.children];

    for (let num of numeros) {
      num.addEventListener('click', () => {

        numeros.forEach(element => element.classList.remove('selected')); // Elimino el número seleccionado

        num.classList.add('selected'); // Marco el número seleccionado

        setNumeroSeleccionado(num.textContent); // Fijo el número seleccionado

        console.log(`numero seleccionado ${getNumeroSeleccionado()}`)
      })
    }
  }
}
