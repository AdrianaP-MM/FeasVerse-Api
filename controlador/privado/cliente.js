// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Clientes';

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    // Manejador de eventos para el doble clic en la tabla
    document.getElementById('tableBody').addEventListener('dblclick', function (event) {
        // Verificar si el doble clic fue en una fila
        const targetRow = event.target.closest('tr');
        if (targetRow) {
            // Aquí puedes obtener los datos de la fila y mostrar el modal
            const rowData = Array.from(targetRow.cells).map(cell => cell.textContent);
            showDetailModal(rowData);
        }
    });

    // Bloquear el botón y mostrar la pestaña al cargar la página
    // Mostrar la pestaña
    document.getElementById('tabla-tab').click();
    // Bloquear el botón
    document.getElementById('tabla-tab').setAttribute('disabled', 'disabled');
});

// Función para mostrar el modal con los detalles de la fila
function showDetailModal(rowData) {
    const modalTitle = document.getElementById('modalTitle');
    const detailUpdateForm = document.getElementById('detailUpdateForm');

    modalTitle.textContent = 'Detalles del Cliente';
    //detailUpdateForm.querySelector("#validationCustomName").value = rowData[2]; // Nombre
    //detailUpdateForm.querySelector("#validationCustomLastName").value = rowData[1]; // Apellidos

    // Mostrar el modal
    const detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
    detailModal.show();
}

function showTableDiv(button){
    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}