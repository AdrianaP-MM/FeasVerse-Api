// Constantes para establecer el contenido
const CONTAINER_MARCAS = document.getElementById('carousel_inner');
const MARCAS_API = 'services/publica/marcas.php';

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    fillTable();
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async () => {
    CONTAINER_MARCAS.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(MARCAS_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        let carouselItem = '';
        let count = 0;

        DATA.dataset.forEach((row, index) => {
            // Si el índice es múltiplo de 4, crea un nuevo carousel-item y cards-wrapper
            if (count % 4 === 0) {
                if (count !== 0) {
                    // Cierra el cards-wrapper y carousel-item previos
                    carouselItem += `</div></div>`;
                }
                // Abre un nuevo carousel-item y cards-wrapper
                carouselItem += `<div class="carousel-item ${count === 0 ? 'active' : ''}">
                                    <div class="cards-wrapper">`;
            }

            // Añade la tarjeta al cards-wrapper actual
            carouselItem += `
                <div class="card cardM">
                    <div class="image-wrapper">
                        <a href="../../vistas/publico/buscador.html"><img
                                src="${SERVER_URL}helpers/images/marcas/${row.foto_marca}" alt="${row.nombre}"></a>
                    </div>
                </div>
            `;

            count++;

            // Si es el último elemento, cierra el cards-wrapper y carousel-item
            if (index === DATA.dataset.length - 1) {
                carouselItem += `</div></div>`;
            }
        });

        CONTAINER_MARCAS.innerHTML = carouselItem;

        if (DATA.dataset.length === 0) {
            await sweetAlert(1, DATA.message, true);
        }

    } else {
        sweetAlert(2, DATA.error, false);
    }
}