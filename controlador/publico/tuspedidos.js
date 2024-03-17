// Declaración de constantes para el modal, el título del modal y el formulario de comentario.
const DATA_MODAL = new bootstrap.Modal('#dataModal'),
    MODAL_TITLE = document.getElementById('modalTitle'),
    COMMENT_FORM = document.getElementById('comentarioForm');

// Selección de elementos de estrellas usando getElementsByClassName y querySelectorAll
// Corregí el selector de getElementsByClassName eliminando el punto al inicio
const STAR = document.getElementsByClassName('star');
const STARS = document.querySelectorAll('.star a');

// Evento que se dispara cuando el documento HTML ha cargado completamente
document.addEventListener('DOMContentLoaded', async () => {
    // Llama a una función para cargar el encabezado y el pie de página del documento
    loadTemplate();

    // Selecciona el botón de accordion y agrega un evento click para expandir o contraer detalles.
    const accordionButton = document.getElementById('accordionButtonPrecioTotal');
    accordionButton.addEventListener('click', function () {
        const isExpanded = accordionButton.getAttribute('aria-expanded') === 'true';
        // Cambia la visibilidad del contenedor de detalles según si está expandiendo o contrayendo
        const COLOR_DEL_ESTADO = document.getElementById('colorDelEstadoDelPedido');
        if (isExpanded) {
            COLOR_DEL_ESTADO.classList.remove('d-none');
        } else {
            COLOR_DEL_ESTADO.classList.add('d-none');
        }
    });

    // Asigna un evento de clic a cada estrella para agregar la clase 'active' a las estrellas seleccionadas
    STARS.forEach((item, index1) => {
        item.addEventListener('click', () => {
            STARS.forEach((STAR, index2) => { 
                index1 >= index2 ? STAR.classList.add('active') : STAR.classList.remove('active');
            });
        });
    });

    // Simula un clic en el botón de accordion al cargar la página para mostrar u ocultar los detalles
    accordionButton.click();
});

// Definición de la función asíncrona para abrir los detalles en el modal.
const openDetails = async () => {
    // Muestra el modal y resetea el formulario de comentario.
    DATA_MODAL.show();
    COMMENT_FORM.reset();
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
    await sweetAlert(1, 'Se ha agregado correctamente', true);
    DATA_MODAL.hide();
}
