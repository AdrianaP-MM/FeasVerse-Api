const BOTON_ACTUALIZAR = document.getElementById('actualizarBtn');

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

const DATA_MODAL = new bootstrap.Modal('#dataModal'),
    MODAL_TITLE = document.getElementById('modalTitle'),
    UPDATE_FORM = document.getElementById('updateFrom');

// Constante para establecer el espacio de tabla y el espacio de agregar.
const TABLE_DIV = document.getElementById('tabla');
const ADD_DIV = document.getElementById('agregar');

const forms = document.querySelectorAll('.needs-validation')

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

    // Deshabilitar la edición de los campos de entrada
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

    MODAL_TITLE.textContent = 'Detalles Trabajador #' + id;

}

DATA_MODAL._element.addEventListener('hidden.bs.modal', function () {
    // Después de que el modal se haya ocultado, cambiar el texto del botón a "Actualizar"
    BOTON_ACTUALIZAR.textContent = "Actualizar";
});

const botonActualizar = async () => {
    var textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    if (textoBoton == 'Actualizar') {

        // habilitar la edición de los campos de entrada
        NOMBRES_INPUT.readOnly = false;
        APELLIDOS_INPUT.readOnly = false;
        DUI_INPUT.readOnly = false;
        TEL_INPUT.readOnly = false;
        CORREO_INPUT.readOnly = false;
        FECHAN_INPUT.readOnly = false;
        ESTADO_INPUT.readOnly = false;
        NIVEL_INPUT.readOnly = false;
        CONTRA_INPUT.readOnly = false;

        BOTON_ACTUALIZAR.textContent = "Guardar";
    }
    else if (textoBoton == 'Guardar') {
        // Deshabilitar la edición de los campos de entrada
        NOMBRES_INPUT.readOnly = true;
        APELLIDOS_INPUT.readOnly = true;
        DUI_INPUT.readOnly = true;
        TEL_INPUT.readOnly = true;
        CORREO_INPUT.readOnly = true;
        FECHAN_INPUT.readOnly = true;
        ESTADO_INPUT.readOnly = true;
        CONTRA_INPUT.readOnly = true;
        NIVEL_INPUT.readOnly = true;
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        DATA_MODAL.hide();
    }
}

const botonCancelar = async () => {
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
        const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Si has modificado no se guardará');
        if (RESPONSE.isConfirmed) {
            DATA_MODAL.hide();
        }
    }

}
const returnBack = async () => {

    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Los datos ingresados no serán guardados');
    if (RESPONSE.isConfirmed) {
        DATA_MODAL.hide();
        var primeraPestana = document.querySelector('#tabla-tab');
        if (primeraPestana) {

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

            primeraPestana.click();
            // Se muestra el div de tabla
            TABLE_DIV.classList.remove('d-none');
            ADD_DIV.classList.add('d-none');
        }
    }
}


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

Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        
        form.classList.add('was-validated')
    }, false)
})