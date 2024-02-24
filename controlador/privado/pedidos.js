// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Pedidos';

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
});