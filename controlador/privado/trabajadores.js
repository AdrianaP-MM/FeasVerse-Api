// Selecciona el botón de actualizar por su ID.
const BOTON_ACTUALIZAR = document.getElementById('actualizarBtn');

// Selecciona los elementos de entrada del formulario por sus respectivos IDs.
const NOMBRES_INPUT = document.getElementById('nombreTrabajador'),
    APELLIDOS_INPUT = document.getElementById('apellidosTrabajador'),
    DUI_INPUT = document.getElementById('duiTrabajador'),
    TEL_INPUT = document.getElementById('telefonoTrabajador'),
    CORREO_INPUT = document.getElementById('correoTrabajador'),
    FECHAN_INPUT = document.getElementById('fechanTrabajador'),
    FECHAR_INPUT = document.getElementById('fecharTrabajador'),
    ESTADO_INPUT = document.getElementById('estadoTrabajador'),
    NIVEL_INPUT = document.getElementById('nivelTrabajador'),
    CONTRA_INPUT = document.getElementById('contraTrabajador');

// Selecciona elementos relacionados con el modal y el formulario de actualización.
const DATA_MODAL = new bootstrap.Modal('#dataModal'),
    MODAL_TITLE = document.getElementById('modalTitle'),
    UPDATE_FORM = document.getElementById('updateFrom');

// Constantes para establecer el espacio de tabla y el espacio de agregar.
const TABLE_DIV = document.getElementById('tabla');
const ADD_DIV = document.getElementById('agregar');

// Selecciona todos los formularios con la clase 'needs-validation'.
const forms = document.querySelectorAll('.needs-validation')

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    // Selecciona la primera pestaña y la muestra.
    var primeraPestana = document.querySelector('#tabla-tab');
    if (primeraPestana) {
        primeraPestana.click();
        // Muestra el div de la tabla y oculta el div de agregar.
        TABLE_DIV.classList.remove('d-none');
        ADD_DIV.classList.add('d-none');
    }
});

// Función para abrir los detalles de un trabajador.
const openDetails = async (row) => {
    // Muestra la caja de diálogo con su título.
    DATA_MODAL.show();
    // Prepara el formulario de actualización.
    UPDATE_FORM.reset();
    // Inicializa los campos con los datos de la fila seleccionada.
    var cells = row.getElementsByTagName('td');
    var values = [];
    for (var i = 0; i < cells.length; i++) {
        values.push(cells[i].innerText);
    }

    // Asigna los valores a los campos del formulario.
    NOMBRES_INPUT.value = values[2];
    APELLIDOS_INPUT.value = values[1];
    DUI_INPUT.value = values[3];
    TEL_INPUT.value = values[4];
    CORREO_INPUT.value = values[5];
    FECHAN_INPUT.value = '2001-08-12';
    FECHAR_INPUT.value = '2024-12-08';
    ESTADO_INPUT.value = 'Vigente';
    NIVEL_INPUT.value = values[6];
    CONTRA_INPUT.value = 'Hola123';
    var id = values[0];

    // Deshabilita la edición de los campos de entrada.
    NOMBRES_INPUT.readOnly = true;
    APELLIDOS_INPUT.readOnly = true;
    DUI_INPUT.readOnly = true;
    TEL_INPUT.readOnly = true;
    CORREO_INPUT.readOnly = true;
    FECHAN_INPUT.readOnly = true;
    FECHAR_INPUT.readOnly = true;
    ESTADO_INPUT.readOnly = true;
    NIVEL_INPUT.readOnly = true;
    CONTRA_INPUT.readOnly = true;

    // Actualiza el título del modal con el ID del trabajador.
    MODAL_TITLE.textContent = 'Detalles Trabajador #' + id;
}

// Evento cuando se oculta el modal.
DATA_MODAL._element.addEventListener('hidden.bs.modal', function () {
    // Después de que el modal se haya ocultado, cambia el texto del botón a "Actualizar".
    BOTON_ACTUALIZAR.textContent = "Actualizar";
});

// Función que se ejecuta al hacer clic en el botón de actualizar.
const botonActualizar = async () => {
    var textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    if (textoBoton == 'Actualizar') {
        // Habilita la edición de los campos de entrada.
        enableFormFields();
        // Cambia el texto del botón a "Guardar".
        BOTON_ACTUALIZAR.textContent = "Guardar";
    } else if (textoBoton == 'Guardar') {
        // Deshabilita la edición de los campos de entrada.
        disableFormFields();
        // Muestra una alerta de actualización exitosa.
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        // Oculta el modal.
        DATA_MODAL.hide();
    }
}

