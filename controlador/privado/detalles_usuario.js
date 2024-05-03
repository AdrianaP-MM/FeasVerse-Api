// Obtener referencias a elementos del formulario por su ID
const NOMBRES_INPUT = document.getElementById('nombreInput'),
    APELLIDOS_INPUT = document.getElementById('apellidosInput'),
    DUI_INPUT = document.getElementById('duiInput'),
    TEL_INPUT = document.getElementById('telefonoInput'),
    CORREO_INPUT = document.getElementById('correoInput'),
    FECHAN_INPUT = document.getElementById('fechanInput');

const forms = document.querySelectorAll('form');
const PASSWORD_FORM = document.getElementById('passwordForm');

// Declaración de constantes para el modal, el título del modal y el formulario de comentario.
const DATA_MODAL = new bootstrap.Modal('#dataModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
});

// Función para mostrar el formulario de usuario.
function showFormUser() {
    const FROM_DIV = document.getElementById('formDiv');
    const MAIN = document.getElementById('ContenedorMain');

    // Se muestra el div para agregar trabajador.
    FROM_DIV.classList.remove('d-none');
    // Se oculta el formulario de tabla.
    MAIN.classList.add('d-none');
}

// Función para regresar a la página anterior con confirmación.
const returnBack = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Los datos modificados no serán guardados');
    if (RESPONSE.isConfirmed) {
        location.href = 'detalles_usuario.html'
    }
}

// Función para agregar o guardar datos con SweetAlert integrado.
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

// Función para hacer los campos de entrada de solo lectura o editables.
function makeFieldsReadOnly(isReadOnly) {
    NOMBRES_INPUT.readOnly = isReadOnly;
    APELLIDOS_INPUT.readOnly = isReadOnly;
    DUI_INPUT.readOnly = isReadOnly;
    TEL_INPUT.readOnly = isReadOnly;
    CORREO_INPUT.readOnly = isReadOnly;
    FECHAN_INPUT.readOnly = isReadOnly;
    CONTRA_INPUT.readOnly = isReadOnly;
    CONTRAC_INPUT.readOnly = isReadOnly;
}

// Evento para validar el formulario antes de enviarlo.
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        form.classList.add('was-validated')
    }, false)
})


// Definición de la función asíncrona para abrir los detalles en el modal.
const showConDetails = async () => {
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
