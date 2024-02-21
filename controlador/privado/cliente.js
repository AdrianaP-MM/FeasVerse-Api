// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Clientes';

// Constante para establecer la tabla
const TABLE_CLIENT = document.getElementById('tabla_cliente');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se muestra la tabla.
    //TABLE_CLIENT.classList.remove('d-none');
});