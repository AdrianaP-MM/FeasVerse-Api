// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Clientes';

//declaracion de las variables
const NOMBRES_INPUT = document.getElementById('nombreCliente'),
APELLIDOS_INPUT = document.getElementById('apellidosCliente'),
DUI_INPUT = document.getElementById('duiCliente'),
TEL_INPUT = document.getElementById('telefonoCliente'),
CORREO_INPUT = document.getElementById('correoCliente'),
FECHAN_INPUT = document.getElementById('fechaDeNacimientoCliente'),
FECHAR_INPUT = document.getElementById('fechaDeRegistroCliente'),
ESTADO_INPUT = document.getElementById('estadoCliente');

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

//Constante para abrir detalles cuando se le de doble click a la tabla
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

    
        // Deshabilitar la edición de los campos de entrada
        NOMBRES_INPUT.readOnly = true;
        APELLIDOS_INPUT.readOnly = true;
        DUI_INPUT.readOnly = true;
        TEL_INPUT.readOnly = true;
        CORREO_INPUT.readOnly = true;
        FECHAN_INPUT.readOnly = true;
        FECHAR_INPUT.readOnly = true;
        ESTADO_INPUT.disabled = true;

        // Se coloca los valores en el input
        NOMBRES_INPUT.value = values[2];
        APELLIDOS_INPUT.value = values[1];
        DUI_INPUT.value = values[3];
        TEL_INPUT.value =  values[4];
        CORREO_INPUT.value = values[5] ;
        FECHAN_INPUT.value = '2024-09-03';
        FECHAR_INPUT.value = '2024-03-04';

    if (values[6] === 'Vigente'){
        ESTADO_INPUT.value = 1;
    }
    else{
        ESTADO_INPUT.value = 2;
    }

    

    //Titulo del modal con el id del cliente
    var idCliente = values[0];
    MODAL_TITLE.textContent = 'Detalles de Clientes #'+idCliente;
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
const botonActualizar = async () =>  {
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
    else if(textoBoton == 'Guardar'){
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
        DATA_MODAL.hide();
    }
}

//Funcion del boton cancelar
const  botonCancelar = async () => {
    //se obtiene el texto del boton sin espacios
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