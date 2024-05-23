const NOMBRES_INPUT = document.getElementById('nombreInput'),
    APELLIDOS_INPUT = document.getElementById('apellidosInput'),
    DUI_INPUT = document.getElementById('duiInput'),
    TEL_INPUT = document.getElementById('telefonoInput'),
    CORREO_INPUT = document.getElementById('correoInput'),
    FECHAN_INPUT = document.getElementById('fechanInput'),
    DIRECCION_INPUT = document.getElementById('direccion');

const forms = document.querySelectorAll('form');
const PASSWORD_FORM = document.getElementById('passwordForm');
const NOMBRE = document.getElementById('nombreDeUsuario');
const CORREO = document.getElementById('correoDeUsuario');

// Declaración de constantes para el modal, el título del modal y el formulario de comentario.
const DATA_MODAL = new bootstrap.Modal('#dataModal'),
    MODAL_TITLE = document.getElementById('modalTitle'),
    COMMENT_FORM = document.getElementById('comentarioForm');

const INFO_FORM = document.getElementById('infoForm');

const CLIENTES_API = 'services/publica/cliente.php';


// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    fillTable();
});


const fillTable = async () => {
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CLIENTES_API, 'readOne');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        const ROW = DATA.dataset;
        NOMBRE.innerHTML = ROW.nombre_trabajador + ' ' + ROW.apellido_trabajador;
        CORREO.innerHTML = ROW.correo_trabajador;
        NOMBRES_INPUT.value = ROW.nombre_trabajador;
        APELLIDOS_INPUT.value = ROW.apellido_trabajador;
        DUI_INPUT.value = ROW.dui_trabajador;
        TEL_INPUT.value = ROW.telefono_trabajador;
        CORREO_INPUT.value = ROW.correo_trabajador;
        FECHAN_INPUT.value = ROW.fecha_de_nacimiento;

        id_worker = ROW.id_trabajador;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

function showFormUser() {
    const FROM_DIV = document.getElementById('formDiv');
    const MAIN = document.getElementById('ContenedorMain');

    // Se muestra el div para agregar trabajador.
    FROM_DIV.classList.remove('d-none');
    // Se oculta el formulario de tabla.
    MAIN.classList.add('d-none');
}
function showPedidos() {
    location.href = '/vistas/publico/tuspedidos.html';
}

const returnBack = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Los datos modificados no serán guardados');
    if (RESPONSE.isConfirmed) {
        location.href = '/vistas/publico/configuraciones.html'
    }
}

const addSave = async () => {
    const btnUpdate = document.getElementById('btnUpdate');

    var textoBoton = btnUpdate.textContent.trim();

    if (textoBoton == 'Guardar') {
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        btnUpdate.textContent = 'Actualizar';
        // Hacer los campos de entrada de solo lectura después de guardar.
        makeFieldsReadOnly(true);
    }
    else if (textoBoton == 'Actualizar') {
        // Hacer los campos de entrada editables para actualizar.
        makeFieldsReadOnly(false);
        btnUpdate.textContent = 'Guardar';
    }
}

function makeFieldsReadOnly(isReadOnly) {
    NOMBRES_INPUT.readOnly = isReadOnly;
    APELLIDOS_INPUT.readOnly = isReadOnly;
    DUI_INPUT.readOnly = isReadOnly;
    TEL_INPUT.readOnly = isReadOnly;
    CORREO_INPUT.readOnly = isReadOnly;
    FECHAN_INPUT.readOnly = isReadOnly;
    DIRECCION_INPUT.readOnly = isReadOnly;
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

document.getElementById('telefonoInput').addEventListener('input', function () {
    var telefonoInput = this.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    if (telefonoInput.length > 4) {
        telefonoInput = telefonoInput.substring(0, 4) + '-' + telefonoInput.substring(4, 8);
    }
    this.value = telefonoInput;
});

// Definición de la función asíncrona para abrir los detalles en el modal.
const openDetails = async () => {
    // Muestra el modal y resetea el formulario de comentario.
    DATA_MODAL.show();
    PASSWORD_FORM.reset();
}

// Definición de la función asíncrona para cancelar y cerrar el modal.
const botonCancelar = async () => {
    // Muestra una confirmación y, si el usuario confirma, oculta el modal.
    const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Se cerrará la ventana emergente');
    if (RESPONSE.isConfirmed) {
        DATA_MODAL.hide();
    }
}

// Definición de la función asíncrona para agregar y cerrar el modal.
const botonAgregar = async () => {
    // Muestra una alerta de éxito y oculta el modal.
    await sweetAlert(1, 'Se ha restablecido la contraseña correctamente', true);
    DATA_MODAL.hide();
}
