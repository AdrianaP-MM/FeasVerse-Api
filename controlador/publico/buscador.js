// Seleccionar todos los inputs dentro de elementos con clase "RANGE-input"
const RANGE_INPUT = document.querySelectorAll(".RANGE-input input");

// Seleccionar todos los inputs dentro de elementos con clase "price-input"
const PRICE_INPUT = document.querySelectorAll(".price-input input");

// Seleccionar el elemento con clase "slider" y dentro de él el elemento con clase "progress"
const RANGE = document.querySelector(".slider .progress");

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
        clearIcon.style.display = 'block';
    } else {
        searchIcon.style.display = 'block';
        clearIcon.style.display = 'none';
    }
});

// Función para limpiar el input y ocultar el icono de limpiar
function clearSearch() {
    var input = document.getElementById('buscadorInputZapatos');
    var searchIcon = document.querySelector('.search-icon');
    var clearIcon = document.querySelector('.clear-icon');

    input.value = '';
    input.focus();

    searchIcon.style.display = 'block';
    clearIcon.style.display = 'none';
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
                RANGE_INPUT[0].value = minPrice;
                RANGE.style.left = ((minPrice / RANGE_INPUT[0].max) * 100) + "%";
            } else {
                RANGE_INPUT[1].value = maxPrice;
                RANGE.style.right = 100 - (maxPrice / RANGE_INPUT[1].max) * 100 + "%";
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
                RANGE_INPUT[0].value = maxVal - priceGap;
            } else {
                RANGE_INPUT[1].value = minVal + priceGap;
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
