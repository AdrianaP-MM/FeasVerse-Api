// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Clientes';

const DETAIL_MODAL = new bootstrap.Modal('#detailModal');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    // Establecer evento para cuando la pestaña de la tabla se haya mostrado completamente
    document.getElementById('tabla-tab').addEventListener('shown.bs.tab', function () {
        ondblclickRowTable();
    });

    // Bloquear el botón y mostrar la pestaña al cargar la página
    // Mostrar la pestaña
    document.getElementById('tabla-tab').click();
    // Bloquear el botón
    document.getElementById('tabla-tab').setAttribute('disabled', 'disabled');
});

function ondblclickRowTable() {
    var id, ape, nom, dui, tel, eml, nvl;

    var table = document.getElementById('tablaClientes');
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].ondblclick = function () {
            rIndex = this.rowIndex;
            id = this.cells[0].innerHTML;
            ape = this.cells[1].innerHTML;
            nom = this.cells[2].innerHTML;
            dui = this.cells[3].innerHTML;
            tel = this.cells[4].innerHTML;
            eml = this.cells[5].innerHTML;
            nvl = this.cells[6].innerHTML;

            const modalTitle = document.getElementById('modalTitle');
            const detailUpdateForm = document.getElementById('detailUpdateForm');

            modalTitle.textContent = 'Detalles del Cliente';

            detailUpdateForm.querySelector("#validationCustomName").value = nom; // Nombre
            detailUpdateForm.querySelector("#validationCustomLastName").value = ape; // Apellidos

            // Mostrar el modal
            const detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
            detailModal.show();
        }
    }
}



const detailData = async (row) => {
    
}

function showTableDiv(button) {
    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}