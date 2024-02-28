const NOMBRE_INPUT = document.getElementById('nombreMarca'),
    DESC_INPUT = document.getElementById('descripcionMarca'),
    IMG_INPUT = document.getElementById('selectedImage');

const NOMBRED_INPUT = document.getElementById('nombreMarcaD'),
    DESCD_INPUT = document.getElementById('descripcionMarcaD'),
    IMGD_INPUT = document.getElementById('selectedImageD');

const DATA_MODAL = new bootstrap.Modal('#dataModal'),
    MODAL_TITLE = document.getElementById('modalTitle'),
    UPDATE_FORM = document.getElementById('updateFrom');

var primeraPestana = document.querySelector('#marcas-tab');

const BOTON_ACTUALIZAR = document.getElementById('actualizarBtn');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    if (primeraPestana) {
        primeraPestana.click();
        // Se muestra el div de tabla
        MARCA_DIV.classList.remove('d-none');
        ADD_DIV.classList.add('d-none');
    }
});

// Constante para establecer el espacio de tabla y el espacio de agregar.
const MARCA_DIV = document.getElementById('marcas');
const ADD_DIV = document.getElementById('agregar');

function showAddDiv(boton) {
    // Se muestra el div para agregar trabajador.
    ADD_DIV.classList.remove('d-none');
    // Se oculta el formulario de tabla.
    MARCA_DIV.classList.add('d-none');

    // Restablece el color de todos los botones
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
    });

    // Cambia el color del botón clicado
    boton.style.backgroundColor = '#1A89BD';
    boton.style.color = 'white';
}


function ShowMarcasDiv(boton) {
    // Se muestra el div para agregar trabajador.
    MARCA_DIV.classList.remove('d-none');
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

function displaySelectedImage(event, elementId) {
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            selectedImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}

DATA_MODAL._element.addEventListener('hidden.bs.modal', function () {
    // Después de que el modal se haya ocultado, cambiar el texto del botón a "Actualizar"
    BOTON_ACTUALIZAR.textContent = "Actualizar";
});

const returnBack = async () => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Seguro qué quieres cancelar?', 'Los datos ingresados no serán guardados');
    if (RESPONSE.isConfirmed) {
        NOMBRE_INPUT.value = ' ';
        DESC_INPUT.value = ' ';
        IMG_INPUT.src = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
        primeraPestana.click();
        // Se muestra el div de tabla
        MARCA_DIV.classList.remove('d-none');
        ADD_DIV.classList.add('d-none');
    }
}

const addSave = async () => {
    await sweetAlert(1, 'Se ha guardado correctamente', true);
    NOMBRE_INPUT.value = ' ';
    DESC_INPUT.value = ' ';
    IMG_INPUT.src = 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg';
}

const openDetails = async () => {
    // Se muestra la caja de diálogo con su título.
    DATA_MODAL.show();
    // Se prepara el formulario.
    UPDATE_FORM.reset();
    // Ahora puedes hacer lo que necesites con el array de valores
    NOMBRED_INPUT.value = "ADIDAS";
    DESCD_INPUT.value = 'Buena marca de zapatos';

    IMGD_INPUT.src = '/recursos/imagenes/marcas/adidas.svg';
    MODAL_TITLE.textContent = 'Detalles Marca';
}


const botonActualizar = async () => {
    var textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    if (textoBoton == 'Actualizar') {

        NOMBRED_INPUT.readOnly = false;
        DESCD_INPUT.readOnly = false;

        BOTON_ACTUALIZAR.textContent = "Guardar";
    }
    else if (textoBoton == 'Guardar') {

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
