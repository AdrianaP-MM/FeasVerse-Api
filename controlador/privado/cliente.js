// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Clientes';

const NOMBRES_INPUT = document.getElementById('nombreCliente');
const APELLIDOS_INPUT = document.getElementById('apellidosCliente');
const DUI_INPUT = document.getElementById('duiCliente');
const TEL_INPUT = document.getElementById('telefonoCliente');
const CORREO_INPUT = document.getElementById('correoCliente');
const FECHAN_INPUT = document.getElementById('fechaDeNacimientoCliente');
const FECHAR_INPUT = document.getElementById('fechaDeRegistroCliente');
const ESTADO_INPUT = document.getElementById('estadoCliente');

const BOTON_ACTUALIZAR = document.getElementById('actualizarBtn');

const DATA_MODAL = new bootstrap.Modal('#dataModal');
const MODAL_TITLE = document.getElementById('modalTitle');
const UPDATE_FORM = document.getElementById('detailUpdateForm');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    // Bloquear el botón y mostrar la pestaña al cargar la página
    // Mostrar la pestaña
    document.getElementById('tabla-tab').click();
    // Bloquear el botón
    document.getElementById('tabla-tab').setAttribute('disabled', 'disabled');
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
    TEL_INPUT.value =  values[4];
    CORREO_INPUT.value = values[5] ;
    FECHAN_INPUT.value = '...';
    FECHAR_INPUT.value = '...';
    ESTADO_INPUT.value = values[6];

    // Deshabilitar la edición de los campos de entrada
    NOMBRES_INPUT.readOnly = true;
    APELLIDOS_INPUT.readOnly = true;
    DUI_INPUT.readOnly = true;
    TEL_INPUT.readOnly = true;
    CORREO_INPUT.readOnly = true;
    FECHAN_INPUT.readOnly = true;
    FECHAR_INPUT.readOnly = true;
    ESTADO_INPUT.readOnly = true;

    var idCliente = values[0];
    MODAL_TITLE.textContent = 'Detalles de Clientes #'+idCliente;
};

function showTableDiv(button) {
    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}

DATA_MODAL._element.addEventListener('hidden.bs.modal', function () {
    // Después de que el modal se haya ocultado, cambiar el texto del botón a "Actualizar"
    BOTON_ACTUALIZAR.textContent = "Actualizar";
});

const botonActualizar = async () =>  {
    var textoBoton = BOTON_ACTUALIZAR.textContent.trim();
    
    if (textoBoton == 'Actualizar') {
        
        // habilitar la edición de los campos de entrada
        NOMBRES_INPUT.readOnly = false;
        APELLIDOS_INPUT.readOnly = false;
        DUI_INPUT.readOnly = false;
        TEL_INPUT.readOnly = false;
        CORREO_INPUT.readOnly = false;
        FECHAN_INPUT.readOnly = false;
        FECHAR_INPUT.readOnly = false;
        ESTADO_INPUT.readOnly = false;

        BOTON_ACTUALIZAR.textContent = "Guardar";
    }
    else if(textoBoton == 'Guardar'){
        // Deshabilitar la edición de los campos de entrada
        NOMBRES_INPUT.readOnly = true;
        APELLIDOS_INPUT.readOnly = true;
        DUI_INPUT.readOnly = true;
        TEL_INPUT.readOnly = true;
        CORREO_INPUT.readOnly = true;
        FECHAN_INPUT.readOnly = true;
        FECHAR_INPUT.readOnly = true;
        ESTADO_INPUT.readOnly = true;
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        DATA_MODAL.hide();
    }
}

const  botonCancelar = async () => {
    var textoBoton = BOTON_ACTUALIZAR.textContent.trim();
    
    if (textoBoton == 'Actualizar') {
        // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
        const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Se cerrará la ventana emergente');
        if(RESPONSE.isConfirmed){
            DATA_MODAL.hide();
        }
    }
    else if(textoBoton == 'Guardar'){
        // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
        const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Si has modificado no se guardara');
        if(RESPONSE.isConfirmed){
        DATA_MODAL.hide();
    }
    }
    
}