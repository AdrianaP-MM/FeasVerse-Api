// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
});

function AddCarrito() {
    Swal.fire({
        title: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        html: `
        <div class="lineaIzq bg-color-1blue"></div>
        <div class="contenedorImg">
            <img src="/recursos/imagenes/pngHombreFeliz.svg" class="imgHombre">
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
function closeSweet() {
    Swal.close();
}
function gotoCar() {
    location.href = "/vistas/publico/carrito.html";
}

