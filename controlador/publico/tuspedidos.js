// Declaración de constantes para el modal, el título del modal y el formulario de comentario.
const DATA_MODAL = new bootstrap.Modal('#dataModal'),
    MODAL_TITLE = document.getElementById('modalTitle'),
    COMMENT_FORM = document.getElementById('comentarioForm'),
    TEXT_CANTIDAD = document.getElementById('pedidosHechos'),
    STAR = document.getElementsByClassName('star'),
    STARS = document.querySelectorAll('.star a');

const TABLE_BODY = document.getElementById('contenedorDePedidos');

const CARRITO_API = 'services/publica/pedidos.php';


// Evento que se dispara cuando el documento HTML ha cargado completamente
document.addEventListener('DOMContentLoaded', async () => {
    // Llama a una función para cargar el encabezado y el pie de página del documento
    loadTemplate();

    // Asigna un evento de clic a cada estrella para agregar la clase 'active' a las estrellas seleccionadas
    STARS.forEach((item, index1) => {
        item.addEventListener('click', () => {
            STARS.forEach((STAR, index2) => { 
                index1 >= index2 ? STAR.classList.add('active') : STAR.classList.remove('active');
            });
        });
    });

    await fillPedidos();
    inicializarAccordion();
});

// Definición de la función asíncrona para abrir los detalles en el modal.
const openDetails = async () => {
    // Muestra el modal y resetea el formulario de comentario.
    DATA_MODAL.show();
    COMMENT_FORM.reset();
}

// Definición de la función asíncrona para cancelar y cerrar el modal.
const botonCancelar = async () => {
    // Muestra una confirmación y, si el usuario confirma, oculta el modal.
    const RESPONSE = await confirmAction('¿Seguro qué quieres regresar?', 'Se cerrará la ventana emergente');
    if (RESPONSE.isConfirmed) {
        DATA_MODAL.hide();
    }
}

// Definición de la función asíncrona para agregar y cerrar el modal.
const botonAgregar = async () => {
    // Muestra una alerta de éxito y oculta el modal.
    await sweetAlert(1, 'Se ha agregado correctamente', true);
    DATA_MODAL.hide();
}

