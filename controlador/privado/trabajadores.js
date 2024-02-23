// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    var primeraPestana = document.querySelector('#tabla-tab');
    if (primeraPestana) {
        primeraPestana.click();
        // Se muestra el div de tabla
        TABLE_DIV.classList.remove('d-none');
        ADD_DIV.classList.add('d-none');
    }
});

const openDetails = async (row) => {

    const NOMBRES_INPUT = document.getElementById('nombreTrabajador'),
        APELLIDOS_INPUT = document.getElementById('apellidosTrabajador');
    DUI_INPUT = document.getElementById('duiTrabajador');
    TEL_INPUT = document.getElementById('telefonoTrabajador');
    CORREO_INPUT = document.getElementById('correoTrabajador');
    FECHAN_INPUT = document.getElementById('fechanTrabajador');
    FECHAR_INPUT = document.getElementById('fecharTrabajador');
    ESTADO_INPUT = document.getElementById('estadoTrabajador');
    NIVEL_INPUT = document.getElementById('nivelTrabajador');
    CONTRA_INPUT = document.getElementById('contraTrabajador');

    const DATA_MODAL = new bootstrap.Modal('#dataModal'),
        MODAL_TITLE = document.getElementById('modalTitle'),
        UPDATE_FORM = document.getElementById('updateFrom');

    // Se muestra la caja de diálogo con su título.
    DATA_MODAL.show();
    // Se prepara el formulario.
    UPDATE_FORM.reset();
    // Se inicializan los campos con los datos.
    var cells = row.getElementsByTagName('td');
    // Crea un array para almacenar los valores de las celdas
    var values = [];
    // Itera sobre las celdas y agrega sus valores al array
    for (var i = 0; i < cells.length; i++) {
        values.push(cells[i].innerText);
    }

    // Ahora puedes hacer lo que necesites con el array de valores
    NOMBRES_INPUT.value = values[2];
    APELLIDOS_INPUT.value = values[1];
    DUI_INPUT.value = values[3];
    TEL_INPUT.value = values[4];
    CORREO_INPUT.value = values[5];
    FECHAN_INPUT.value = '...';
    FECHAR_INPUT.value = '...';
    ESTADO_INPUT.value = '...';
    NIVEL_INPUT.value = values[6];
    CONTRA_INPUT.value = '...';
    var id = values[0];
    MODAL_TITLE.textContent = 'Detalles Trabajador #' + id;

}

// Constante para establecer el espacio de tabla y el espacio de agregar.
const TABLE_DIV = document.getElementById('tabla');
const ADD_DIV = document.getElementById('agregar');


function showAddDiv(boton) {
    // Se muestra el div para agregar trabajador.
    ADD_DIV.classList.remove('d-none');
    // Se oculta el formulario de tabla.
    TABLE_DIV.classList.add('d-none');

    // Restablece el color de todos los botones
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
    });

    // Cambia el color del botón clicado
    boton.style.backgroundColor = '#1A89BD';
    boton.style.color = 'white';
}


function showTableDiv(boton) {
    // Se muestra el div para agregar trabajador.
    TABLE_DIV.classList.remove('d-none');
    // Se oculta el formulario de tabla.
    ADD_DIV.classList.add('d-none');

    // Restablece el color de todos los botones
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
    });

    // Cambia el color del botón clicado
    boton.style.backgroundColor = '#1A89BD';
    boton.style.color = 'white';
}

const forms = document.querySelectorAll('.needs-validation')

Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
    }, false)
})

function returnBack() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "¿Seguro que quieres cancelar?",
        text: 'Los datos ingresados no serán guardados',
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            var inputs = document.querySelectorAll('.form-control');
            inputs.forEach(function (I) {
                I.value = '';
            });

            var primeraPestana = document.querySelector('#tabla-tab');
            primeraPestana.click();
            // Se muestra el div de tabla
            TABLE_DIV.classList.remove('d-none');
            ADD_DIV.classList.add('d-none');
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {

        }
    });
}

function HabiliDesaInput() {
    var inputs = document.querySelectorAll('.editableInput');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = !inputs[i].disabled;
    }

    /*if todos los input están habilitados, guardar
    y cerrar alert*/

}
function Return() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "¿Seguro que quieres regresar?",
        text: 'Los datos ingresados no serán actualizados',
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const DATA_MODAL = new bootstrap.Modal('#dataModal');
            DATA_MODAL.cancel(); 
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {

        }
    });
}

