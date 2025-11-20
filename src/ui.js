// Variables
let numeroSeleccionado = null;
let celdaSeleccionada = null;

export function getNumeroSeleccionado() {
    
  return numeroSeleccionado;
}

export function setNumeroSeleccionado(num) {
  numeroSeleccionado = num;
}

export function getCeldaSeleccionada() {
    return celdaSeleccionada;
}

export function setCeldaSeleccionada(num) {
    celdaSeleccionada = num;
}


//DOM
const contenedor = document.getElementById('entrada-container');
const tablero = document.getElementById('board');
const digitos = document.getElementById('digits');
const inputs = [];

export function crearFormulario() {
    contenedor.innerHTML = '';

    const form = document.createElement('form');
    form.id = 'entrada';
    form.addEventListener('submit', e => e.preventDefault());

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('celda')
            input.maxLength = 1;
            input.dataset.r = r;
            input.dataset.c = c;

            input.addEventListener('input', e => {
                e.target.value = e.target.value.replace(/[^1-9]/g, '');
            });

            inputs.push(input);
            form.appendChild(input);
        }
    }

    const btnAceptar = document.createElement('button');
    btnAceptar.type = 'button';
    btnAceptar.innerText = 'Aceptar';

    form.appendChild(btnAceptar);

    contenedor.appendChild(form);

    return { form, inputs, btnAceptar };
}

export function crearTableroDOM(arraySudoku) {
    tablero.innerHTML = '';

    for (let fila = 0; fila < 9; fila++) {
        for (let col = 0; col < 9; col++) {
            const div = document.createElement('div');
            div.id = `${fila}-${col}`;
            div.classList.add('celda');
            div.dataset.r = fila;
            div.dataset.c = col;

            tablero.appendChild(div);
        }
    }

    for (let i = 0; i < 81; i++) {
        if(arraySudoku[i] !== '0') {
            tablero.children[i].classList.add('fija');
            tablero.children[i].textContent = `${arraySudoku[i]}`;
        } else {
            tablero.children[i].textContent = '';
        }
    };

    // Se esconde los botones ingresar y generar y, se activa el botón cargar
    document.getElementById('ingresar').classList.add('inactive');
    document.getElementById('generar').classList.add('inactive');
    document.getElementById('cargar').classList.replace('inactive', 'active');
    contenedor.classList.add('inactive');
}

export function actualizarTableroArray(tablero) {
    let tableroAux = [];

    for (let i = 0; i < 81; i++) {
        if (tablero.children[i].textContent === '') {
            tableroAux.push('0');
        } else {
            tableroAux.push(tablero.children[i].textContent);
        }
    }

    return tableroAux;
}

export function crearNumeros() {
    digitos.innerHTML = '';

    for (let i = 1; i <= 9; i++) {
        const div = document.createElement('div');
        div.id = i;
        div.classList.add('celda');
        div.textContent = `${i}`;

        digitos.appendChild(div);
    }
}
