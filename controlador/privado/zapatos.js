const NOMBREC_INPUT = document.getElementById('nombreColor');

const DATA_MODAL = new bootstrap.Modal('#dataModal');
const DATA_TALLAS_MODAL = new bootstrap.Modal('#dataModalT');
const DATA_DETALLES_MODAL = new bootstrap.Modal('#dataModalD');
MODAL_TITLE_TALLA = document.getElementById('modalTitleT');
MODAL_TITLE_DETALLE = document.getElementById('modalTitleD');





MODAL_TITLE = document.getElementById('modalTitle'),
    UPDATE_FORM = document.getElementById('updateFrom');

const BOTON_ACTUALIZAR = document.getElementById('actualizarBtn');
const BOTON_ACTUALIZAR2 = document.getElementById('actualizarBtn2');
const BOTON_ACTUALIZAR3 = document.getElementById('actualizarBtn3');

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

// Se agrega un evento al elemento subyacente del modal que se dispara después de que se haya ocultado.
DATA_DETALLES_MODAL._element.addEventListener('hidden.bs.modal', function () {
    // Después de que el modal se haya ocultado, realiza la siguiente acción:

    // Cambia el texto del botón con el ID 'actualizarBtn' a "Actualizar".
    BOTON_ACTUALIZAR3.textContent = "Actualizar";
});

// Se agrega un evento al elemento subyacente del modal que se dispara después de que se haya ocultado.
DATA_TALLAS_MODAL._element.addEventListener('hidden.bs.modal', function () {
    // Después de que el modal se haya ocultado, realiza la siguiente acción:

    // Cambia el texto del botón con el ID 'actualizarBtn' a "Actualizar".
    BOTON_ACTUALIZAR2.textContent = "Actualizar";
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

// Definición de la función asíncrona llamada 'botonActualizar'.
const botonActualizar3 = async () => {
    // Obtiene el texto contenido en el botón de actualización y elimina los espacios en blanco al principio y al final.
    var textoBoton = BOTON_ACTUALIZAR3.textContent.trim();

    // Verifica si el texto del botón es 'Actualizar'.
    if (textoBoton == 'Actualizar') {
        // Cambia el texto del botón a 'Guardar'.
        BOTON_ACTUALIZAR3.textContent = "Guardar";
    }
    // Verifica si el texto del botón es 'Guardar'.
    else if (textoBoton == 'Guardar') {
        // Si es 'Guardar', muestra una alerta de confirmación y oculta el modal.
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        DATA_DETALLES_MODAL.hide();
    }
}

// Definición de la función asíncrona llamada 'botonCancelar'.
const botonCancelar3 = async () => {
    // Obtiene el texto contenido en el botón de actualización y elimina los espacios en blanco al principio y al final.
    var textoBoton = BOTON_ACTUALIZAR3.textContent.trim();

    // Verifica si el texto del botón es 'Actualizar'.
    if (textoBoton == 'Actualizar') {
        // Si es 'Actualizar', llama a una función para mostrar un mensaje de confirmación y captura la respuesta en una constante llamada 'RESPONSE'.
        const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Se cerrará la ventana emergente');

        // Verifica si el usuario ha confirmado la acción y, si es así, oculta el modal.
        if (RESPONSE.isConfirmed) {
            DATA_DETALLES_MODAL.hide();
        }
    }
    // Verifica si el texto del botón es 'Guardar'.
    else if (textoBoton == 'Guardar') {
        // Si es 'Guardar', llama a una función para mostrar un mensaje de confirmación y captura la respuesta en una constante llamada 'RESPONSE'.
        const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Si has modificado no se guardará');

        // Verifica si el usuario ha confirmado la acción y, si es así, oculta el modal.
        if (RESPONSE.isConfirmed) {
            DATA_DETALLES_MODAL.hide();
        }
    }
}

const botonActualizar2 = async () => {
    // Obtiene el texto contenido en el botón de actualización y elimina los espacios en blanco al principio y al final.
    var textoBoton = BOTON_ACTUALIZAR2.textContent.trim();

    // Verifica si el texto del botón es 'Actualizar'.
    if (textoBoton == 'Actualizar') {
        // Cambia el texto del botón a 'Guardar'.
        BOTON_ACTUALIZAR2.textContent = "Guardar";
    }
    // Verifica si el texto del botón es 'Guardar'.
    else if (textoBoton == 'Guardar') {
        // Si es 'Guardar', muestra una alerta de confirmación y oculta el modal.
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        DATA_TALLAS_MODAL.hide();
        DATA_DETALLES_MODAL.show();
    }
}

const botonCancelar2 = async () => {
    // Obtiene el texto contenido en el botón de actualización y elimina los espacios en blanco al principio y al final.
    var textoBoton = BOTON_ACTUALIZAR2.textContent.trim();

    // Verifica si el texto del botón es 'Actualizar'.
    if (textoBoton == 'Actualizar') {
        // Si es 'Actualizar', llama a una función para mostrar un mensaje de confirmación y captura la respuesta en una constante llamada 'RESPONSE'.
        const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Se cerrará la ventana emergente');

        // Verifica si el usuario ha confirmado la acción y, si es así, oculta el modal.
        if (RESPONSE.isConfirmed) {
            DATA_TALLAS_MODAL.hide();
            DATA_DETALLES_MODAL.show()
        }
    }
    // Verifica si el texto del botón es 'Guardar'.
    else if (textoBoton == 'Guardar') {
        // Si es 'Guardar', llama a una función para mostrar un mensaje de confirmación y captura la respuesta en una constante llamada 'RESPONSE'.
        const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Si has modificado no se guardará');

        // Verifica si el usuario ha confirmado la acción y, si es así, oculta el modal.
        if (RESPONSE.isConfirmed) {
            DATA_TALLAS_MODAL.hide();
            DATA_DETALLES_MODAL.show()
        }
    }
}

const openTallas = async () => {
    DATA_DETALLES_MODAL.hide();
    // Muestra la caja de diálogo modal con su título.
    DATA_TALLAS_MODAL.show();
    UPDATE_FORM.reset();
    // Cambia el contenido del elemento con ID 'modalTitle' a 'Cplores'.
    MODAL_TITLE_TALLA.textContent = 'Tallas y Stock del Producto';
}

const openDetalles = async () => {
    DATA_DETALLES_MODAL.show();
    MODAL_TITLE_DETALLE.textContent = 'Detalle del zapato';
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