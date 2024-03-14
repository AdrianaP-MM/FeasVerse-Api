const NOMBREC_INPUT = document.getElementById('nombreColor');

const DATA_MODAL = new bootstrap.Modal('#dataModal');
const DATA_TALLAS_MODAL = new bootstrap.Modal('#dataModalT');
MODAL_TITLE_TALLA = document.getElementById('modalTitleT');



MODAL_TITLE = document.getElementById('modalTitle'),
    UPDATE_FORM = document.getElementById('updateFrom');

const BOTON_ACTUALIZAR = document.getElementById('actualizarBtn');

document.querySelector('title').textContent = 'Feasverse - Zapatos';

const COLORES_DIV = document.getElementById('colores');
const AGREGAR_DIV = document.getElementById('agregar');
const AGREGAR_PASO_DOS_DIV = document.getElementById('paso2');


// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    NOMBREC_INPUT.readOnly = true;
    document.getElementById('registrados-tab').click();
});

function showZapatos(button) {
    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}

function showColores(boton) {
    // Se muestra el div para colores.
    COLORES_DIV.classList.remove('d-none');
    // Se oculta la visualizacion de agregar.
    AGREGAR_DIV.classList.add('d-none');

    AGREGAR_PASO_DOS_DIV.classList.add('d-none');

    // Restablece el color de todos los botones
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
    });



    // Cambia el color del botón clicado
    boton.style.backgroundColor = '#1A89BD';
    boton.style.color = 'white';
}

function showPaso2(boton) {
    // Se muestra el div para colores.
    COLORES_DIV.classList.add('d-none');
    // Se oculta la visualizacion de agregar.
    AGREGAR_DIV.classList.add('d-none');

    AGREGAR_PASO_DOS_DIV.classList.remove('d-none');
}

function showAgregar(boton) {
    // Se muestra el div para agregar zapato.
    AGREGAR_DIV.classList.remove('d-none');
    // Se oculta la visualizacion de los colores.
    COLORES_DIV.classList.add('d-none');

    AGREGAR_PASO_DOS_DIV.classList.addx('d-none');

    // Restablece el color de todos los botones
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
    });

    // Cambia el color del botón clicado
    boton.style.backgroundColor = '#1A89BD';
    boton.style.color = 'white';
}

// Se agrega un evento al elemento subyacente del modal que se dispara después de que se haya ocultado.
DATA_MODAL._element.addEventListener('hidden.bs.modal', function () {
    // Después de que el modal se haya ocultado, realiza la siguiente acción:

    // Cambia el texto del botón con el ID 'actualizarBtn' a "Actualizar".
    BOTON_ACTUALIZAR.textContent = "Actualizar";
});


// Definición de la función asíncrona llamada 'openDetails'.
const openDetails = async () => {
    // Muestra la caja de diálogo modal con su título.
    DATA_MODAL.show();

    // Prepara el formulario de actualización reseteándolo a sus valores por defecto.
    UPDATE_FORM.reset();

    // Establece valores predeterminados en algunos campos del formulario.
    NOMBREC_INPUT.value = "Rojo";

    // Cambia el contenido del elemento con ID 'modalTitle' a 'Cplores'.
    MODAL_TITLE.textContent = 'Detalles Color: Rojo';
}

// Definición de la función asíncrona llamada 'botonActualizar'.
const botonActualizar = async () => {
    // Obtiene el texto contenido en el botón de actualización y elimina los espacios en blanco al principio y al final.
    var textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    // Verifica si el texto del botón es 'Actualizar'.
    if (textoBoton == 'Actualizar') {
        // Si es 'Actualizar', habilita la edición de ciertos campos del formulario.
        NOMBREC_INPUT.readOnly = false;

        // Cambia el texto del botón a 'Guardar'.
        BOTON_ACTUALIZAR.textContent = "Guardar";
    }
    // Verifica si el texto del botón es 'Guardar'.
    else if (textoBoton == 'Guardar') {
        // Si es 'Guardar', muestra una alerta de confirmación y oculta el modal.
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        DATA_MODAL.hide();
    }
}

// Definición de la función asíncrona llamada 'botonCancelar'.
const botonCancelar = async () => {
    // Obtiene el texto contenido en el botón de actualización y elimina los espacios en blanco al principio y al final.
    var textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    // Verifica si el texto del botón es 'Actualizar'.
    if (textoBoton == 'Actualizar') {
        // Si es 'Actualizar', llama a una función para mostrar un mensaje de confirmación y captura la respuesta en una constante llamada 'RESPONSE'.
        const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Se cerrará la ventana emergente');

        // Verifica si el usuario ha confirmado la acción y, si es así, oculta el modal.
        if (RESPONSE.isConfirmed) {
            DATA_MODAL.hide();
        }
    }
    // Verifica si el texto del botón es 'Guardar'.
    else if (textoBoton == 'Guardar') {
        // Si es 'Guardar', llama a una función para mostrar un mensaje de confirmación y captura la respuesta en una constante llamada 'RESPONSE'.
        const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Si has modificado no se guardará');

        // Verifica si el usuario ha confirmado la acción y, si es así, oculta el modal.
        if (RESPONSE.isConfirmed) {
            DATA_MODAL.hide();
        }
    }
}

const openTallas = async () => {
    // Muestra la caja de diálogo modal con su título.
    DATA_TALLAS_MODAL.show();

    // Cambia el contenido del elemento con ID 'modalTitle' a 'Cplores'.
    MODAL_TITLE_TALLA.textContent = 'Tallas y Stock del Producto';
}

// Función para mostrar la imagen seleccionada en un elemento de imagen.
function displaySelectedImage(event, elementId) {
    // Obtiene el elemento de imagen según su ID.
    const selectedImage = document.getElementById(elementId);
    // Obtiene el elemento de entrada de archivo del evento.
    const fileInput = event.target;

    // Verifica si hay archivos seleccionados y al menos uno.
    if (fileInput.files && fileInput.files[0]) {
        // Crea una instancia de FileReader para leer el contenido del archivo.
        const reader = new FileReader();

        // Define el evento que se ejecutará cuando la lectura sea exitosa.
        reader.onload = function (e) {
            // Establece la fuente de la imagen como el resultado de la lectura (base64).
            selectedImage.src = e.target.result;
        };

        // Inicia la lectura del contenido del archivo como una URL de datos.
        reader.readAsDataURL(fileInput.files[0]);
    }
}