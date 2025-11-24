import './style.css';
import { Sudoku } from './sudoku';
import { cargarEstado } from './storage';

const sudoku = new Sudoku();

sudoku.cargarPartidaSiExiste();

document.getElementById('ingresar').addEventListener('click', () => sudoku.ingresarSudoku());

document.getElementById('generar').addEventListener('click', () => sudoku.generarSudoku());

document.getElementById('cargar').addEventListener('click', () => sudoku.iniciarJuego());

document.getElementById('resolver').addEventListener('click', () => sudoku.resolverSudoku());