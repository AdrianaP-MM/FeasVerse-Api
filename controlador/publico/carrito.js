// Declaraciones de constantes para los elementos del DOM
const DIV_CARRITO = document.getElementById('carritoDeCompras');
const DIV_METODO_COMPRA = document.getElementById('compraDatos');
const TEXT_CANTIDAD_ZAPATO = document.getElementById('cantidadZapato');
const TEXT_PRECIO_TOTAL = document.getElementById('totalPedido');


const TABLE_BODY = document.getElementById('tableBody');

const CARRITO_API = 'services/publica/carrito.php';

// Evento que se dispara cuando el documento HTML ha cargado completamente
document.addEventListener('DOMContentLoaded', async () => {
    // Llama a una función para cargar el encabezado y el pie de página del documento
    loadTemplate();
    // Visualización inicial del contenido: muestra el carrito de compras y oculta los detalles de compra
    DIV_CARRITO.classList.remove('d-none');
    DIV_METODO_COMPRA.classList.add('d-none');
    fillTable();
});


const fillTable = async () => {
    // Se inicializa el contenido de la tabla.
    TABLE_BODY.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CARRITO_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        let total = 0;
        let cant = 0;
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
            <tr class="table-row">
                <td>
                    <img src="${SERVER_URL}helpers/images/zapatos/${row.foto_detalle_zapato}" alt="Foto zapato"
                        height="50">
                </td>
                <td>${row.nombre_zapato}</td>
                <td>${row.num_talla}</td>
                <td>${row.nombre_color}</td>
                <td>${row.precio_unitario_zapato}</td>
                <td>${row.cantidad_pedido}</td>
                <td>${row.precio_total}</td>
                <td>
                    <button onclick="actualizar(${row.id_detalles_pedido})">
                        <img src="../../recursos/imagenes/icons/notebook.svg"
                            alt="Icono de actualizar" class="imgBasura">
                    </button>
                </td>
                <td>
                    <button onclick="eliminar(${row.id_detalles_pedido})">
                        <img src="../../recursos/imagenes/basura.svg" alt="Icono de basura"
                            class="imgBasura">
                    </button>
                </td>
            </tr>
            `;
            total += parseFloat(row.precio_total);
            cant += 1;
        });

        TEXT_PRECIO_TOTAL.innerHTML = `<b>Total:</b> $${total}`;
        TEXT_CANTIDAD_ZAPATO.innerHTML = `Tienes ${cant} zapatos en tu carrito`;

        // Se muestra un mensaje de acuerdo con el resultado.
        if (DATA.dataset == 0) {
            await sweetAlert(1, DATA.message, true);
        }
    } else {
        const FORM1 = new FormData();
        FORM1.append('idRepartidor', '');
        FORM1.append('estado_pedido', 4);
        FORM1.append('precio_total', '');
        FORM1.append('fecha_de_inicio', '');
        FORM1.append('fecha_de_entrega', '');
        FORM1.append('id_costo_de_envio_por_departamento', '');

        const DATA2 = await fetchData(CARRITO_API, 'createRow', FORM1);

        if (DATA2.status) {
            sweetAlert(4, DATA.error, true);
            TEXT_PRECIO_TOTAL.innerHTML = `<b>Total:</b> $${0}`;
        } else {
            sweetAlert(4, 'Inicia sesión para visualizar los productos del carrito', true);
            TEXT_PRECIO_TOTAL.innerHTML = `<b>Total:</b> $${0}`;
            TEXT_CANTIDAD_ZAPATO.innerHTML = `Debes de inciar sesión para visualizar los productos del carrito`;

        }
    }
}

const actualizar = async (id) => {

}

const comprar = async () => {
    // 1. Obtener la fecha actual
    const today = new Date();

    // 2. Formatear la fecha en 'YYYY-MM-DD'
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0, por eso se suma 1
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // 3. Crear el objeto FormData y agregar la fecha
    const FORM1 = new FormData();
    FORM1.append('fecha_de_inicio', formattedDate);
}

const eliminar = async (id) => {

}

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
