// Utilidad para mezclar un array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function arrayDosDim(tableroPlano) {
    const tablero = [];
    for (let i = 0; i < 81; i += 9) {
        tablero.push(tableroPlano.slice(i, i + 9));
    }
    return tablero;
}

export function isValido(tablero, num, fila, col) {
    const n = num.toString();

    // Validar fila
    for (let c = 0; c < 9; c++) {
        if (tablero[fila][c] === n) return false;
    }

    // Validar columna
    for (let r = 0; r < 9; r++) {
        if (tablero[r][col] === n) return false;
    }

    // Validar subcuadrante
    const startRow = Math.floor(fila / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (tablero[r][c] === n) return false;
        }
    }

    return true;
}

// ⭐ PASO 1: Generar solución completa por backtracking
function generarSolucionCompleta(tablero) {
    for (let fila = 0; fila < 9; fila++) {
        for (let col = 0; col < 9; col++) {

            if (tablero[fila][col] === '0') {
                
                // Mezclar números para que siempre sea diferente
                const numeros = shuffle([1,2,3,4,5,6,7,8,9]);

                for (let num of numeros) {

                    if (isValido(tablero, num, fila, col)) {
                        tablero[fila][col] = num.toString();

                        if (generarSolucionCompleta(tablero)) return true;

                        tablero[fila][col] = '0';
                    }
                }

                return false; // No se pudo llenar este espacio
            }
        }
    }

    return true; // COMPLETAMENTE LLENO
}

// ⭐ PASO 2: Vaciar celdas (generar sudoku jugable)
function crearPuzzleDesdeSolucion(tableroCompleto, cantidadAEliminar = 50) {
    let tablero = tableroCompleto.flat();
    
    // Vaciar celdas al azar
    for (let i = 0; i < cantidadAEliminar; i++) {
        let index;
        do {
            index = Math.floor(Math.random() * 81);
        } while (tablero[index] === '0');
        
        tablero[index] = '0';
    }

    return tablero;
}

// ⭐ Función principal para tu proyecto
export function generarTablero() {

    // Crear tablero vacío
    const tablero = Array.from({length: 9}, () => Array(9).fill('0'));

    // Generar solución completa
    generarSolucionCompleta(tablero);

    // Crear puzzle eliminando celdas
    const sudokuFinal = crearPuzzleDesdeSolucion(tablero, 50); // puedes ajustar 40–55

    return sudokuFinal;
}


// ------------------ SOLVE SUDOKU ------------------

export function solveSudoku(tableroPlano) {
    const tablero = arrayDosDim(tableroPlano);

    if (resolver(tablero)) {
        return tablero.flat();
    }
    return null;
}

function resolver(tablero) {
    for (let fila = 0; fila < 9; fila++) {
        for (let col = 0; col < 9; col++) {

            if (tablero[fila][col] === '0') {

                for (let num = 1; num <= 9; num++) {

                    if (isValido(tablero, num, fila, col)) {
                        tablero[fila][col] = num.toString();

                        if (resolver(tablero)) return true;

                        tablero[fila][col] = '0';
                    }
                }

                return false;
            }
        }
    }

    return true;
}
