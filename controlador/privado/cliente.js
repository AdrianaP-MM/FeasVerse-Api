// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Clientes';

// Constante para establecer la tabla
const TABLE_CLIENT = document.getElementById('tabla_cliente');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Bloquear el botón y mostrar la pestaña al cargar la página
    // Mostrar la pestaña
    document.getElementById("tabla-tab").click();
     // Bloquear el botón
    document.getElementById("tabla-tab").setAttribute("disabled", "disabled");
});

function showTableDiv(button){
    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}