//DECLARACIONES
const DIV_CARRITO = document.getElementById('carritoDeCompras');
const DIV_METODO_COMPRA = document.getElementById('compraDatos');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    //VISUALIZAR CONTENIDO
    DIV_CARRITO.classList.remove('d-none');
    DIV_METODO_COMPRA.classList.add('d-none');
});

// Función visualizar.
function botonComprar() {
    DIV_CARRITO.classList.add('d-none');
    DIV_METODO_COMPRA.classList.remove('d-none');
}

// Función visualizar.
function regresar() {
    DIV_CARRITO.classList.remove('d-none');
    DIV_METODO_COMPRA.classList.add('d-none');
}


function paga() {
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
                ¡Compra con exito, esperalo!
            </h2>
            <p class="m-0 p-0 titillium-web-regular clgr2 mb-4 text15 mt-2">
                Tú orden va en camino, espéralo con ansias para utilizar los zapatos que te hacen sentir cómodos. 
            </p>

            <button type="button" id="seguirExplorando" onclick="closeSweet()"
                class="btn btn-primary bg-color-5blue col-12 mb-2 mt-2">
                <h6 class="titillium-web-extralight m-0 p-0 py-1">
                    Seguir Explorando
                </h6>
            </button>
        </div>
    `,
    });
}
function closeSweet() {
    Swal.close();
}