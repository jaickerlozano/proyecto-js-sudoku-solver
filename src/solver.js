// Validaciones - Algoritmo Backtracking

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

    // Subcuadrante
    const startRow = Math.floor(fila / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (tablero[r][c] === n) return false;
        }
    }

    return true;
}

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