// Declaraciones de constantes para los elementos del DOM
const DIV_CARRITO = document.getElementById('carritoDeCompras');
const DIV_METODO_COMPRA = document.getElementById('compraDatos');

// Evento que se dispara cuando el documento HTML ha cargado completamente
document.addEventListener('DOMContentLoaded', async () => {
    // Llama a una función para cargar el encabezado y el pie de página del documento
    loadTemplate();
    
    // Visualización inicial del contenido: muestra el carrito de compras y oculta los detalles de compra
    DIV_CARRITO.classList.remove('d-none');
    DIV_METODO_COMPRA.classList.add('d-none');
});

// Función para cambiar la visualización al realizar una compra
function botonComprar() {
    // Oculta el carrito de compras y muestra los detalles de compra
    DIV_CARRITO.classList.add('d-none');
    DIV_METODO_COMPRA.classList.remove('d-none');
}

// Función para regresar al carrito de compras desde los detalles de compra
function regresar() {
    // Muestra el carrito de compras y oculta los detalles de compra
    DIV_CARRITO.classList.remove('d-none');
    DIV_METODO_COMPRA.classList.add('d-none');
}

// Función para mostrar una notificación de éxito después de realizar el pago
function paga() {
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
                ¡Compra con éxito, espéralo!
            </h2>
            <p class="m-0 p-0 titillium-web-regular clgr2 mb-4 text15 mt-2">
                Tu orden está en camino. Espera con ansias para utilizar los zapatos que te hacen sentir cómodo. 
            </p>

            <button type="button" id="seguirExplorando" onclick="closeSweet()"
                class="btn btn-primary bg-color-5blue col-12 mb-2 mt-2">
                <h6 class="titillium-web-extralight m-0 p-0 py-1">
                    Seguir explorando
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
