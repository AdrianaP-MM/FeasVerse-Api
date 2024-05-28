const CLIENTES_API = 'services/publica/buscador.php'; // URL de la API 

// Seleccionar todos los inputs dentro de elementos con clase "RANGE-input"
const RANGE_INPUT = document.querySelectorAll(".RANGE-input input");

// Seleccionar todos los inputs dentro de elementos con clase "price-input"
const PRICE_INPUT = document.querySelectorAll(".price-input input");

// Seleccionar el elemento con clase "slider" y dentro de él el elemento con clase "progress"
const RANGE = document.querySelector(".slider .progress");

const CARDS_ZAPATO_BODY = document.getElementById('cardsZapato'); // Cuerpo de la tabla del carrito de compras

// Definir la brecha de precio
let priceGap = 1000;


// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    // Selecciona el botón de accordion y agrega un evento click para expandir o contraer detalles.
    const ACCORDION_BUTTON_TALLAS = document.getElementById('accordionTallas');
    

    // Hace clic automáticamente en el botón del accordion para ocultar los detalles por defecto.
    ACCORDION_BUTTON_TALLAS.click();
});

// Función para mostrar/ocultar el icono de limpiar según si hay texto en el input
document.getElementById('buscadorInputZapatos').addEventListener('input', function () {
    var searchIcon = document.querySelector('.search-icon');
    var clearIcon = document.querySelector('.clear-icon');

    if (this.value.length > 0) {
        clearIcon.style.display = 'block'; // Muestra el icono de limpiar si hay texto en el input
    } else {
        searchIcon.style.display = 'block'; // Muestra el icono de búsqueda si no hay texto en el input
        clearIcon.style.display = 'none'; // Oculta el icono de limpiar si no hay texto en el input
    }
});

// Función para limpiar el input y ocultar el icono de limpiar
function clearSearch() {
    var input = document.getElementById('buscadorInputZapatos');
    var searchIcon = document.querySelector('.search-icon');
    var clearIcon = document.querySelector('.clear-icon');

    input.value = ''; // Limpia el contenido del input
    input.focus(); // Coloca el foco en el input para seguir escribiendo

    searchIcon.style.display = 'block'; // Muestra el icono de búsqueda
    clearIcon.style.display = 'none'; // Oculta el icono de limpiar
}

// Agregar un event listener a cada input de precio
PRICE_INPUT.forEach(input => {
    input.addEventListener("input", e => {
        // Obtener los valores mínimos y máximos de precio
        let minPrice = parseInt(PRICE_INPUT[0].value),
            maxPrice = parseInt(PRICE_INPUT[1].value);
        
        // Verificar si la diferencia de precio es mayor o igual a la brecha de precio y si el precio máximo está dentro del rango
        if ((maxPrice - minPrice >= priceGap) && maxPrice <= RANGE_INPUT[1].max) {
            if (e.target.className === "input-min") {
                RANGE_INPUT[0].value = minPrice; // Asigna el valor mínimo al input de rango mínimo
                RANGE.style.left = ((minPrice / RANGE_INPUT[0].max) * 100) + "%"; // Actualiza visualmente la posición del rango
            } else {
                RANGE_INPUT[1].value = maxPrice; // Asigna el valor máximo al input de rango máximo
                RANGE.style.right = 100 - (maxPrice / RANGE_INPUT[1].max) * 100 + "%"; // Actualiza visualmente la posición del rango
            }
        }
    });
});

// Agregar un event listener a cada input de rango
RANGE_INPUT.forEach(input => {
    input.addEventListener("input", e => {
        // Obtener los valores mínimo y máximo de rango
        let minVal = parseInt(RANGE_INPUT[0].value),
            maxVal = parseInt(RANGE_INPUT[1].value);
        
        // Verificar si la diferencia entre los valores de rango es menor que la brecha de precio
        if ((maxVal - minVal) < priceGap) {
            if (e.target.className === "RANGE-min") {
                RANGE_INPUT[0].value = maxVal - priceGap; // Ajusta el valor mínimo del rango
            } else {
                RANGE_INPUT[1].value = minVal + priceGap; // Ajusta el valor máximo del rango
            }
        } else {
            // Asignar los valores de rango a los inputs de precio
            PRICE_INPUT[0].value = minVal;
            PRICE_INPUT[1].value = maxVal;
            
            // Actualizar la posición del rango visualmente
            RANGE.style.left = ((minVal / RANGE_INPUT[0].max) * 100) + "%";
            RANGE.style.right = 100 - (maxVal / RANGE_INPUT[1].max) * 100 + "%";
        }
    });
});



// Función para llenar la tabla con los datos del carrito
const fillTable = async () => {
    // Se inicializa el contenido de la tabla.
    CARDS_ZAPATO_BODY.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CARRITO_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CARDS_ZAPATO_BODY.innerHTML += `
            <div class="col-lg-4 col-md-3 col-sm-6">
                <!--inicio de la card-->
                <div class="card col-lg-12 col-md-12 col-sm-12" id="cardC">
                    <a href="detalle_zapato.html" class="text15">
                        <div class="image-wrapper2 col-lg-12">
                            <img src="../../recursos/imagenes/airJordan1.svg" id="imagenZapato"
                                alt="...">
                        </div>
                        <div class="lineImgC"></div>
                        <div class="card-body">
                            <div class="d-flex flex-column col-lg-12 col-md-12 col-sm-12">
                                <div class="d-flex col-lg-12 col-md-12 col-sm-12">
                                    <div class="d-flex flex-column col-lg-8 col-md-8 col-sm-8">
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <h1 class="col-lg-12 col-md-12 col-sm-12 titillium-web-bold text18 text-black mb-0"
                                                id="nombre">
                                                Air Jordan 3
                                            </h1>
                                            <p class="col-lg-12 col-md-12 col-sm-12 titillium-web-extralight text12 clgr3 mt-0"
                                                id="categoria">
                                                Zapato UNISEX
                                            </p>
                                        </div>
                                    </div>
                                    <div class="d-flex col-lg-4 col-md-4 col-sm-4">
                                        <div
                                            class="d-flex col-lg-12 col-md-12 col-sm-12 justify-content-end">
                                            <p class="col-lg-11 titillium-web-extralight text12 clgr3"
                                                id="colores">
                                                5 colores</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex col-lg-12 col-md-12 col-sm-12">
                                    <div
                                        class="col-lg-6 col-md-6 col-sm-6 d-flex flex-row align-items-center">
                                        <img src="../../recursos/imagenes/icons/starFill.svg"
                                            alt="">
                                        <p class="titillium-web-bold text12 m-0 align-baselin clYellowStar mt-1"
                                            id="calificacionZapato">
                                            5</p>
                                    </div>
                                    <div
                                        class="d-flex col-lg-6 col-md-6 col-sm-6 justify-content-end align-items-center">
                                        <h1 class="titillium-web-bold text15 text-black d-flex align-items-center mt-1"
                                            id="precioZapato"> $285</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            `;
        });
    } else {
    
    }
}