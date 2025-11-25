# 🧩 Sudoku Solver – Proyecto en JavaScript

Este proyecto es una aplicación web interactiva que permite jugar, resolver y gestionar sudokus desde el navegador. Incluye funciones de generación automática, ingreso manual, validación en tiempo real, guardado de partida y más.
Fue desarrollado con JavaScript Vanilla, HTML, CSS y herramientas básicas para el manejo del DOM.

## 🚀 Características principales

✔️ 1. Ingreso manual del Sudoku

El usuario puede introducir su propio tablero completando un formulario de 81 inputs.

✔️ 2. Generación automática del tablero

El sistema puede crear un Sudoku inicial aleatorio y válido listo para jugar.

✔️ 3. Guardado automático de la partida

La app almacena en localStorage:

Estado del tablero

Número de errores

Tiempo transcurrido

Permite continuar una partida desde el punto exacto donde se dejó.

✔️ 4. Validación de movimientos en tiempo real

Cada vez que el jugador intenta colocar un número:

Se verifica si el movimiento es válido según las reglas del Sudoku

Si es incorrecto, se incrementa el contador de errores

Se añade un efecto visual de error

✔️ 5. Temporizador integrado

El juego inicia un cronómetro al comenzar y lo detiene al ganar o resolver el Sudoku.

✔️ 6. Función para resolver automáticamente el Sudoku

Un algoritmo backtracking resuelve el tablero y lo muestra en pantalla.

✔️ 7. Detección automática de victoria

El programa verifica si el Sudoku está completamente resuelto y muestra un mensaje de éxito.

✔️ 8. Sistema de reinicio completo

El botón "Reiniciar" limpia:

Tablero

Timer

Errores

Estado guardado

Y regresa la interfaz a sus valores iniciales.

## 🛠️ Tecnologías utilizadas

JavaScript (ES6)

HTML5

CSS3

Manejo detallado del DOM

localStorage para persistencia

Algoritmo de Backtracking para resolver el Sudoku

## 📂 Estructura del proyecto

```
📦 sudoku-solver
├── 📂 src
│   ├── solver.js       # Lógica de validación, solución y generación del sudoku
│   ├── sudoku.js       # Clase principal con toda la lógica del juego
│   ├── ui.js           # Funciones para manipular el DOM
│   ├── storage.js      # Guardar / cargar estado desde localStorage
│   ├── timmer.js       # Lógica del temporizador
│   ├── main.js         # Punto de entrada
│   └── style.css       # Estilos generales
└── index.html          # Estructura principal del DOM
```

## 🎮 Cómo jugar

Ingresar Sudoku → completa el formulario con tu propio tablero.

Generar Sudoku → crea un tablero automáticamente.

Cargar formulario → cuando hayas ingresado un tablero manual, cárgalo al tablero para jugar.

Selecciona un número y pulsa una celda para jugar.

Si cometes un error, el contador se incrementa.

Usa Resolver para ver la solución completa.

Usa Reiniciar para comenzar desde cero.

## 💡 Características clave del código

Arquitectura modular: cada parte del proyecto está separada en archivos independientes.

Uso de métodos privados y validaciones para mantener el código limpio.

Lógica del Sudoku totalmente implementada por algoritmos propios.

Manejo elegante de errores visuales y de estado.

Control completo del flujo del juego desde la clase Sudoku.

## 📱 Responsive Design

El panel de dígitos se adapta a móviles.

Se reorganizan las filas para ofrecer una mejor experiencia en pantallas pequeñas.

Todo el diseño está centrado en la jugabilidad y la claridad visual.

## 🏁 Estado del proyecto

✔️ Terminado y funcional

✔️ Preparado para evaluación

✔️ Código limpio, organizado y modular

## 🧠 Aprendizaje obtenido

Este proyecto permitió practicar:

Manipulación avanzada del DOM

Estructuración de clases y modularización

Manejo de eventos

Uso de localStorage para persistencia

Diseño responsive

Resolución de problemas lógicos complejos

## 🔗 Demo

👉 https://jaickerlozano.github.io/proyecto-js-sudoku-solver/

📩 Contacto

Si quieres ver más de mis proyectos:

🔗 Portfolio: [(👉Aquí)](https://jaickerlozano.github.io/portfolio-jaicker/)

🔗 GitHub: [(Perfil GitHub)](https://github.com/jaickerlozano)

## 📜 Licencia

Este proyecto es libre para uso educativo.
