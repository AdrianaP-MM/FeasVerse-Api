// Evento que se dispara cuando el documento HTML ha cargado completamente
document.addEventListener('DOMContentLoaded', async () => {
    // Llama a una función para cargar el encabezado y el pie de página del documento
    loadTemplate();
});

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
    location.href = "/vistas/publico/carrito.html";
}
