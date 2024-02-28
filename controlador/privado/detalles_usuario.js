const NOMBRES_INPUT = document.getElementById('nombreInput'),
    APELLIDOS_INPUT = document.getElementById('apellidosInput'),
    DUI_INPUT = document.getElementById('duiInput'),
    TEL_INPUT = document.getElementById('telefonoInput'),
    CORREO_INPUT = document.getElementById('correoInput'),
    FECHAN_INPUT = document.getElementById('fechanInput'),
    CONTRA_INPUT = document.getElementById('contraInput'),
    CONTRAC_INPUT = document.getElementById('contraCInput');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
});

function showFormUser() {
    const FROM_DIV = document.getElementById('formDiv');
    const MAIN = document.getElementById('ContenedorMain');

    // Se muestra el div para agregar trabajador.
    FROM_DIV.classList.remove('d-none');
    // Se oculta el formulario de tabla.
    MAIN.classList.add('d-none');
}

const returnBack = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Los datos modificados no serán guardados');
    if (RESPONSE.isConfirmed) {
        location.href = '/vistas/privado/detalles_usuario.html'
    }
}

const addSave = async () => {
    const btnUpdate = document.getElementById('btnUpdate');

    var textoBoton = btnUpdate.textContent.trim();

    if (textoBoton == 'Guardar') {
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        btnUpdate.textContent = 'Actualizar';
        NOMBRES_INPUT.readOnly = true;
        APELLIDOS_INPUT.readOnly = true;
        DUI_INPUT.readOnly = true;
        TEL_INPUT.readOnly = true;
        CORREO_INPUT.readOnly = true;
        FECHAN_INPUT.readOnly = true;
        CONTRA_INPUT.readOnly = true;
        CONTRAC_INPUT.readOnly = true;
    }
    else if (textoBoton == 'Actualizar') {
        NOMBRES_INPUT.readOnly = false;
        APELLIDOS_INPUT.readOnly = false;
        DUI_INPUT.readOnly = false;
        TEL_INPUT.readOnly = false;
        CORREO_INPUT.readOnly = false;
        FECHAN_INPUT.readOnly = false;
        CONTRA_INPUT.readOnly = false;
        CONTRAC_INPUT.readOnly = false;

        btnUpdate.textContent = 'Guardar';
    }
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