const fillPedidos = async () => {
    // Se inicializa el contenido de la tabla.
    TABLE_BODY.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CARRITO_API, 'readAllOrdersOfClients');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(async (row) => {
            CONTENEDOR_PEDIDOS.innerHTML += `
            <div id="cardsDeZapato" class="col-lg-12">
                <div class="accordion mt-3 mb-4" id="detalleInformacionPedido${row.id_pedido_cliente}">
                    <div class="accordion-item">
                        <!--HEADER del accordion-->
                        <div id="detalleInformacionHeaderRepatidor" class="accordion-header"
                            data-bs-parent="#detalleInformacionPedido">
                            <!--Etiqueta del pedido-->
                            <div class="col-lg-3">
                                <p id="idPedidoNum2"
                                    class="rounded-top text-center pt-2 pb-2 titillium-web-bold color-5blue">
                                    Pedido N# 4322
                                </p>
                            </div>
                            <!--Contenedor del cuerpo-->
                            <div id="contenedorDelAcordionSoloHeaderAndBody2">
                                <div class="col-lg-12 container mt-3 d-flex flex-wrap m-3 justify-content-center align-items-center"
                                    id="header">
                                    <!--Contenedor de la etiqueta del pedido-->
                                    ${row.estado_pedido === 'Pendiente' ? `
                                    <!--Contenedor de la etiqueta del pedido-->
                                    <div class="offset-lg-9 col-lg-3 bg-danger pt-1 mb-3 rounded skew-div" id="colorDelEstadoDelPedido${row.id_pedido_cliente}">
                                        <h6 class="text-white skew-text text-center" id="nombreDelEstadoDelPedido">${row.estado_pedido}</h6>
                                    </div>
                                    ` : row.estado_pedido === 'En camino' ? `
                                    <!--Contenedor de la etiqueta del pedido-->
                                    <div class="offset-lg-9 col-lg-3 bg-warning pt-1 mb-3 rounded skew-div" id="colorDelEstadoDelPedido${row.id_pedido_cliente}">
                                        <h6 class="text-white skew-text text-center" id="nombreDelEstadoDelPedido">${row.estado_pedido}</h6>
                                    </div>
                                    ` : `
                                    <!--Contenedor de la etiqueta del pedido-->
                                    <div class="offset-lg-9 col-lg-3 bg-success pt-1 mb-3 rounded skew-div" id="colorDelEstadoDelPedido${row.id_pedido_cliente}">
                                        <h6 class="text-white skew-text text-center" id="nombreDelEstadoDelPedido">${row.estado_pedido}</h6>
                                    </div>
                                    `}
                                    <div class="infoDeRepartidor d-none container col-lg-12 d-flex justify-content-center mt-4 mb-2"
                                        id="infoDeRepartidor${row.id_pedido_cliente}">
                                        <div
                                            class="col-lg-3 img1 d-flex justify-content-center align-items-center">
                                            <img src="../../recursos/imagenes/icons/iconodeusuarioblancoyfondoazul.svg"
                                                alt="Icono de usuario">
                                        </div>
                                        <div class="col-lg-4">
                                            <h6 class="titillium-web" id="idRepartidor">
                                                <b>ID del repartidor:</b> ${row.id_trabajador}
                                            </h6>
                                            <h6 class="titillium-web" id="nombreRepartidor">
                                                <b>Nombre del repartidor:</b> ${row.nombre_repartidor}
                                            </h6>
                                            <h6 class="titillium-web" id="correoRepartidor">
                                                <b>Correo del repartidor:</b> ${row.correo_trabajador}
                                            </h6>
                                            <h6 class="titillium-web" id="telefonoRepartidor">
                                                <b>Teléfono del repartidor:</b> ${row.telefono_trabajador}
                                            </h6>
                                            <h6 class="titillium-web" id="fechaInicio">
                                                <b>Fecha de inicio del pedido:</b> ${row.fecha_de_inicio}
                                            </h6>
                                            <h6 class="titillium-web" id="fechaFin">
                                                <b>Fecha de entrega:</b> ${row.fecha_de_entrega}
                                            </h6>
                                        </div>
                                    </div>
                                    <!-- Detalles del Más Pedido (Body) del acordion-->
                                    <div id="collapseOnePedido${row.id_pedido_cliente}"
                                        class="accordion-collapse collapse show col-lg-12">
                                        <div class="accordion-body" id="detallesDeMasPedidoRepartidor">
                                            <div class="col-lg-12">
                                                <div
                                                    class="container d-flex align-items-center justify-content-center" 
                                                    id="contenedorCardsZaptos${row.id_pedido_cliente}">
                                                    
                                                </div>
                                            </div>
                                            <div class="col-lg-12" id="containerTotales">
                                                <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                    id="totalPediod">Total del pedido: $${row.precio_total}</h6>
                                                <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                    id="envio">Envío: $${row.costo_de_envio}</h6>
                                                <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                    id="totalCobrar">Total a cobrar: $${row.total_cobrar}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Botón (Footer) -->
                            <div class="offset-lg-9 col-lg-3">
                                <button id="accordionButtonPrecioTotal${row.id_pedido_cliente}"
                                    class="accordion-button rounded-bottom rounded-top-0" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseOnePedido${row.id_pedido_cliente}"
                                    aria-expanded="true" aria-controls="collapseOnePedido${row.id_pedido_cliente}">
                                    Total del pedido: $1,440
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            const FORM_ID = new FormData();
            FORM_ID.append('idPedido', row.id_pedido_cliente);
            const DATA2 = await fetchData(CARRITO_API, 'ReadAllShoesOfOneOrder', FORM_ID);
            if (DATA2.status) {
                const contenedorTarjetas = document.getElementById(`contenedorCardsZaptos${row.id_pedido_cliente}`);
                contenedorTarjetas.innerHTML = '';
                DATA2.dataset.forEach((row2) => {
                    contenedorTarjetas.innerHTML += `
                    <div class="containerCards col-lg-3 d-flex flex-wrap m-3">
                        <div class="containerCard col-lg-12 flex-wrap" id="cardPedido">
                            <div class="card">
                                <!--Contenedor de la imagen-->
                                <img src="${SERVER_URL}helpers/images/zapatos/${row2.foto_detalle_zapato}" class="card-img-top img-fluid" alt="${row2.nombre_zapato}">
                                <!--Contenedor del cuerpo de la card-->
                                <div class="card-body">
                                    <!--Contenedor de nombre zapato-->
                                    <div class="ContenedorNombreZapato col-lg-12">
                                        <h4 class="titillium-web-semibold text-center" id="nombreZapato">${row2.nombre_zapato}</h4>
                                    </div>
                                    <!--Contenedor del color y talla-->
                                    <div class="ContenedorColorTalla col-lg-12 d-flex">
                                        <div class="col-lg-6 d-flex mt-3 justify-content-center align-items-center" id="contenedorColor">
                                            <h6 class="titillium-web-extralight me-1">Color: ${row2.nombre_color}</h6>
                                        </div>
                                        <div class="col-lg-6 d-flex mt-3 justify-content-center align-items-center" id="contenedorTalla">
                                            <h6 class="titillium-web-extralight me-1">Talla</h6>
                                            <div id="talla">
                                                <h6 id="tallaPedido">${row2.num_talla}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Contenedor de la cantidad-->
                                    <div class="contenedorCantidad col-lg-12 justify-content-center align-items-center mt-2">
                                        <h6 class="titillium-web-extralight text-center" id="cantidadPedido">Cantidad: ${row2.cantidad_pedido}</h6>
                                    </div>
                                </div>
                                <!--Contenedor del footer-->
                                <div class="card-footer bg-color-4blue">
                                    <!--Contenedor del precio-->
                                    <div class="d-flex contenedorPrecios col-lg-12">
                                        <div class="col-lg-6 d-flex justify-content-start">
                                            <h6 class="titillium-web-bold text-white" id="precioZapato">$${row2.precio_unitario_zapato}</h6>
                                        </div>
                                        <div class="col-lg-6 d-flex justify-content-end">
                                            <h6 class="titillium-web-extralight text-white" id="cantidadTotal">Total: $${row2.precio_total}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                });
            } else {
                await sweetAlert(2, DATA2.error, true);
            }
    
        });
        
        if (DATA.dataset == 0) {
            await sweetAlert(1, DATA.message, true);
        }

    } else {
        sweetAlert(4, DATA.error, true);
    }
}


