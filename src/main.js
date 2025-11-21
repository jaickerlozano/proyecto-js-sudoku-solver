import './style.css';
import { Sudoku } from './sudoku';

const sudoku = new Sudoku();

document.getElementById('ingresar').addEventListener('click', () => sudoku.ingresarSudoku());

document.getElementById('generar').addEventListener('click', () => sudoku.generarSudoku());

document.getElementById('cargar').addEventListener('click', () => sudoku.iniciarJuego());

document.getElementById('resolver').addEventListener('click', () => sudoku.resolverSudoku());