// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Clientes';

//declaracion de las variables
const ID_INPUT = document.getElementById('idCliente'),
    NOMBRES_INPUT = document.getElementById('nombreCliente'),
    APELLIDOS_INPUT = document.getElementById('apellidosCliente'),
    DUI_INPUT = document.getElementById('duiCliente'),
    TEL_INPUT = document.getElementById('telefonoCliente'),
    CORREO_INPUT = document.getElementById('correoCliente'),
    FECHAN_INPUT = document.getElementById('fechaDeNacimientoCliente'),
    FECHAR_INPUT = document.getElementById('fechaDeRegistroCliente'),
    ESTADO_INPUT = document.getElementById('estadoCliente');
const TABLE_BODY = document.getElementById('tableBody');

const BOTON_ACTUALIZAR = document.getElementById('actualizarBtn');

const DATA_MODAL = new bootstrap.Modal('#dataModal');
const MODAL_TITLE = document.getElementById('modalTitle');
const UPDATE_FORM = document.getElementById('detailUpdateForm');

const CLIENTES_API = 'services/privada/clientes.php';

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    // Bloquear el botón y mostrar la pestaña al cargar la página
    // Mostrar la pestaña
    document.getElementById('tabla-tab').click();
    // Bloquear el botón
    document.getElementById('tabla-tab').setAttribute('disabled', 'disabled');

    fillTable();
});

//Constante para abrir detalles cuando se le de doble click a la tabla
const openDetails = async (idCliente) => {
    const FORM_ID = new FormData();
    FORM_ID.append('idCliente', idCliente);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CLIENTES_API, 'readOne', FORM_ID);
    if (DATA.status) {
        // Se prepara el formulario.
        UPDATE_FORM.reset();
        // Se muestra la caja de diálogo con su título.
        DATA_MODAL.show();
        const ROW = DATA.dataset;
        ID_INPUT.value = ROW.id_cliente;
        NOMBRES_INPUT.value = ROW.nombre_cliente;
        APELLIDOS_INPUT.value = ROW.apellido_cliente;
        DUI_INPUT.value = ROW.dui_cliente;
        TEL_INPUT.value = ROW.telefono_cliente;
        CORREO_INPUT.value = ROW.correo_cliente;
        FECHAN_INPUT.value = ROW.fecha_de_nacimiento;
        FECHAR_INPUT.value = ROW.fecha_de_registro;
        if (ROW.estado_cliente == 1) {
            ESTADO_INPUT.value = 1;
            ESTADO_INPUT.selectedIndex = 1;
        }
        else if (ROW.estado_cliente == 2) {
            ESTADO_INPUT.value = 2;
            ESTADO_INPUT.selectedIndex = 2;
        }

        // Deshabilitar la edición de los campos de entrada
        NOMBRES_INPUT.readOnly = true;
        APELLIDOS_INPUT.readOnly = true;
        DUI_INPUT.readOnly = true;
        TEL_INPUT.readOnly = true;
        CORREO_INPUT.readOnly = true;
        FECHAN_INPUT.readOnly = true;
        FECHAR_INPUT.readOnly = true;
        ESTADO_INPUT.disabled = true;

        MODAL_TITLE.textContent = 'Detalles de Clientes #' + idCliente;
    }
    else {
        sweetAlert(2, DATA.error, false);
    }
};

//Funcion cuando se muestre la pestaña de la tabla
function showTableDiv(button) {
    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}

//Evento cuando el modal esta oculto
DATA_MODAL._element.addEventListener('hidden.bs.modal', function () {
    // Después de que el modal se haya ocultado, cambiar el texto del botón a "Actualizar"
    BOTON_ACTUALIZAR.textContent = "Actualizar";
});


//Funcion del boton actualizar
const botonActualizar = async () => {
    //se obtiene el texto del boton sin espacios
    var textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    if (textoBoton == 'Actualizar') {

        // habilitar la edición de los campos de entrada
        NOMBRES_INPUT.readOnly = false;
        APELLIDOS_INPUT.readOnly = false;
        DUI_INPUT.readOnly = false;
        TEL_INPUT.readOnly = false;
        CORREO_INPUT.readOnly = false;
        FECHAN_INPUT.readOnly = false;
        ESTADO_INPUT.disabled = false;

        BOTON_ACTUALIZAR.textContent = "Guardar";
    }
    else if (textoBoton == 'Guardar') {
        // Se evita recargar la página web después de enviar el formulario.
        event.preventDefault();

        const FORM = new FormData();

        // Petición para ACTUALIZAR.
        FORM.append('idCliente', ID_INPUT.value);
        FORM.append('nombreCliente', NOMBRES_INPUT.value);
        FORM.append('apellidosCliente', APELLIDOS_INPUT.value);
        FORM.append('correoCliente', CORREO_INPUT.value);
        FORM.append('telefonoCliente', TEL_INPUT.value);
        FORM.append('duiCliente', DUI_INPUT.value);
        FORM.append('fechaDeNacimientoCliente', FECHAN_INPUT.value);
        FORM.append('estadoCliente', ESTADO_INPUT.value);

        const DATA = await fetchData(CLIENTES_API, 'updateRow', FORM);
        console.log(DATA);
        if (DATA.status) {
            // Deshabilitar la edición de los campos de entrada
            NOMBRES_INPUT.readOnly = true;
            APELLIDOS_INPUT.readOnly = true;
            DUI_INPUT.readOnly = true;
            TEL_INPUT.readOnly = true;
            CORREO_INPUT.readOnly = true;
            FECHAN_INPUT.readOnly = true;
            FECHAR_INPUT.readOnly = true;
            ESTADO_INPUT.disabled = true;
            await sweetAlert(1, 'Se ha actualizado correctamente', true);
            fillTable();
            DATA_MODAL.hide();
        } else {
            await sweetAlert(2, DATA.error, false);
        }
    }
}

//Funcion del boton cancelar
const botonCancelar = async () => {
    //se obtiene el texto del boton sin espacios
    var textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    if (textoBoton == 'Actualizar') {
        // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
        const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Se cerrará la ventana emergente');
        if (RESPONSE.isConfirmed) {
            DATA_MODAL.hide();
        }
    }
    else if (textoBoton == 'Guardar') {
        // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
        const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Si has modificado no se guardara');
        if (RESPONSE.isConfirmed) {
            DATA_MODAL.hide();
        }
    }

}

document.getElementById('duiCliente').addEventListener('input', function (event) {
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

document.getElementById('telefonoCliente').addEventListener('input', function () {
    var telefonoInput = this.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    if (telefonoInput.length > 4) {
        telefonoInput = telefonoInput.substring(0, 4) + '-' + telefonoInput.substring(4, 8);
    }
    this.value = telefonoInput;
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CLIENTES_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
            <tr class="table-row" ondblclick="openDetails(${row.id_cliente})">
                <td>${row.id_cliente}</td>
                <td>${row.apellido_cliente}</td>
                <td>${row.nombre_cliente}</td>
                <td>${row.dui_cliente}</td>
                <td>${row.telefono_cliente}-3</td>
                <td>${row.correo_cliente}</td>
                <td>${row.estado_cliente}</td>
            </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        if (DATA.dataset == 0) {
            await sweetAlert(1, DATA.message, true);
        }
    } else {
        sweetAlert(4, DATA.error, true);
    }
}