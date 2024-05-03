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
    UPDATE_FORM = document.getElementById('updateFrom'),
    ADD_FORM = document.getElementById('AddForm');

// Constantes para establecer el espacio de tabla y el espacio de agregar.
const TABLE_DIV = document.getElementById('tabla');
const ADD_DIV = document.getElementById('agregar');

// Selecciona todos los formularios con la clase 'needs-validation'.
const forms = document.querySelectorAll('.needs-validation')

// Constantes para establecer el contenido de la tabla.
const TABLE_BODY = document.getElementById('tableBody');

const TRABAJADORES_API = 'services/privada/trabajadores.php';

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

    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});


/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(TRABAJADORES_API, action);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
            <tr class="table-row" ondblclick="openDetails(this)">
                <td>${row.id_trabajador}</td>
                <td>${row.apellido_trabajador}</td>
                <td>${row.nombre_trabajador}</td>
                <td>${row.dui_trabajador}</td>
                <td>${row.telefono_trabajador}</td>
                <td>${row.correo_trabajador}</td>
                <td>${row.nivel}</td>
                <td>${row.estado_trabajador}</td>
            </tr>
            `;
        });
    } else {
        /*
        sweetAlert(4, DATA.error, true);*/
        console.log('ERROR');
    }
}


// Método del evento para cuando se envía el formulario de guardar. 
const addSave = async () => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ADD_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(TRABAJADORES_API, 'createRow', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
         await sweetAlert(1, 'Se ha guardado correctamente', true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        /*sweetAlert(2, DATA.error, false);*/
    }
};

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
    CONTRA_INPUT.value = 'Hola123';
    var id = values[0];

    if (values[7] == 'Vigente') {
        ESTADO_INPUT.value = 1;
    }
    else {
        ESTADO_INPUT.value = 2;
    }

    if (values[6] == 'Admin') {
        NIVEL_INPUT.value = 1;
    }
    else if (values[6] == 'Empleado') {
        NIVEL_INPUT.value = 2;
    }
    else {
        NIVEL_INPUT.value = 3;
    }

    // Deshabilita la edición de los campos de entrada.
    NOMBRES_INPUT.readOnly = true;
    APELLIDOS_INPUT.readOnly = true;
    DUI_INPUT.readOnly = true;
    TEL_INPUT.readOnly = true;
    CORREO_INPUT.readOnly = true;
    FECHAN_INPUT.readOnly = true;
    FECHAR_INPUT.readOnly = true;
    ESTADO_INPUT.disabled = true;
    NIVEL_INPUT.disabled = true;
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
// Convierte la colección de formularios en un array y para cada formulario en el array...
Array.from(forms).forEach(form => {
    // Agrega un event listener para el evento de enviar el formulario.
    form.addEventListener('submit', event => {
        // Verifica si el formulario no pasa la validación.
        if (!form.checkValidity()) {
            // Previene la acción por defecto de enviar el formulario.
            event.preventDefault();
            // Detiene la propagación del evento para prevenir que se propague a otros elementos.
            event.stopPropagation();
        }
        // Agrega la clase 'was-validated' al formulario para aplicar estilos de validación.
        form.classList.add('was-validated');
    }, false);
});

// Función para habilitar la edición de campos del formulario.
function enableFormFields() {
    NOMBRES_INPUT.readOnly = false;
    APELLIDOS_INPUT.readOnly = false;
    DUI_INPUT.readOnly = false;
    TEL_INPUT.readOnly = false;
    CORREO_INPUT.readOnly = false;
    FECHAN_INPUT.readOnly = false;
    ESTADO_INPUT.disabled = false;
    NIVEL_INPUT.disabled = false;
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
    ESTADO_INPUT.disabled = true;
    CONTRA_INPUT.readOnly = true;
    NIVEL_INPUT.disabled = true;
}

// Función para cambiar el color de los botones según el que se haya clicado.
function updateButtonColors(boton) {
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
        b.style.color = 'white';
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
    // Oculta el modal.
    DATA_MODAL.hide();

    // Busca el elemento con el ID 'tabla-tab'.
    var primeraPestana = document.querySelector('#tabla-tab');

    // Verifica si se encontró la primera pestaña.
    if (primeraPestana) {
        // Limpia los campos del formulario llamando a una función 'clearFormInputs'.
        clearFormInputs();

        // Simula un clic en la primera pestaña.
        primeraPestana.click();

        // Muestra el div de la tabla y oculta el div de agregar.
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
    document.getElementById('nivelInput').value = '';
    document.getElementById('contraInput').value = '';
}

// Función para ocultar el modal y cambiar a la primera pestaña de la tabla.
function hideModalAndSwitchTab() {
    // Oculta el modal.
    DATA_MODAL.hide();

    // Busca el elemento con el ID 'tabla-tab'.
    var primeraPestana = document.querySelector('#tabla-tab');

    // Verifica si se encontró la primera pestaña.
    if (primeraPestana) {
        // Limpia los campos del formulario.
        clearFormInputs();

        // Simula un clic en la primera pestaña.
        primeraPestana.click();

        // Muestra el div de la tabla y oculta el div de agregar.
        TABLE_DIV.classList.remove('d-none');
        ADD_DIV.classList.add('d-none');
    }
}

// Itera sobre una colección de formularios y añade un event listener para el evento de enviar el formulario.
Array.from(forms).forEach(form => {
    // Añade un event listener al evento submit del formulario.
    form.addEventListener('submit', event => {
        // Verifica si el formulario no pasa la validación.
        if (!form.checkValidity()) {
            // Previene la acción por defecto de enviar el formulario.
            event.preventDefault();
            // Detiene la propagación del evento para prevenir que se propague a otros elementos.
            event.stopPropagation();
        }
        // Añade la clase 'was-validated' al formulario para aplicar estilos de validación.
        form.classList.add('was-validated');
    }, false);
});

document.getElementById('duiInput').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 9 dígitos
    inputValue = inputValue.slice(0, 9);

    // Formatear el número agregando el guión antes del último dígito si hay al menos dos dígitos
    if (inputValue.length > 1) {
        inputValue = inputValue.slice(0, -1) + '-' + inputValue.slice(-1);
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = inputValue;
});

document.getElementById('telefonoTrabajador').addEventListener('input', function () {
    var telefonoInput = this.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    if (telefonoInput.length > 4) {
        telefonoInput = telefonoInput.substring(0, 4) + '-' + telefonoInput.substring(4, 8);
    }
    this.value = telefonoInput;
});

document.getElementById('duiTrabajador').addEventListener('input', function (event) {
    // Obtener el valor actual del campo de texto
    let inputValue = event.target.value;

    // Limpiar el valor de cualquier carácter que no sea un número
    inputValue = inputValue.replace(/\D/g, '');

    // Asegurar que no haya más de 9 dígitos
    inputValue = inputValue.slice(0, 9);

    // Formatear el número agregando el guión antes del último dígito si hay al menos dos dígitos
    if (inputValue.length > 1) {
        inputValue = inputValue.slice(0, -1) + '-' + inputValue.slice(-1);
    }

    // Actualizar el valor del campo de texto con la entrada formateada
    event.target.value = inputValue;
});

document.getElementById('telefonoInput').addEventListener('input', function () {
    var telefonoInput = this.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    if (telefonoInput.length > 4) {
        telefonoInput = telefonoInput.substring(0, 4) + '-' + telefonoInput.substring(4, 8);
    }
    this.value = telefonoInput;
});

