// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    var primeraPestana = document.querySelector('#marcas-tab');
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

        reader.onload = function(e) {
            selectedImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}

const openDetails = async () => {

    const NOMBRE_MARCA_INPUT = document.getElementById('nombreMarcaD'),
        DESCRIPCION_MARCA_INPUT = document.getElementById('descripcionMarcaD');

    const DATA_MODAL = new bootstrap.Modal('#dataModal'),
        MODAL_TITLE = document.getElementById('modalTitle'),
        UPDATE_FORM = document.getElementById('updateFrom');

    // Se muestra la caja de diálogo con su título.
    DATA_MODAL.show();
    // Se prepara el formulario.
    UPDATE_FORM.reset();
    // Ahora puedes hacer lo que necesites con el array de valores
    NOMBRE_MARCA_INPUT.value = "ADIDAS";
    DESCRIPCION_MARCA_INPUT.value = 'Buena marca de zapatos';
    MODAL_TITLE.textContent = 'Detalles Marca';

}
