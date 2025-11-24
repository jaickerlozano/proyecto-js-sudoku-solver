// Módulo para funciones de guardado, carga y borrado en el localStorage

export function guardarEstado(tablero, errores, tiempoMs) {
    const data = {
        tablero,
        errores,
        tiempoMs,
        fecha: Date.now()
    };
    localStorage.setItem("sudoku_estado", JSON.stringify(data));
}

export function cargarEstado() {
    const data = localStorage.getItem("sudoku_estado");
    return data ? JSON.parse(data) : null;
}

export function borrarEstado() {
    localStorage.removeItem("sudoku_estado");
}
