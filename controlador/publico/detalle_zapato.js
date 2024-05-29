const CONTAINER_TITLE = document.getElementById('Container_Title');
const CONTAINER_PRECIO_CALIFICACION = document.getElementById('Container_Precio_Calificacion');
const CONTAINER_DESCRIPCION = document.getElementById('Container_Descripcion');
const CONTAINER_IMAGEN = document.getElementById('Container_Imagen');
const CONTAINER_TALLAS = document.getElementById('Container_Tallas');
const ZAPATOS_API = 'services/publica/zapatos.php';

// Evento que se dispara cuando el documento HTML ha cargado completamente
document.addEventListener('DOMContentLoaded', async () => {
    // Llama a una función para cargar el encabezado y el pie de página del documento
    loadTemplate();
    fillTable();
});

const fillTable = async () => {
    CONTAINER_TITLE.innerHTML = '';
    CONTAINER_PRECIO_CALIFICACION.innerHTML = '';
    CONTAINER_DESCRIPCION.innerHTML = '';
    CONTAINER_IMAGEN.innerHTML = '';
    const FORM = new FormData();
    // Obtener los parámetros de la URL
    let id_zapato = Number(getQueryParam('zapato'));
    FORM.append('id_zapato', id_zapato);
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ZAPATOS_API, 'readOneDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        fillSelect(ZAPATOS_API, 'readOneColoresZapato', 'coloresInput', '', FORM);
        DATA.dataset.forEach(row => {
            CONTAINER_TITLE.innerHTML += `
            <!--NOMBRE-->
            <h1 class="m-0 p-0 titillium-web-regular">
                ${row.nombre_marca} ${row.nombre_zapato}
            </h1>
            <!--GENERO-->
            <h6 class="m-0 p-0 titillium-web-regular clgr2">
                Zapatos tipo ${row.genero_zapato} 
            </h6>
            `;
            CONTAINER_PRECIO_CALIFICACION.innerHTML += `
            <!-- PRECIO-->
            <h3 class="m-0 p-0 titillium-web-bold">
                $${row.precio_unitario_zapato}
            </h3>
            <!-- CALIFICACION-->
            <div class="contenedorCalificacion d-flex flex-row align-items-center ms-4">
                <img src="../../recursos/imagenes/icons/starFill.svg" alt="">
                <p class="titillium-web-bold text25 m-0 align-baselin clYellowStar2">${row.estrellas}</p>
            </div>
            `;
            CONTAINER_DESCRIPCION.innerHTML += `
            <div class="tituloDescripcion">
                <h4 class="m-0 p-0 titillium-web-bold">
                    Descripción
                </h4>
                <p class="m-0 p-0 titillium-web-regular mt-2">
                    ${row.descripcion_zapato}
                </p>
            </div>
            `;
            CONTAINER_IMAGEN.innerHTML += `
            <img src="${SERVER_URL}helpers/images/zapatos/${row.foto_detalle_zapato}" class="imgShoe">
            `;
        });
        fillTallas();
    } else {
        sweetAlert(2, DATA.error, false);
    }
}


const fillTallas = async () => {
    CONTAINER_TALLAS.innerHTML = '';
    const FORM = new FormData();
    let id_zapato = Number(getQueryParam('zapato'));
    FORM.append('id_zapato', id_zapato);
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ZAPATOS_API, 'readOneTallas', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CONTAINER_TALLAS.innerHTML += `
            <div class="cuadradoTalla">
                <h5 class="titillium-web-regular m-0 p-0">
                    ${row.num_talla}
                </h5>
            </div>
            `;
        });
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

// Función para mostrar una notificación de éxito cuando se agrega un artículo al carrito
function AddCarrito() {
    Swal.fire({
        title: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        html: `
        <div class="lineaIzq bg-color-1blue"></div>
        <div class="contenedorImg">
            <img src="../../recursos/imagenes/pngHombreFeliz.svg" class="imgHombre">
        </div>
        <div class="contenedorCuerpo mt-4 d-flex flex-column ">
            <h2 class="titillium-web-regular m-0 p-0 title">
                ¡Se ha agregado al carrito!
            </h2>
            <p class="m-0 p-0 titillium-web-regular clgr2 mb-4 text15 mt-2">
                El zapato Jordan XX de color XX Talla XX ha sido exitosamente añadido al carrito de compras.
            </p>

            <button type="button" id="seguirExplorando" onclick="closeSweet()"
                class="btn btn-primary bg-color-5blue col-12 mb-2 mt-2">
                <h6 class="titillium-web-extralight m-0 p-0 py-1">
                    Seguir Explorando
                </h6>
            </button>

            <button type="button" id="irAlCarrito" onclick="gotoCar()"
                class="btn btn-primary shadow col-12 btn2">
                <h6 class="titillium-web-extralight m-0 p-0 py-1">
                    Ir Al carrito
                </h6>
            </button>
        </div>
    `,
    });
}

// Función para cerrar la notificación
function closeSweet() {
    Swal.close();
}

// Función para redirigir al usuario al carrito de compras
function gotoCar() {
    location.href = "../../vistas/publico/carrito.html";
}

// Función para obtener un parámetro específico de la URL
function getQueryParam(Param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(Param);
}

