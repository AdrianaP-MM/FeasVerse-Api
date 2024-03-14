const DATA_MODAL = new bootstrap.Modal('#dataModal'),
    MODAL_TITLE = document.getElementById('modalTitle'),
    COMMENT_FORM = document.getElementById('comentarioForm');
const STAR = document.getElementsByClassName('.star');
const STARS = document.querySelectorAll('.star a');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    // Selecciona el botón de accordion y agrega un evento click para expandir o contraer detalles.
    const accordionButton = document.getElementById('accordionButtonPrecioTotal');
    accordionButton.addEventListener('click', function () {
        const isExpanded = accordionButton.getAttribute('aria-expanded') === 'true';
        // Cambia la visibilidad del contenedor de detalles según si está expandiendo o contrayendo
        const COLOR_DEL_ESTADO = document.getElementById('colorDelEstadoDelPedido');
        if (isExpanded) {
            console.log('Hola')
            COLOR_DEL_ESTADO.classList.remove('d-none');
        } else {
            COLOR_DEL_ESTADO.classList.add('d-none');
        }
    });

    STARS.forEach((item, index1) => {
        item.addEventListener('click', () => {
            STARS.forEach((STAR, index2) => { 
                index1 >= index2 ? STAR.classList.add('active') : STAR.classList.remove('active');
            });
        });
    });
    

    accordionButton.click();
});


// Definición de la función asíncrona llamada 'openDetails'.
const openDetails = async () => {
    // Muestra la caja de diálogo modal con su título.
    DATA_MODAL.show();

    // Prepara el formulario de actualización reseteándolo a sus valores por defecto.
    COMMENT_FORM.reset();
}

// Definición de la función asíncrona llamada 'botonCancelar'.
const botonCancelar = async () => {
    // Si es 'Actualizar', llama a una función para mostrar un mensaje de confirmación y captura la respuesta en una constante llamada 'RESPONSE'.
    const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Se cerrará la ventana emergente');

    // Verifica si el usuario ha confirmado la acción y, si es así, oculta el modal.
    if (RESPONSE.isConfirmed) {
        DATA_MODAL.hide();
    }
}

const botonAgregar = async () => {
    // Si es 'Guardar', muestra una alerta de confirmación y oculta el modal.
    await sweetAlert(1, 'Se ha agregado correctamente', true);
    DATA_MODAL.hide();
}