// js_ejercicio6.js - Temporizador mejorado

// Este código lo estoy reutilizando de un ejercicio que resolví donde debía hacer un cronómetro. Solo esgtoy reutilizando el código. Todo el código que está comentado se mantendrá así para un futuro por si se necesita extender algunas funciones del cronómetro.

let startTime = 0;        // timestamp (ms) cuando se inició la última vez
let elapsedTime = 0;      // tiempo acumulado (ms) mientras estuvo corriendo
let intervalId = null; 
let isRunning = false;    // indica si el timer está corriendo

// DOM
export const timmer = document.getElementById('timmer');
// const btnIniciar = document.getElementById('iniciar');
// const btnPausar = document.getElementById('pausar');
// const btnReiniciar = document.getElementById('reiniciar');

function msToHMS(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:` +
         `${minutes.toString().padStart(2, '0')}:` +
         `${seconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
  // total actual = tiempo acumulado + tiempo transcurrido desde el último start (si está corriendo)
  const now = Date.now();
  const currentElapsed = elapsedTime + (isRunning ? (now - startTime) : 0);
  timmer.textContent = msToHMS(currentElapsed);
}

export function startTimer() {
  if (isRunning) return; // ya está corriendo, no hacer nada
  isRunning = true;
  startTime = Date.now();
  // mostrar inmediatamente el tiempo correcto (evita salto de 1s)
  updateDisplay();
  // actualizar cada 250ms para que la UI se vea más suave (y no dependa del momento exacto)
  intervalId = setInterval(updateDisplay, 250);
}

// function pauseTimer() {
//   if (!isRunning) return; // si no está corriendo, nada que pausar
//   // acumular el tiempo transcurrido hasta ahora
//   elapsedTime += Date.now() - startTime;
//   clearInterval(intervalId);
//   intervalId = null;
//   isRunning = false;
//   btnIniciar.disabled = false;
// }

// function resetTimer() {
//   clearInterval(intervalId);
//   intervalId = null;
//   isRunning = false;
//   startTime = 0;
//   elapsedTime = 0;
//   timmer.textContent = '00:00:00';
//   btnIniciar.disabled = false;
//   btnPausar.disabled = false;
// }

// listeners
// btnIniciar.addEventListener('click', startTimer);
// btnPausar.addEventListener('click', pauseTimer);
// btnReiniciar.addEventListener('click', resetTimer);


