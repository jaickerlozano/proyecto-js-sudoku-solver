import './style.css';
import { Sudoku } from './sudoku';

const sudoku = new Sudoku();

document.getElementById('ingresar')
  .addEventListener('click', () => sudoku.ingresarSudoku());

document.getElementById('generar')
  .addEventListener('click', () => {
    // futura función para generar sudoku
});

document.getElementById('iniciar').addEventListener('click', () => sudoku.iniciarJuego());

document.getElementById('digits').addEventListener('click', () => sudoku.jugar());