const inicializarAccordion = async (form = null) => {
    let action = 'readAllOrdersOfClients';

    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CARRITO_API, action, form);

    // Objeto para almacenar botones de acordeón y detalles correspondientes
    const accordionButtons = {};
    const infoRepartidors = {};
    const etiqueta = {};
    const isExpandeds = {};

    if (DATA.status) {

        DATA.dataset.forEach(row => {
            // Selecciona el botón de accordion correspondiente a este 'row'
            const accordionButton = document.getElementById(`accordionButtonPrecioTotal${row.id_pedido_cliente}`);
            accordionButtons[row.id_pedido_cliente] = accordionButton;
            // Selecciona el contenedor de detalles correspondiente a este 'row'
            const detallesDeMasPedido = document.getElementById(`infoDeRepartidor${row.id_pedido_cliente}`);
            infoRepartidors[row.id_pedido_cliente] = detallesDeMasPedido;
            // Selecciona la etiqueta del estado del pedido
            const etiquetaDelEstado = document.getElementById(`colorDelEstadoDelPedido${row.id_pedido_cliente}`);
            etiqueta[row.id_pedido_cliente] = etiquetaDelEstado;


            // Agrega un evento click al botón del accordion
            accordionButtons[row.id_pedido_cliente].addEventListener('click', function () {

                const isExpanded = accordionButtons[row.id_pedido_cliente].getAttribute('aria-expanded') === 'true';

                // Inicializa el estado del acordeón como contraído
                isExpandeds[row.id_pedido_cliente] = isExpanded;

                // Cambia el estado del acordeón
                isExpandeds[row.id_pedido_cliente] = !isExpandeds[row.id_pedido_cliente];

                // Cambia el texto del botón según si está expandiendo o contrayendo
                if (isExpandeds[row.id_pedido_cliente]) {
                    infoRepartidors[row.id_pedido_cliente].classList.add('d-none');
                    etiqueta[row.id_pedido_cliente].classList.add('d-none');
                } else {
                    infoRepartidors[row.id_pedido_cliente].classList.remove('d-none');
                    etiqueta[row.id_pedido_cliente].classList.remove('d-none');
                }

            });

            accordionButtons[row.id_pedido_cliente].click();
        });
    }
}