// Función que se ejecuta al hacer clic en el botón de cancelar.
const botonCancelar = async () => {
    var textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    if (textoBoton == 'Actualizar') {
        // Muestra una confirmación antes de cerrar el modal.
        await showCancelConfirmation('¿Seguro qué quieres regresar?', 'Se cerrará la ventana emergente');
    } else if (textoBoton == 'Guardar') {
        // Muestra una confirmación antes de cerrar el modal, advirtiendo sobre la pérdida de cambios no guardados.
        await showCancelConfirmation('¿Seguro qué quieres regresar?', 'Si has modificado no se guardará');
    }
}

// Función que se ejecuta al hacer clic en el botón de regresar.
const returnBack = async () => {
    // Muestra una confirmación antes de regresar, advirtiendo sobre la pérdida de datos no guardados.
    await showCancelConfirmation('¿Seguro qué quieres regresar?', 'Los datos ingresados no serán guardados');
    // Oculta el modal y vuelve a la primera pestaña de la tabla.
    hideModalAndSwitchTab();
}

// Función para mostrar el div de agregar trabajador y ocultar el div de la tabla.
function showAddDiv(boton) {
    ADD_DIV.classList.remove('d-none');
    TABLE_DIV.classList.add('d-none');
    updateButtonColors(boton);
}

// Función para mostrar el div de la tabla y ocultar el div de agregar trabajador.
function showTableDiv(boton) {
    TABLE_DIV.classList.remove('d-none');
    ADD_DIV.classList.add('d-none');
    updateButtonColors(boton);
}

// Agrega validación a los formularios.
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false)
});

// Función para habilitar la edición de campos del formulario.
function enableFormFields() {
    NOMBRES_INPUT.readOnly = false;
    APELLIDOS_INPUT.readOnly = false;
    DUI_INPUT.readOnly = false;
    TEL_INPUT.readOnly = false;
    CORREO_INPUT.readOnly = false;
    FECHAN_INPUT.readOnly = false;
    ESTADO_INPUT.readOnly = false;
    NIVEL_INPUT.readOnly = false;
    CONTRA_INPUT.readOnly = false;
}

// Función para deshabilitar la edición de campos del formulario.
function disableFormFields() {
    NOMBRES_INPUT.readOnly = true;
    APELLIDOS_INPUT.readOnly = true;
    DUI_INPUT.readOnly = true;
    TEL_INPUT.readOnly = true;
    CORREO_INPUT.readOnly = true;
    FECHAN_INPUT.readOnly = true;
    ESTADO_INPUT.readOnly = true;
    CONTRA_INPUT.readOnly = true;
    NIVEL_INPUT.readOnly = true;
}

// Función para cambiar el color de los botones según el que se haya clicado.
function updateButtonColors(boton) {
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
        b.style.color = 'black';
    });
    boton.style.backgroundColor = '#1A89BD';
    boton.style.color = 'white';
}

// Función para mostrar confirmación antes de cerrar el modal.
async function showCancelConfirmation(message, submessage) {
    const RESPONSE = await confirmAction(message, submessage);
    if (RESPONSE.isConfirmed) {
        DATA_MODAL.hide();
    }
}

// Función para ocultar el modal y cambiar a la primera pestaña de la tabla.
function hideModalAndSwitchTab() {
    DATA_MODAL.hide();
    var primeraPestana = document.querySelector('#tabla-tab');
    if (primeraPestana) {
        clearFormInputs();
        primeraPestana.click();
        TABLE_DIV.classList.remove('d-none');
        ADD_DIV.classList.add('d-none');
    }
}

// Función para limpiar los campos del formulario de agregar trabajador.
function clearFormInputs() {
    document.getElementById('nombreInput').value = '';
    document.getElementById('apellidosInput').value = '';
    document.getElementById('duiInput').value = '';
    document.getElementById('telefonoInput').value = '';
    document.getElementById('correoInput').value = '';
    document.getElementById('fechanInput').value = '';
    document.getElementById('fecharInput').value = '';
    document.getElementById('estadoInput').value = '';
    document.getElementById('nivelInput').value = '';
    document.getElementById('contraInput').value = '';       
}

// Función para ocultar el modal y cambiar a la primera pestaña de la tabla.
function hideModalAndSwitchTab() {
    DATA_MODAL.hide();
    var primeraPestana = document.querySelector('#tabla-tab');
    if (primeraPestana) {
        clearFormInputs();
        primeraPestana.click();
        // Muestra el div de la tabla y oculta el div de agregar.
        TABLE_DIV.classList.remove('d-none');
        ADD_DIV.classList.add('d-none');
    }
}

// Evento que se ejecuta al enviar el formulario.
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
    }, false)
})


