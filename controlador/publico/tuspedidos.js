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

    accordionButton.click();
});
