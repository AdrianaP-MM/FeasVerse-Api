// Constantes para establecer el contenido
const CONTAINER_MARCAS = document.getElementById('carousel_inner');
const CONTAINER_RECIENTE = document.getElementById('container_coleccion_reciente');
const CONTAINER_ESPECIAL = document.getElementById('container_coleccion_especial');
const MARCAS_API = 'services/publica/marcas.php';
const ZAPATOS_API = 'services/publica/zapatos.php';

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
    readMarcas();
    readColeccionReciente();
    readSeleccionEspecial();
}

const readSeleccionEspecial = async () => {
    CONTAINER_ESPECIAL.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ZAPATOS_API, 'readAllEspecial');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CONTAINER_ESPECIAL.innerHTML += `
            <div class="card col-4 cardC">
                <!-- Enlace a la página de detalles del zapato -->
                <a href="../../vistas/publico/detalle_zapato.html?zapato=${row.id_zapato}" class="text15">
                    <!-- Contenedor de la imagen del zapato -->
                    <div class="image-wrapper2">
                        <img  src="${SERVER_URL}helpers/images/zapatos/${row.foto_detalle_zapato}">
                        <!-- Imagen del zapato -->
                    </div>
                    <!-- Línea decorativa debajo de la imagen -->
                    <div class="lineImgC"></div>
                    <!-- Cuerpo de la tarjeta -->
                    <div class="card-body">
                        <!-- División de dos columnas -->
                        <div class="d-flex flex-row justify-content-between">
                            <!-- Columna 1 -->
                            <div class="column1 ps-3">
                                <!-- Nombre del zapato -->
                                <h1 class="titillium-web-bold text25 text-black">${row.nombre_zapato}
                                    <!-- Descripción del zapato -->
                                    <p class="titillium-web-extralight text18 clgr3 mt-2">Zapato ${row.genero_zapato}</p>
                                </h1>
                                <!-- División para icono de estrella y calificación -->
                                <div class="d-flex flex-row align-items-center mt-2 ">
                                    <!-- Icono de estrella -->
                                    <img src="../../recursos/imagenes/icons/starFill.svg" alt="">
                                    <!-- Calificación del zapato -->
                                    <p class="titillium-web-bold text25 m-0 align-baselin clYellowStar">${row.estrellas !== null ? row.estrellas : 0}</p>
                                </div>
                            </div>
                            <!-- Columna 2 -->
                            <div class="column2 align-items-center">
                                <!-- Número de colores disponibles -->
                                <p class="titillium-web-extralight text18 mb-5 clgr3">${row.colores} colores</p>
                                <!-- Precio del zapato -->
                                <h1 class="titillium-web-bold text25 text-black fit"> $${row.precio_unitario_zapato}</h1>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            `;
        });
    } else {
        //sweetAlert(2, DATA.error, false);
    }
}

const readColeccionReciente = async () => {
    CONTAINER_RECIENTE.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ZAPATOS_API, 'readAllReciente');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CONTAINER_RECIENTE.innerHTML += `
            <div class="card col-4 cardC">
                <!-- Enlace a la página de detalles del zapato -->
                <a href="../../vistas/publico/detalle_zapato.html?zapato=${row.id_zapato}" class="text15">
                    <!-- Contenedor de la imagen del zapato -->
                    <div class="image-wrapper2">
                        <img  src="${SERVER_URL}helpers/images/zapatos/${row.foto_detalle_zapato}">
                        <!-- Imagen del zapato -->
                    </div>
                    <!-- Línea decorativa debajo de la imagen -->
                    <div class="lineImgC"></div>
                    <!-- Cuerpo de la tarjeta -->
                    <div class="card-body">
                        <!-- División de dos columnas -->
                        <div class="d-flex flex-row justify-content-between">
                            <!-- Columna 1 -->
                            <div class="column1 ps-3">
                                <!-- Nombre del zapato -->
                                <h1 class="titillium-web-bold text25 text-black">${row.nombre_zapato}
                                    <!-- Descripción del zapato -->
                                    <p class="titillium-web-extralight text18 clgr3 mt-2">Zapato ${row.genero_zapato}</p>
                                </h1>
                                <!-- División para icono de estrella y calificación -->
                                <div class="d-flex flex-row align-items-center mt-2 ">
                                    <!-- Icono de estrella -->
                                    <img src="../../recursos/imagenes/icons/starFill.svg" alt="">
                                    <!-- Calificación del zapato -->
                                    <p class="titillium-web-bold text25 m-0 align-baselin clYellowStar">${row.estrellas !== null ? row.estrellas : 0}</p>
                                </div>
                            </div>
                            <!-- Columna 2 -->
                            <div class="column2 align-items-center">
                                <!-- Número de colores disponibles -->
                                <p class="titillium-web-extralight text18 mb-5 clgr3">${row.colores} colores</p>
                                <!-- Precio del zapato -->
                                <h1 class="titillium-web-bold text25 text-black fit"> $${row.precio_unitario_zapato}</h1>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            `;
        });
    } else {
        //sweetAlert(2, DATA.error, false);
    }
}

const readMarcas = async () => {
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
                        <a href="../../vistas/publico/buscador.html?marca=${row.id_marca}"><img
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
        //sweetAlert(2, DATA.error, false);
    }
}
