// js_ejercicio6.js - Temporizador mejorado

// Este código lo estoy reutilizando de un ejercicio que resolví donde debía hacer un cronómetro. Solo esgtoy reutilizando el código. Todo el código que está comentado se mantendrá así para un futuro por si se necesita extender algunas funciones del cronómetro.

// src/timmer.js
let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let isRunning = false;

export const timmer = document.getElementById('timmer');

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
  const now = Date.now();
  const currentElapsed = elapsedTime + (isRunning ? (now - startTime) : 0);
  timmer.textContent = msToHMS(currentElapsed);
}

export function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now();
  updateDisplay();
  intervalId = setInterval(updateDisplay, 250);
}

export function stopTimer() {
  if (!isRunning && !intervalId) {
    // if not running and no interval, just clear display update
    clearInterval(intervalId);
    intervalId = null;
    return;
  }
  // accumulate elapsed
  if (isRunning) {
    elapsedTime += Date.now() - startTime;
  }
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
  updateDisplay();
}

// Nueva: pausar sin acumular? (no usado ahora) - omitido

// Obtener tiempo total en ms (actual)
export function getElapsedMs() {
  // current elapsed = accumulated + (now - startTime) if running
  return elapsedTime + (isRunning ? (Date.now() - startTime) : 0);
}

// Restaurar estado del timer: pasar ms y si debe arrancar
export function restoreTimerFrom(ms, shouldRun = false) {
  // set elapsedTime to ms, reset startTime
  elapsedTime = typeof ms === 'number' ? ms : 0;
  // stop any running interval
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
  // update display with restored time
  timmer.textContent = msToHMS(elapsedTime);
  if (shouldRun) {
    // start fresh
    startTimer();
  }
}



