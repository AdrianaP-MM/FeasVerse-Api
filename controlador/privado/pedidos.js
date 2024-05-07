// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Pedidos';

// Constante para uso
const PEDIDOS_DIV = document.getElementById('pedidos');
const REPARTIDOR_DIV = document.getElementById('repartidor');;
//CONSTANTE PARA TIPOS DE CATEGORIA PARA EL RESULTADO
const CARDS_NUEVOS_PEDIDOS = document.getElementById('cardsDeNuevosPedidos');
const CARDS_PEDIDO_PROGRESO = document.getElementById('cardsDePedidosProgreso');
const CARDS_PEDIDO_ENTREGADO = document.getElementById('cardsDePedidosEntregado');
const DIV_PEDIDO_ENTREGADO = document.getElementById('divPedidosEntregados'),
    DIV_PEDIDO_PROGRESO = document.getElementById('divPedidosProgreso'),
    DIV_PEDIDO_PENDIENTE = document.getElementById('divPedidosPendientes');

const CONTENEDOR_PEDIDOS = document.getElementById('contenedorDeLasCardsDePedido'),
    CONTENEDOR_REPARTIDOR = document.getElementById('contenedorDeLasCardsDeRepatidor');

const PEDIDOS_API = 'services/privada/pedidos.php';

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    // Selecciona la primera pestaña y muestra el div de tabla o repartidor según la pestaña seleccionada.
    var primeraPestana = document.querySelector('#pedidos-tab');
    if (primeraPestana) {
        primeraPestana.click();
        PEDIDOS_DIV.classList.remove('d-none');
        REPARTIDOR_DIV.classList.add('d-none');
    }



    //Cambio del texto para la info del accordion
    const accordionButtonRepartidorPedido = document.getElementById('accordionButtonRepartidorPedido');
    accordionButtonRepartidorPedido.addEventListener('click', function () {

        const isExpanded = accordionButtonRepartidorPedido.getAttribute('aria-expanded') === 'true';
        // Cambia la visibilidad del contenedor de detalles según si está expandiendo o contrayendo
        const infoDelClienteParaRepartidor = document.getElementById('infoDelClienteParaRepartidor');
        if (isExpanded) {
            infoDelClienteParaRepartidor.classList.remove('d-none');
        } else {
            infoDelClienteParaRepartidor.classList.add('d-none');
        }

        //Cambio del texto del boton 
        accordionButtonRepartidorPedido.textContent = isExpanded ? 'Ver menos información' : 'Ver más información';
    })

    const accordionButtonRepartidorPedido2 = document.getElementById('accordionButtonRepartidorPedido2');
    accordionButtonRepartidorPedido2.addEventListener('click', function () {

        const isExpanded = accordionButtonRepartidorPedido2.getAttribute('aria-expanded') === 'true';
        // Cambia la visibilidad del contenedor de detalles según si está expandiendo o contrayendo
        const infoDelClienteParaRepartidor2 = document.getElementById('infoDelClienteParaRepartidor2');
        if (isExpanded) {
            infoDelClienteParaRepartidor2.classList.remove('d-none');
        } else {
            infoDelClienteParaRepartidor2.classList.add('d-none');
        }

        //Cambio del texto del boton 
        accordionButtonRepartidorPedido2.textContent = isExpanded ? 'Ver menos información' : 'Ver más información';
    })

    const accordionButtonRepartidorPedido3 = document.getElementById('accordionButtonRepartidorPedido3');
    accordionButtonRepartidorPedido3.addEventListener('click', function () {

        const isExpanded = accordionButtonRepartidorPedido3.getAttribute('aria-expanded') === 'true';
        // Cambia la visibilidad del contenedor de detalles según si está expandiendo o contrayendo
        const infoDelClienteParaRepartidor3 = document.getElementById('infoDelClienteParaRepartidor3');
        if (isExpanded) {
            infoDelClienteParaRepartidor3.classList.remove('d-none');
        } else {
            infoDelClienteParaRepartidor3.classList.add('d-none');
        }

        //Cambio del texto del boton 
        accordionButtonRepartidorPedido3.textContent = isExpanded ? 'Ver menos información' : 'Ver más información';
    })

    //Cambio del texto para la info del accordion
    const accordionButtonRepartidor = document.getElementById('accordionButtonRepartidor');
    accordionButtonRepartidor.addEventListener('click', function () {
        const isExpanded = accordionButtonRepartidor.getAttribute('aria-expanded') === 'true';
        //Cambio del texto del boton 
        accordionButtonRepartidor.textContent = isExpanded ? 'Ver menos información' : 'Ver más información';
    })

    accordionButtonRepartidorPedido.click();
    accordionButtonRepartidorPedido2.click();
    accordionButtonRepartidorPedido3.click();
    accordionButtonRepartidor.click();

    // Objeto para almacenar botones de acordeón y detalles correspondientes
    const accordionButtons = {};
    const infoRepartidors = {};
    const isExpandeds = {};

    const DATA = await fetchData(PEDIDOS_API, 'readAllOrders');
    if (DATA.status) {

        DATA.dataset.forEach(row => {
            // Selecciona el botón de accordion correspondiente a este 'row'
            const accordionButton = document.getElementById(`accordionButton${row.id_pedido_cliente}`);
            accordionButtons[row.id_pedido_cliente] = accordionButton;
            // Selecciona el contenedor de detalles correspondiente a este 'row'
            const detallesDeMasPedido = document.getElementById(`infoDeRepartidor${row.id_pedido_cliente}`);
            infoRepartidors[row.id_pedido_cliente] = detallesDeMasPedido;

            // Agrega un evento click al botón del accordion
            accordionButtons[row.id_pedido_cliente].addEventListener('click', function () {

                const isExpanded = accordionButtons[row.id_pedido_cliente].getAttribute('aria-expanded') === 'true';

                // Inicializa el estado del acordeón como contraído
                isExpandeds[row.id_pedido_cliente] = isExpanded;

                // Cambia el estado del acordeón
                isExpandeds[row.id_pedido_cliente] = !isExpandeds[row.id_pedido_cliente];

                // Cambia el texto del botón según si está expandiendo o contrayendo
                if (isExpandeds[row.id_pedido_cliente]) {
                    accordionButtons[row.id_pedido_cliente].textContent = 'Ver más información';
                    infoRepartidors[row.id_pedido_cliente].classList.add('d-none');
                } else {
                    accordionButtons[row.id_pedido_cliente].textContent = 'Ver menos información';
                    infoRepartidors[row.id_pedido_cliente].classList.remove('d-none');
                }

            });

            accordionButtons[row.id_pedido_cliente].click();
        });
    }
    else {
        await sweetAlert(2, DATA.error, true);
    }
});

function regresar() {
    CARDS_NUEVOS_PEDIDOS.classList.add('d-none');
    CARDS_PEDIDO_PROGRESO.classList.add('d-none');
    CARDS_PEDIDO_ENTREGADO.classList.add('d-none');
    DIV_PEDIDO_PENDIENTE.style.backgroundColor = '#1591CC';
    DIV_PEDIDO_PROGRESO.style.backgroundColor = '#1591CC';
    DIV_PEDIDO_ENTREGADO.style.backgroundColor = '#1591CC';
}

//FUNCION PARA mostrar los nuevos pedidos del repartidor  
function mostrarNuevosPedidos() {
    // Obtener el color actual del DIV_PEDIDO_PENDIENTE
    var colorActual = window.getComputedStyle(DIV_PEDIDO_PENDIENTE).backgroundColor;

    // Verificar el color actual y ejecutar la lógica correspondiente
    if (colorActual === 'rgb(20, 106, 147)') { // Color '#146A93' en formato RGB
        CARDS_NUEVOS_PEDIDOS.classList.add('d-none');
        CARDS_PEDIDO_PROGRESO.classList.add('d-none');
        CARDS_PEDIDO_ENTREGADO.classList.add('d-none');
        DIV_PEDIDO_PENDIENTE.style.backgroundColor = '#1591CC';
        DIV_PEDIDO_PROGRESO.style.backgroundColor = '#1591CC';
        DIV_PEDIDO_ENTREGADO.style.backgroundColor = '#1591CC';
    } else {
        // si el color no es el esperado
        CARDS_NUEVOS_PEDIDOS.classList.remove('d-none');
        CARDS_PEDIDO_PROGRESO.classList.add('d-none');
        CARDS_PEDIDO_ENTREGADO.classList.add('d-none');

        DIV_PEDIDO_PENDIENTE.style.backgroundColor = '#146A93';
        DIV_PEDIDO_PROGRESO.style.backgroundColor = '#1591CC';
        DIV_PEDIDO_ENTREGADO.style.backgroundColor = '#1591CC';
    }
}

function mostrarPedidosProgreso() {
    // Obtener el color actual del DIV_PEDIDO_PENDIENTE
    var colorActual = window.getComputedStyle(DIV_PEDIDO_PROGRESO).backgroundColor;

    // Verificar el color actual y ejecutar la lógica correspondiente
    if (colorActual === 'rgb(20, 106, 147)') { // Color '#146A93' en formato RGB
        CARDS_NUEVOS_PEDIDOS.classList.add('d-none');
        CARDS_PEDIDO_PROGRESO.classList.add('d-none');
        CARDS_PEDIDO_ENTREGADO.classList.add('d-none');
        DIV_PEDIDO_PENDIENTE.style.backgroundColor = '#1591CC';
        DIV_PEDIDO_PROGRESO.style.backgroundColor = '#1591CC';
        DIV_PEDIDO_ENTREGADO.style.backgroundColor = '#1591CC';
    } else {
        // si el color no es el esperado
        CARDS_PEDIDO_PROGRESO.classList.remove('d-none');
        CARDS_NUEVOS_PEDIDOS.classList.add('d-none');

        CARDS_PEDIDO_ENTREGADO.classList.add('d-none');
        DIV_PEDIDO_PROGRESO.style.backgroundColor = '#146A93';
        DIV_PEDIDO_PENDIENTE.style.backgroundColor = '#1591CC';
        DIV_PEDIDO_ENTREGADO.style.backgroundColor = '#1591CC';
    }
}

function mostrarPedidosEntregados() {
    // Obtener el color actual del DIV_PEDIDO_PENDIENTE
    var colorActual = window.getComputedStyle(DIV_PEDIDO_ENTREGADO).backgroundColor;

    // Verificar el color actual y ejecutar la lógica correspondiente
    if (colorActual === 'rgb(20, 106, 147)') { // Color '#146A93' en formato RGB
        CARDS_NUEVOS_PEDIDOS.classList.add('d-none');
        CARDS_PEDIDO_PROGRESO.classList.add('d-none');
        CARDS_PEDIDO_ENTREGADO.classList.add('d-none');
        DIV_PEDIDO_PENDIENTE.style.backgroundColor = '#1591CC';
        DIV_PEDIDO_PROGRESO.style.backgroundColor = '#1591CC';
        DIV_PEDIDO_ENTREGADO.style.backgroundColor = '#1591CC';
    } else {
        // si el color no es el esperado
        CARDS_PEDIDO_PROGRESO.classList.add('d-none');
        CARDS_NUEVOS_PEDIDOS.classList.add('d-none');
        CARDS_PEDIDO_ENTREGADO.classList.remove('d-none');

        DIV_PEDIDO_ENTREGADO.style.backgroundColor = '#146A93';
        DIV_PEDIDO_PENDIENTE.style.backgroundColor = '#1591CC';
        DIV_PEDIDO_PROGRESO.style.backgroundColor = '#1591CC';
    }
}

// Funciones para mostrar el espacio de repartidor o el espacio de pedidos y cambiar colores de botones.
function ShowRepartidor(boton) {
    REPARTIDOR_DIV.classList.remove('d-none');
    PEDIDOS_DIV.classList.add('d-none');

    // Restablece el color de todos los botones
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
    });

    // Cambia el color del botón clicado
    boton.style.backgroundColor = '#1A89BD';
    boton.style.color = 'white';
}

// Definición de la función llamada 'ShowPedidos'.
const ShowPedidos = async (boton) => {
    // Muestra el div de pedidos y oculta el div de repartidores.
    PEDIDOS_DIV.classList.remove('d-none');
    REPARTIDOR_DIV.classList.add('d-none');

    // Restablece el color de todos los botones.
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
    });

    // Cambia el color del botón clicado a un color específico.
    boton.style.backgroundColor = '#1A89BD';
    boton.style.color = 'white';
    fillTable();

    // Objeto para almacenar botones de acordeón y detalles correspondientes
    const accordionButtons = {};
    const infoRepartidors = {};
    const isExpandeds = {};

    const DATA = await fetchData(PEDIDOS_API, 'readAllOrders');
    if (DATA.status) {

        DATA.dataset.forEach(row => {
            // Selecciona el botón de accordion correspondiente a este 'row'
            const accordionButton = document.getElementById(`accordionButton${row.id_pedido_cliente}`);
            accordionButtons[row.id_pedido_cliente] = accordionButton;
            // Selecciona el contenedor de detalles correspondiente a este 'row'
            const detallesDeMasPedido = document.getElementById(`infoDeRepartidor${row.id_pedido_cliente}`);
            infoRepartidors[row.id_pedido_cliente] = detallesDeMasPedido;

            // Agrega un evento click al botón del accordion
            accordionButtons[row.id_pedido_cliente].addEventListener('click', function () {

                const isExpanded = accordionButtons[row.id_pedido_cliente].getAttribute('aria-expanded') === 'true';

                // Inicializa el estado del acordeón como contraído
                isExpandeds[row.id_pedido_cliente] = isExpanded;

                // Cambia el estado del acordeón
                isExpandeds[row.id_pedido_cliente] = !isExpandeds[row.id_pedido_cliente];

                // Cambia el texto del botón según si está expandiendo o contrayendo
                if (isExpandeds[row.id_pedido_cliente]) {
                    accordionButtons[row.id_pedido_cliente].textContent = 'Ver más información';
                    infoRepartidors[row.id_pedido_cliente].classList.add('d-none');
                } else {
                    accordionButtons[row.id_pedido_cliente].textContent = 'Ver menos información';
                    infoRepartidors[row.id_pedido_cliente].classList.remove('d-none');
                }

            });

            accordionButtons[row.id_pedido_cliente].click();
        });
    }
    else {
        await sweetAlert(2, DATA.error, true);
    }
}

// Función para mostrar/ocultar el icono de limpiar según si hay texto en el input
document.getElementById('buscadorInputPedidos').addEventListener('input', function () {
    var searchIcon = document.querySelector('.search-icon');
    var clearIcon = document.querySelector('.clear-icon');

    if (this.value.length > 0) {
        searchIcon.style.display = 'none';
        clearIcon.style.display = 'block';
    } else {
        searchIcon.style.display = 'block';
        clearIcon.style.display = 'none';
    }
});

// Función para limpiar el input y ocultar el icono de limpiar
function clearSearch() {
    var input = document.getElementById('buscadorInputPedidos');
    var searchIcon = document.querySelector('.search-icon');
    var clearIcon = document.querySelector('.clear-icon');

    input.value = '';
    input.focus();

    searchIcon.style.display = 'block';
    clearIcon.style.display = 'none';
}

//Función asicronicaa de cambio de estado
const cambioDeEstado = async (id_pedido_cliente, estado) => {
    
    const FORM2 = new FormData();
    FORM2.append('idPedido', id_pedido_cliente);
    if(estado.trim() === 'Pendiente'){
        FORM2.append('estado', 1);  
    }
    else if(estado.trim() === 'En camino'){
        FORM2.append('estado', 2);
    }
    else if(estado.trim() === 'Entregado'){
        FORM2.append('estado', 3);  
    }
    console.log(estado);
    // Petición para obtener los registros disponibles.
    const DATA3 = await fetchData(PEDIDOS_API, 'updateStatus', FORM2);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA3.status) {
        console.log(DATA3)
        await sweetAlert(1, DATA3.message, true);
        fillTable();
    }
    else {
        await sweetAlert(2, DATA3.error, true);
    }
}

const fillTable = async (form = null) => {
    CONTENEDOR_PEDIDOS.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PEDIDOS_API, 'readAllOrders');

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(async (row) => {
            var estado = row.estado_pedido;
            CONTENEDOR_PEDIDOS.innerHTML += `
            <div class="accordion mt-3 mb-4" id="detalleInformacion">
                <div class="accordion-item">
                    <!--HEADER del accordion-->
                    <div id="detalleInformacionHeader" class="accordion-header" data-bs-parent="#detalleInformacion">
                        <!--Etiqueta del pedido-->
                        <div class="col-lg-3">
                            <p id="idPedidoNum" class="rounded-top text-center pt-2 pb-2 titillium-web-bold color-5blue">
                                Pedido N# ${row.id_pedido_cliente}
                            </p>
                        </div>
                        <!--Contenedor del cuerpo-->
                        <div id="contenedorDelAcordionSoloHeaderAndBody">
                            <div class="col-lg-12 container mt-3 d-flex flex-wrap m-3 justify-content-center align-items-center" id="detallesDelPedido">
                                ${row.estado_pedido === 'Pendiente' ? `
                                <!--Contenedor de la etiqueta del pedido-->
                                <div class="offset-lg-9 col-lg-3 bg-danger pt-1 mb-3 rounded skew-div" id="colorDelEstadoDelPedido">
                                    <h6 class="text-white skew-text text-center" id="nombreDelEstadoDelPedido">${row.estado_pedido}</h6>
                                </div>
                                ` : row.estado_pedido === 'En camino' ? `
                                <!--Contenedor de la etiqueta del pedido-->
                                <div class="offset-lg-9 col-lg-3 bg-warning pt-1 mb-3 rounded skew-div" id="colorDelEstadoDelPedido">
                                    <h6 class="text-white skew-text text-center" id="nombreDelEstadoDelPedido">${row.estado_pedido}</h6>
                                </div>
                                ` : `
                                <!--Contenedor de la etiqueta del pedido-->
                                <div class="offset-lg-9 col-lg-3 bg-success pt-1 mb-3 rounded skew-div" id="colorDelEstadoDelPedido">
                                    <h6 class="text-white skew-text text-center" id="nombreDelEstadoDelPedido">${row.estado_pedido}</h6>
                                </div>
                                `}
                                <!--Info del repartidor y cliente-->
                                <div class="container d-none col-lg-12 d-flex justify-content-center mt-4 mb-2" id="infoDeRepartidor${row.id_pedido_cliente}">
                                    <div class="col-lg-3 img1">
                                        <img src="../../recursos/imagenes/icons/iconodeusuarioblancoyfondoazul.svg" alt="Icono de usuario">
                                    </div>
                                    <div class="col-lg-4">
                                        <h6 class="titillium-web" id="nombreRepartidor">
                                            <b>Nombre del repartidor:</b> ${row.nombre_repartidor}
                                        </h6>
                                        <h6 class="titillium-web" id="nombreCliente">
                                            <b>Nombre del cliente:</b> ${row.nombre_cliente}
                                        </h6>
                                        <h6 class="titillium-web" id="correoCliente">
                                            <b>Correo del cliente:</b> ${row.correo_cliente}
                                        </h6>
                                        <h6 class="titillium-web" id="telefonoCliente">
                                            <b>Teléfono del cliente:</b> ${row.telefono_cliente}
                                        </h6>
                                        <h6 class="titillium-web" id="direccionCliente">
                                            <b>Dirección del cliente:</b> ${row.direccion_cliente}
                                        </h6>
                                    </div>
                                </div>
                                <!--Comienzo de cards de zapato-->
                                <div id="contenedorDeTarjetas${row.id_pedido_cliente}" class="col-lg-12 d-flex flex-wrap justify-content-center mt-3">
                                    <!-- Las tarjetas de zapato se insertarán aquí -->
                                </div>
                                <!-- Detalles del Más Pedido (Body) del acordion-->
                                <div id="collapse${row.id_pedido_cliente}Pedido" 
                                class="accordion-collapse collapse show col-lg-12">
                                    <div class="accordion-body" id="detallesDeMasPedido">
                                        <div class="col-lg-12">
                                            <div class="container">
                                                <!--Contenedor de boton de entrega y precio total-->
                                                <div class="row col-lg-12">
                                                    <!--Contenedor del boton de iniciar entrega -->
                                                    <div class="col-lg-6 d-flex justify-content-center">
                                                        ${row.estado_pedido === 'Pendiente' ? `
                                                        <button type="button" class="col-lg-4 btn btn-primary shadow text18 titillium-web-regular bg-color-5blue" id="botonDePedido" onclick="cambioDeEstado(${row.id_pedido_cliente}, '${estado}')">
                                                            Iniciar entrega
                                                        </button>
                                                        ` : row.estado_pedido === 'En camino' ? `
                                                        <button type="button" class="col-lg-4 btn btn-primary shadow text18 titillium-web-regular bg-color-5blue" id="botonDePedido" onclick="cambioDeEstado(${row.id_pedido_cliente}, '${estado}')">
                                                            Entregado
                                                        </button>
                                                        ` : `
                                                        `}
                                                    </div>
                                                    <!--Contenedor de los precios-->
                                                    <div class="col-lg-6" id="containerTotales">
                                                        <h6 class="titillium-web-extralight d-flex justify-content-end" id="totalPediod">Total del pedido: $${row.precio_total}</h6>
                                                        <h6 class="titillium-web-extralight d-flex justify-content-end" id="envio">Envío: $${row.costo_de_envio}</h6>
                                                        <h6 class="titillium-web-extralight d-flex justify-content-end" id="totalCobrar">Total a cobrar: $${row.total_cobrar}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Botón (Footer) -->
                        <div class="offset-lg-9 col-lg-3">
                            <button id="accordionButton${row.id_pedido_cliente}" 
                            class="accordion-button rounded-bottom rounded-top-0" 
                            type="button" data-bs-toggle="collapse" 
                            data-bs-target="#collapse${row.id_pedido_cliente}Pedido" 
                            aria-expanded="true" aria-controls="collapse${row.id_pedido_cliente}Pedido">
                                Ver más información
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `;

            const FORM_ID = new FormData();
            FORM_ID.append('idPedido', row.id_pedido_cliente);
            const DATA2 = await fetchData(PEDIDOS_API, 'ReadAllShoesOfOneOrder', FORM_ID);
            if (DATA2.status) {
                const contenedorTarjetas = document.getElementById(`contenedorDeTarjetas${row.id_pedido_cliente}`);
                DATA2.dataset.forEach((row2) => {
                    contenedorTarjetas.innerHTML += `
                    <div class="containerCards col-lg-3 d-flex flex-wrap m-3">
                        <div class="containerCard col-lg-12 flex-wrap" id="cardPedido">
                            <div class="card">
                                <!--Contenedor de la imagen-->
                                <img src="${SERVER_URL}images/marcas/${row2.foto_detalle_zapato}" class="card-img-top img-fluid" alt="Imagen de zapato">
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
        await sweetAlert(2, DATA.error, true);
    }
}

const fillTableRepartidors = async (form = null) =>{
    CONTENEDOR_REPARTIDOR.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PEDIDOS_API, 'readAllOrders');

    if(DATA.status){

        DATA.dataset.forEach(async (row) => {
            CONTENEDOR_REPARTIDOR.innerHTML += `
            <div class="accordion mt-3 mb-4" id="detalleInformacion${row.id_trabajador}">
                <div class="accordion-item">
                    <!--HEADER del accordion-->
                    <div id="detalleInformacionHeader" class="accordion-header"
                        data-bs-parent="#detalleInformacion">
                        <!--Contenedor del cuerpo-->
                        <div id="contenedorDelAcordionSoloHeaderAndBody">
                            <div class="col-lg-12 container mt-3 d-flex flex-wrap m-3 justify-content-center align-items-cente flex-wrap"
                                id="detallesDelRepartidor">
                                <!--Info del repartidor y cliente-->
                                <div class="container mt-4 mb-2"
                                    id="infoDeRepartidorDelApartadoDelRepartidor">
                                    <div class="col-lg-3 me-2 img1">
                                        <img src="../../recursos/imagenes/icons/iconodeusuarioblancoyfondoazul.svg"
                                            class="img-fluid" alt="Icono de usuario">
                                    </div>
                                    <div class="col-lg-4 d-flex flex-column flex-wrap">
                                        <h6 class="titillium-web"
                                            id="idRepartidorApartadoRepartidor">
                                            <b>ID del repartidor:</b> ${row.id_trabajador}
                                        </h6>
                                        <h6 class="titillium-web"
                                            id="nombreRepartidorApartadoRepartidor">
                                            <b>Nombre del repartidor:</b> ${row.nombre_trabajador} ${row.apellido_trabajador}
                                        </h6>
                                        <h6 class="titillium-web"
                                            id="correoRepartidorApartadoRepartidor">
                                            <b>Correo del repartidor:</b>
                                            ${row.correo_trabajador}
                                        </h6>
                                        <h6 class="titillium-web"
                                            id="telefonoRepartidorApartadoRepartidor">
                                            <b>Teléfono del repartidor:</b> ${row.telefono_trabajador}
                                        </h6>
                                        <h6 class="titillium-web"
                                            id="pedidosRealizadosDelRepartidor">
                                            <b>Pedidos realizados:</b> ${row.entregado}
                                        </h6>
                                    </div>
                                </div>
                                <!-- Detalles del Más Pedido (Body) del acordion-->
                                <div id="collapse${row.id_trabajador}Repartidor"
                                    class="accordion-collapse collapse show col-lg-12">
                                    <div class="accordion-body"
                                        id="detallesDeRepatidorMasPedido">
                                        <div class="col-lg-12">
                                            <div class="container">
                                                <!--Contenedor de todas las categorias del pedido-->
                                                <div id="contenedorCategoriaPedido"
                                                    class="col-lg-12 mt-5 mb-3 d-flex align-items-center">
                                                    <!--contenedor de Nuevos Pedidos-->
                                                    <div id="divPedidosPendientes"
                                                        class="bg-color-1blue rounded-2 ms-2 col-lg-3 d-flex 
                                                        flex-column justify-content-center align-items-center nuevosPedidos"
                                                        onclick="mostrarNuevosPedidos()">
                                                        <div
                                                            class="justify-content-center align-items-center">
                                                            <div class="img2">
                                                                <img src="../../recursos/imagenes/icons/notebook.svg"
                                                                    alt="Icono de libreta">
                                                            </div>
                                                            <h6
                                                                class="titillium-web-bold text-white text-center mt-2">
                                                                Nuevos Pedidos</h6>
                                                            <h6 class="titillium-web-extralight text-white mb-4 text-center"
                                                                id="cantidadNuevosPedidosRepartidor">
                                                                ${row.entregado}</h6>
                                                        </div>
                                                    </div>
                                                    <!--contenedor de Pedidos en progreso-->
                                                    <div id="divPedidosProgreso"
                                                        class="bg-color-1blue rounded-2 col-lg-3 d-flex flex-column justify-content-center align-items-center pedidosProgreso"
                                                        onclick="mostrarPedidosProgreso()">
                                                        <div
                                                            class="justify-content-center align-items-center">
                                                            <div class="img3">
                                                                <img src="../../recursos/imagenes/icons/camion.svg"
                                                                    alt="Icono de camion">
                                                            </div>
                                                            <h6
                                                                class="titillium-web-bold text-white text-center mt-2">
                                                                Pedidos en progreso</h6>
                                                            <h6 class="titillium-web-extralight text-white mb-4 text-center"
                                                                id="cantidadProgresoPedidosRepartidor">
                                                                ${row.en_proceso}</h6>
                                                        </div>
                                                    </div>
                                                    <!--contenedor de Pedidos Entregados-->
                                                    <div id="divPedidosEntregados"
                                                        class="bg-color-1blue rounded-2 col-lg-3 d-flex flex-column justify-content-center align-items-center pedidosEntregados"
                                                        onclick="mostrarPedidosEntregados()">
                                                        <div
                                                            class="justify-content-center align-items-center">
                                                            <div class="img4">
                                                                <img src="../../recursos/imagenes/icons/entregado.svg"
                                                                    alt="Icono de entregado">
                                                            </div>
                                                            <h6
                                                                class="titillium-web-bold text-white text-center mt-2">
                                                                Pedidos Entregados
                                                            </h6>
                                                            <h6 class="titillium-web-extralight text-white mb-4 text-center"
                                                                id="cantidadEntregadosPedidosRepartidor">
                                                                ${row.entregado}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--Contenedor para las card de pedidos-->
                                                <!--!NUEVOS PEDIDIOS-->
                                                <div id="cardsDeNuevosPedidos"
                                                    class="mt-4 col-lg-12 d-none d-flex flex-column">
                                                    <div
                                                        class="contenedorDeNuevosPedidosImagenTexto offset-lg-2 col-lg-8 bg-color-4blue d-flex justify-content-center align-items-center rounded-3">
                                                        <img id="imagenPedido"
                                                            src="../../recursos/imagenes/icons/notebook.svg"
                                                            class="img-fluid mt-3 mb-3 me-1 ms-1"
                                                            alt="Icono de libreta">
                                                        <h6 class="titillium-web-bold text-white me-1"
                                                            id="textoDelCabezado">
                                                            Nuevos Pedidos</h6>
                                                        <h6 class="titillium-web-extralight text-white me-1"
                                                            id="cantidadNuevosPedidosRepartidor">
                                                            1</h6>
                                                    </div>
                                                    <!--Comienzo de cards de zapatos-->
                                                    <div id="cardsDeZapato"
                                                        class="col-lg-12">
                                                        <div class="accordion mt-3 mb-4"
                                                            id="detalleInformacionRepartidor">
                                                            <div class="accordion-item">
                                                                <!--HEADER del accordion-->
                                                                <div id="detalleInformacionHeaderRepatidor"
                                                                    class="accordion-header"
                                                                    data-bs-parent="#detalleInformacionRepartidor">
                                                                    <!--Etiqueta del pedido-->
                                                                    <div class="col-lg-3">
                                                                        <p id="idPedidoNum2"
                                                                            class="rounded-top text-center pt-2 pb-2 titillium-web-bold color-5blue">
                                                                            Pedido N# 4322
                                                                        </p>
                                                                    </div>
                                                                    <!--Contenedor del cuerpo-->
                                                                    <div
                                                                        id="contenedorDelAcordionSoloHeaderAndBody2">
                                                                        <div class="col-lg-12 container mt-3 d-flex flex-wrap m-3 justify-content-center align-items-center"
                                                                            id="detallesDelPedidoRepartidor">
                                                                            <!--Contenedor de la etiqueta del pedido-->
                                                                            <div class="offset-lg-9 col-lg-3 bg-danger pt-1 mb-3 rounded skew-div"
                                                                                id="colorDelEstadoDelPedido">
                                                                                <h6 class="text-white skew-text text-center"
                                                                                    id="nombreDelEstadoDelPedido">
                                                                                    Pendiente
                                                                                </h6>
                                                                            </div>
                                                                            <!--Info del cliente-->
                                                                            <div class="container d-none col-lg-12 d-flex justify-content-center mt-4 mb-2"
                                                                                id="infoDelClienteParaRepartidor">
                                                                                <div
                                                                                    class="col-lg-3 img1">
                                                                                    <img src="../../recursos/imagenes/icons/iconodeusuarioblancoyfondoazul.svg"
                                                                                        alt="Icono de usuario">
                                                                                </div>
                                                                                <div
                                                                                    class="col-lg-4">
                                                                                    <h6 class="titillium-web"
                                                                                        id="nombreClienteRepartidor">
                                                                                        <b>Nombre
                                                                                            del
                                                                                            cliente:</b>
                                                                                        Animalito
                                                                                        Pollo
                                                                                        Campero
                                                                                        de
                                                                                        Campero
                                                                                    </h6>
                                                                                    <h6 class="titillium-web"
                                                                                        id="correoClienteRepartidor">
                                                                                        <b>Correo
                                                                                            del
                                                                                            cliente:</b>
                                                                                        PolloCampero@Pollo.com.sv
                                                                                    </h6>
                                                                                    <h6 class="titillium-web"
                                                                                        id="telefonoClienteRepartidor">
                                                                                        <b>Teléfono
                                                                                            del
                                                                                            cliente:</b>
                                                                                        6543-4354
                                                                                    </h6>
                                                                                    <h6 class="titillium-web"
                                                                                        id="direccionClienteRepartidor">
                                                                                        <b>Dirección
                                                                                            del
                                                                                            cliente:</b>
                                                                                        Pollo
                                                                                        campero
                                                                                        S.V
                                                                                    </h6>
                                                                                </div>
                                                                            </div>
                                                                            <!--Comienzo de cards de zapato-->
                                                                            <div
                                                                                class="containerCards col-lg-3 d-flex flex-wrap m-3">
                                                                                <div class="containerCard col-lg-12 flex-wrap"
                                                                                    id="cardPedido">
                                                                                    <div
                                                                                        class="card">
                                                                                        <!--Contenedor de la imagen-->
                                                                                        <img src="../../recursos/imagenes/sneakersExample.svg"
                                                                                            class="card-img-top img-fluid"
                                                                                            alt="Imagen de zapato">
                                                                                        <!--Contenedor del cuerpo de la card-->
                                                                                        <div
                                                                                            class="card-body">
                                                                                            <!--Contenedor de nombre zapato-->
                                                                                            <div
                                                                                                class="ContenedorNombreZapato col-lg-12">
                                                                                                <h4 class="titillium-web-semibold text-center"
                                                                                                    id="nombreZapato">
                                                                                                    Nike
                                                                                                    Air
                                                                                                    Force 1'07
                                                                                                </h4>
                                                                                            </div>
                                                                                            <!--Contenedor del color y talla-->
                                                                                            <div
                                                                                                class="ContenedorColorTalla col-lg-12 d-flex">
                                                                                                <div class="col-lg-6 d-flex mt-3 justify-content-center align-items-center"
                                                                                                    id="contenedorColor">
                                                                                                    <h6
                                                                                                        class="titillium-web-extralight me-1">
                                                                                                        Color
                                                                                                    </h6>
                                                                                                    <div id="color"
                                                                                                        class="mb-2">
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="col-lg-6 d-flex mt-3 justify-content-center align-items-center"
                                                                                                    id="contenedorTalla">
                                                                                                    <h6
                                                                                                        class="titillium-web-extralight me-1">
                                                                                                        Talla
                                                                                                    </h6>
                                                                                                    <div
                                                                                                        id="talla">
                                                                                                        <h6
                                                                                                            id="tallaPedido">
                                                                                                            32
                                                                                                        </h6>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <!--Contenedor de la cantidad-->
                                                                                            <div
                                                                                                class="contenedorCantidad col-lg-12 justify-content-center align-items-center mt-2">
                                                                                                <h6 class="titillium-web-extralight text-center"
                                                                                                    id="cantidadPedido">
                                                                                                    Cantidad:
                                                                                                    12
                                                                                                </h6>
                                                                                            </div>
                                                                                        </div>
                                                                                        <!--Contenedor del footer-->
                                                                                        <div
                                                                                            class="card-footer bg-color-4blue">
                                                                                            <!--Contenedor del precio-->
                                                                                            <div
                                                                                                class="d-flex contenedorPrecios col-lg-12">
                                                                                                <div
                                                                                                    class="col-lg-6 d-flex justify-content-start">
                                                                                                    <h6 class="titillium-web-bold text-white"
                                                                                                        id="precioZapato">
                                                                                                        $120
                                                                                                    </h6>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="col-lg-6 d-flex justify-content-end">
                                                                                                    <h6 class="titillium-web-extralight text-white"
                                                                                                        id="cantidadTotal">
                                                                                                        Total:
                                                                                                        $1,440
                                                                                                    </h6>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <!-- Detalles del Más Pedido (Body) del acordion-->
                                                                            <div id="collapseOnePedidoRepartidor"
                                                                                class="accordion-collapse collapse show col-lg-12">
                                                                                <div class="accordion-body"
                                                                                    id="detallesDeMasPedidoRepartidor">
                                                                                    <div
                                                                                        class="col-lg-12">
                                                                                        <div
                                                                                            class="container">
                                                                                            <!--Contenedor de boton de entrega y precio total-->
                                                                                            <div
                                                                                                class="row col-lg-12">
                                                                                                <!--Contenedor del boton de iniciar entrega -->
                                                                                                <div
                                                                                                    class="col-lg-6 d-flex justify-content-center">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        class="col-lg-4 btn btn-primary shadow text18 titillium-web-regular bg-color-5blue"
                                                                                                        id="botonDePedido"
                                                                                                        onclick="cambioDeEstado()">
                                                                                                        Iniciar
                                                                                                        entrega
                                                                                                    </button>
                                                                                                </div>
                                                                                                <!--Contenedor de los precios-->
                                                                                                <div class="col-lg-6"
                                                                                                    id="containerTotales">
                                                                                                    <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                                                                        id="totalPediod">
                                                                                                        Total
                                                                                                        del
                                                                                                        pedido:
                                                                                                        $4,310
                                                                                                    </h6>
                                                                                                    <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                                                                        id="envio">
                                                                                                        Envío:
                                                                                                        $10
                                                                                                    </h6>
                                                                                                    <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                                                                        id="totalCobrar">
                                                                                                        Total
                                                                                                        a
                                                                                                        cobrar:
                                                                                                        $4,320
                                                                                                    </h6>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!-- Botón (Footer) -->
                                                                    <div
                                                                        class="offset-lg-9 col-lg-3">
                                                                        <button
                                                                            id="accordionButtonRepartidorPedido"
                                                                            class="accordion-button rounded-bottom rounded-top-0"
                                                                            type="button"
                                                                            data-bs-toggle="collapse"
                                                                            data-bs-target="#collapseOnePedidoRepartidor"
                                                                            aria-expanded="true"
                                                                            aria-controls="collapseOnePedidoRepartidor">
                                                                            Ver más
                                                                            información
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button type="button"
                                                            class="btn btn3 btn-primary ms-2 shadow text18 titillium-web-regular bg-color-5blue"
                                                            onclick="regresar()">Regresar</button>
                                                    </div>
                                                </div>
                                                <!--!Pedidos en progreso-->
                                                <div id="cardsDePedidosProgreso"
                                                    class="mt-4 col-lg-12 d-none">
                                                    <div
                                                        class="contenedorDeNuevosPedidosImagenTexto offset-lg-2 col-lg-8 bg-color-4blue d-flex justify-content-center align-items-center rounded-3">
                                                        <img id="imagenPedido"
                                                            src="../../recursos/imagenes/icons/camion.svg"
                                                            class="img-fluid mt-3 mb-3 me-1 ms-1"
                                                            alt="Icono de libreta">
                                                        <h6 class="titillium-web-bold text-white me-1"
                                                            id="textoDelCabezado">
                                                            Pedidos en progreso</h6>
                                                        <h6 class="titillium-web-extralight text-white me-1"
                                                            id="cantidadNuevosPedidosRepartidor">
                                                            1</h6>
                                                    </div>
                                                    <!--Comienzo de cards de zapatos-->
                                                    <div id="cardsDeZapato"
                                                        class="col-lg-12">
                                                        <div class="accordion mt-3 mb-4"
                                                            id="detalleInformacionRepartidor2">
                                                            <div class="accordion-item">
                                                                <!--HEADER del accordion-->
                                                                <div id="detalleInformacionHeaderRepatidor"
                                                                    class="accordion-header"
                                                                    data-bs-parent="#detalleInformacionRepartidor2">
                                                                    <!--Etiqueta del pedido-->
                                                                    <div class="col-lg-3">
                                                                        <p id="idPedidoNum2"
                                                                            class="rounded-top text-center pt-2 pb-2 titillium-web-bold color-5blue">
                                                                            Pedido N# 4322
                                                                        </p>
                                                                    </div>
                                                                    <!--Contenedor del cuerpo-->
                                                                    <div
                                                                        id="contenedorDelAcordionSoloHeaderAndBody2">
                                                                        <div class="col-lg-12 container mt-3 d-flex flex-wrap m-3 justify-content-center align-items-center"
                                                                            id="detallesDelPedidoRepartidor">
                                                                            <!--Contenedor de la etiqueta del pedido-->
                                                                            <div class="offset-lg-9 col-lg-3 bg-warning pt-1 mb-3 rounded skew-div"
                                                                                id="colorDelEstadoDelPedido">
                                                                                <h6 class="text-white skew-text text-center"
                                                                                    id="nombreDelEstadoDelPedido">
                                                                                    En
                                                                                    camino
                                                                                </h6>
                                                                            </div>
                                                                            <!--Info del cliente-->
                                                                            <div class="container d-none col-lg-12 d-flex justify-content-center mt-4 mb-2"
                                                                                id="infoDelClienteParaRepartidor2">
                                                                                <div
                                                                                    class="col-lg-3 img1">
                                                                                    <img src="../../recursos/imagenes/icons/iconodeusuarioblancoyfondoazul.svg"
                                                                                        alt="Icono de usuario">
                                                                                </div>
                                                                                <div
                                                                                    class="col-lg-4">
                                                                                    <h6 class="titillium-web"
                                                                                        id="nombreClienteRepartidor">
                                                                                        <b>Nombre
                                                                                            del
                                                                                            cliente:</b>
                                                                                        Animalito
                                                                                        Pollo
                                                                                        Campero
                                                                                        de
                                                                                        Campero
                                                                                    </h6>
                                                                                    <h6 class="titillium-web"
                                                                                        id="correoClienteRepartidor">
                                                                                        <b>Correo
                                                                                            del
                                                                                            cliente:</b>
                                                                                        PolloCampero@Pollo.com.sv
                                                                                    </h6>
                                                                                    <h6 class="titillium-web"
                                                                                        id="telefonoClienteRepartidor">
                                                                                        <b>Teléfono
                                                                                            del
                                                                                            cliente:</b>
                                                                                        6543-4354
                                                                                    </h6>
                                                                                    <h6 class="titillium-web"
                                                                                        id="direccionClienteRepartidor">
                                                                                        <b>Dirección
                                                                                            del
                                                                                            cliente:</b>
                                                                                        Pollo
                                                                                        campero
                                                                                        S.V
                                                                                    </h6>
                                                                                </div>
                                                                            </div>
                                                                            <!--Comienzo de cards de zapato-->
                                                                            <div
                                                                                class="containerCards col-lg-3 d-flex flex-wrap m-3">
                                                                                <div class="containerCard col-lg-12 flex-wrap"
                                                                                    id="cardPedido">
                                                                                    <div
                                                                                        class="card">
                                                                                        <!--Contenedor de la imagen-->
                                                                                        <img src="../../recursos/imagenes/sneakersExample.svg"
                                                                                            class="card-img-top img-fluid"
                                                                                            alt="Imagen de zapato">
                                                                                        <!--Contenedor del cuerpo de la card-->
                                                                                        <div
                                                                                            class="card-body">
                                                                                            <!--Contenedor de nombre zapato-->
                                                                                            <div
                                                                                                class="ContenedorNombreZapato col-lg-12">
                                                                                                <h4 class="titillium-web-semibold text-center"
                                                                                                    id="nombreZapato">
                                                                                                    Nike
                                                                                                    Air
                                                                                                    Force 1'07
                                                                                                </h4>
                                                                                            </div>
                                                                                            <!--Contenedor del color y talla-->
                                                                                            <div
                                                                                                class="ContenedorColorTalla col-lg-12 d-flex">
                                                                                                <div class="col-lg-6 d-flex mt-3 justify-content-center align-items-center"
                                                                                                    id="contenedorColor">
                                                                                                    <h6
                                                                                                        class="titillium-web-extralight me-1">
                                                                                                        Color
                                                                                                    </h6>
                                                                                                    <div id="color"
                                                                                                        class="mb-2">
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="col-lg-6 d-flex mt-3 justify-content-center align-items-center"
                                                                                                    id="contenedorTalla">
                                                                                                    <h6
                                                                                                        class="titillium-web-extralight me-1">
                                                                                                        Talla
                                                                                                    </h6>
                                                                                                    <div
                                                                                                        id="talla">
                                                                                                        <h6
                                                                                                            id="tallaPedido">
                                                                                                            32
                                                                                                        </h6>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <!--Contenedor de la cantidad-->
                                                                                            <div
                                                                                                class="contenedorCantidad col-lg-12 justify-content-center align-items-center mt-2">
                                                                                                <h6 class="titillium-web-extralight text-center"
                                                                                                    id="cantidadPedido">
                                                                                                    Cantidad:
                                                                                                    12
                                                                                                </h6>
                                                                                            </div>
                                                                                        </div>
                                                                                        <!--Contenedor del footer-->
                                                                                        <div
                                                                                            class="card-footer bg-color-4blue">
                                                                                            <!--Contenedor del precio-->
                                                                                            <div
                                                                                                class="d-flex contenedorPrecios col-lg-12">
                                                                                                <div
                                                                                                    class="col-lg-6 d-flex justify-content-start">
                                                                                                    <h6 class="titillium-web-bold text-white"
                                                                                                        id="precioZapato">
                                                                                                        $120
                                                                                                    </h6>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="col-lg-6 d-flex justify-content-end">
                                                                                                    <h6 class="titillium-web-extralight text-white"
                                                                                                        id="cantidadTotal">
                                                                                                        Total:
                                                                                                        $1,440
                                                                                                    </h6>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <!-- Detalles del Más Pedido (Body) del acordion-->
                                                                            <div id="collapseTwoPedidoRepartidor"
                                                                                class="accordion-collapse collapse show col-lg-12">
                                                                                <div class="accordion-body"
                                                                                    id="detallesDeMasPedidoRepartidor2">
                                                                                    <div
                                                                                        class="col-lg-12">
                                                                                        <div
                                                                                            class="container">
                                                                                            <!--Contenedor de boton de entrega y precio total-->
                                                                                            <div
                                                                                                class="row col-lg-12">
                                                                                                <!--Contenedor del boton de iniciar entrega -->
                                                                                                <div
                                                                                                    class="col-lg-6 d-flex justify-content-center">
                                                                                                    <button
                                                                                                        type="button"
                                                                                                        class="col-lg-4 btn btn-primary shadow text18 titillium-web-regular bg-color-5blue"
                                                                                                        id="botonDePedido"
                                                                                                        onclick="cambioDeEstado()">
                                                                                                        Entregado
                                                                                                    </button>
                                                                                                </div>
                                                                                                <!--Contenedor de los precios-->
                                                                                                <div class="col-lg-6"
                                                                                                    id="containerTotales">
                                                                                                    <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                                                                        id="totalPediod">
                                                                                                        Total
                                                                                                        del
                                                                                                        pedido:
                                                                                                        $4,310
                                                                                                    </h6>
                                                                                                    <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                                                                        id="envio">
                                                                                                        Envío:
                                                                                                        $10
                                                                                                    </h6>
                                                                                                    <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                                                                        id="totalCobrar">
                                                                                                        Total
                                                                                                        a
                                                                                                        cobrar:
                                                                                                        $4,320
                                                                                                    </h6>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!-- Botón (Footer) -->
                                                                    <div
                                                                        class="offset-lg-9 col-lg-3">
                                                                        <button
                                                                            id="accordionButtonRepartidorPedido2"
                                                                            class="accordion-button rounded-bottom rounded-top-0"
                                                                            type="button"
                                                                            data-bs-toggle="collapse"
                                                                            data-bs-target="#collapseTwoPedidoRepartidor"
                                                                            aria-expanded="true"
                                                                            aria-controls="collapseTwoPedidoRepartidor">
                                                                            Ver más
                                                                            información
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button type="button"
                                                                class="btn btn3 btn-primary ms-2 shadow text18 titillium-web-regular bg-color-5blue"
                                                                onclick="regresar()">Regresar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!--!Apartado de entregado-->
                                                <div id="cardsDePedidosEntregado"
                                                    class="mt-4 col-lg-12 d-none">
                                                    <div
                                                        class="contenedorDeNuevosPedidosImagenTexto offset-lg-2 col-lg-8 bg-color-4blue d-flex justify-content-center align-items-center rounded-3">
                                                        <img id="imagenPedido"
                                                            src="../../recursos/imagenes/icons/entregado.svg"
                                                            class="img-fluid mt-3 mb-3 me-1 ms-1"
                                                            alt="Icono de libreta">
                                                        <h6 class="titillium-web-bold text-white me-1"
                                                            id="textoDelCabezado">
                                                            Pedidos
                                                            Entregado</h6>
                                                        <h6 class="titillium-web-extralight text-white me-1"
                                                            id="cantidadNuevosPedidosRepartidor">
                                                            1</h6>
                                                    </div>
                                                    <!--Comienzo de cards de zapatos-->
                                                    <div id="cardsDeZapato"
                                                        class="col-lg-12">
                                                        <div class="accordion mt-3 mb-4"
                                                            id="detalleInformacionRepartidor3">
                                                            <div class="accordion-item">
                                                                <!--HEADER del accordion-->
                                                                <div id="detalleInformacionHeaderRepatidor"
                                                                    class="accordion-header"
                                                                    data-bs-parent="#detalleInformacionRepartidor3">
                                                                    <!--Etiqueta del pedido-->
                                                                    <div class="col-lg-3">
                                                                        <p id="idPedidoNum2"
                                                                            class="rounded-top text-center pt-2 pb-2 titillium-web-bold color-5blue">
                                                                            Pedido
                                                                            N#
                                                                            4322
                                                                        </p>
                                                                    </div>
                                                                    <!--Contenedor del cuerpo-->
                                                                    <div
                                                                        id="contenedorDelAcordionSoloHeaderAndBody2">
                                                                        <div class="col-lg-12 container mt-3 d-flex flex-wrap m-3 justify-content-center align-items-center"
                                                                            id="detallesDelPedidoRepartidor">
                                                                            <!--Contenedor de la etiqueta del pedido-->
                                                                            <div class="offset-lg-9 col-lg-3 bg-success pt-1 mb-3 rounded skew-div"
                                                                                id="colorDelEstadoDelPedido">
                                                                                <h6 class="text-white skew-text text-center"
                                                                                    id="nombreDelEstadoDelPedido">
                                                                                    Entregado
                                                                                </h6>
                                                                            </div>
                                                                            <!--Info del cliente-->
                                                                            <div class="container d-none col-lg-12 d-flex justify-content-center mt-4 mb-2"
                                                                                id="infoDelClienteParaRepartidor3">
                                                                                <div
                                                                                    class="col-lg-3 img1">
                                                                                    <img src="../../recursos/imagenes/icons/iconodeusuarioblancoyfondoazul.svg"
                                                                                        alt="Icono de usuario">
                                                                                </div>
                                                                                <div
                                                                                    class="col-lg-4">
                                                                                    <h6 class="titillium-web"
                                                                                        id="nombreClienteRepartidor">
                                                                                        <b>Nombre
                                                                                            del
                                                                                            cliente:</b>
                                                                                        Animalito
                                                                                        Pollo
                                                                                        Campero
                                                                                        de
                                                                                        Campero
                                                                                    </h6>
                                                                                    <h6 class="titillium-web"
                                                                                        id="correoClienteRepartidor">
                                                                                        <b>Correo
                                                                                            del
                                                                                            cliente:</b>
                                                                                        PolloCampero@Pollo.com.sv
                                                                                    </h6>
                                                                                    <h6 class="titillium-web"
                                                                                        id="telefonoClienteRepartidor">
                                                                                        <b>Teléfono
                                                                                            del
                                                                                            cliente:</b>
                                                                                        6543-4354
                                                                                    </h6>
                                                                                    <h6 class="titillium-web"
                                                                                        id="direccionClienteRepartidor">
                                                                                        <b>Dirección
                                                                                            del
                                                                                            cliente:</b>
                                                                                        Pollo
                                                                                        campero
                                                                                        S.V
                                                                                    </h6>
                                                                                </div>
                                                                            </div>
                                                                            <!--Comienzo de cards de zapato-->
                                                                            <div
                                                                                class="containerCards col-lg-3 d-flex flex-wrap m-3">
                                                                                <div class="containerCard col-lg-12 flex-wrap"
                                                                                    id="cardPedido">
                                                                                    <div
                                                                                        class="card">
                                                                                        <!--Contenedor de la imagen-->
                                                                                        <img src="../../recursos/imagenes/sneakersExample.svg"
                                                                                            class="card-img-top img-fluid"
                                                                                            alt="Imagen de zapato">
                                                                                        <!--Contenedor del cuerpo de la card-->
                                                                                        <div
                                                                                            class="card-body">
                                                                                            <!--Contenedor de nombre zapato-->
                                                                                            <div
                                                                                                class="ContenedorNombreZapato col-lg-12">
                                                                                                <h4 class="titillium-web-semibold text-center"
                                                                                                    id="nombreZapato">
                                                                                                    Nike
                                                                                                    Air
                                                                                                    Force 1'07
                                                                                                </h4>
                                                                                            </div>
                                                                                            <!--Contenedor del color y talla-->
                                                                                            <div
                                                                                                class="ContenedorColorTalla col-lg-12 d-flex">
                                                                                                <div class="col-lg-6 d-flex mt-3 justify-content-center align-items-center"
                                                                                                    id="contenedorColor">
                                                                                                    <h6
                                                                                                        class="titillium-web-extralight me-1">
                                                                                                        Color
                                                                                                    </h6>
                                                                                                    <div id="color"
                                                                                                        class="mb-2">
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div class="col-lg-6 d-flex mt-3 justify-content-center align-items-center"
                                                                                                    id="contenedorTalla">
                                                                                                    <h6
                                                                                                        class="titillium-web-extralight me-1">
                                                                                                        Talla
                                                                                                    </h6>
                                                                                                    <div
                                                                                                        id="talla">
                                                                                                        <h6
                                                                                                            id="tallaPedido">
                                                                                                            32
                                                                                                        </h6>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <!--Contenedor de la cantidad-->
                                                                                            <div
                                                                                                class="contenedorCantidad col-lg-12 justify-content-center align-items-center mt-2">
                                                                                                <h6 class="titillium-web-extralight text-center"
                                                                                                    id="cantidadPedido">
                                                                                                    Cantidad:
                                                                                                    12
                                                                                                </h6>
                                                                                            </div>
                                                                                        </div>
                                                                                        <!--Contenedor del footer-->
                                                                                        <div
                                                                                            class="card-footer bg-color-4blue">
                                                                                            <!--Contenedor del precio-->
                                                                                            <div
                                                                                                class="d-flex contenedorPrecios col-lg-12">
                                                                                                <div
                                                                                                    class="col-lg-6 d-flex justify-content-start">
                                                                                                    <h6 class="titillium-web-bold text-white"
                                                                                                        id="precioZapato">
                                                                                                        $120
                                                                                                    </h6>
                                                                                                </div>
                                                                                                <div
                                                                                                    class="col-lg-6 d-flex justify-content-end">
                                                                                                    <h6 class="titillium-web-extralight text-white"
                                                                                                        id="cantidadTotal">
                                                                                                        Total:
                                                                                                        $1,440
                                                                                                    </h6>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <!-- Detalles del Más Pedido (Body) del acordion-->
                                                                            <div id="collapseThreePedidoRepartidor"
                                                                                class="accordion-collapse collapse show col-lg-12">
                                                                                <div class="accordion-body"
                                                                                    id="detallesDeMasPedidoRepartidor3">
                                                                                    <div
                                                                                        class="col-lg-12">
                                                                                        <div
                                                                                            class="container">
                                                                                            <!--Contenedor de boton de entrega y precio total-->
                                                                                            <div
                                                                                                class="row col-lg-12">
                                                                                                <!--Contenedor de los precios-->
                                                                                                <div class="col-lg-6"
                                                                                                    id="containerTotales">
                                                                                                    <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                                                                        id="totalPediod">
                                                                                                        Total
                                                                                                        del
                                                                                                        pedido:
                                                                                                        $4,310
                                                                                                    </h6>
                                                                                                    <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                                                                        id="envio">
                                                                                                        Envío:
                                                                                                        $10
                                                                                                    </h6>
                                                                                                    <h6 class="titillium-web-extralight d-flex justify-content-end"
                                                                                                        id="totalCobrar">
                                                                                                        Total
                                                                                                        a
                                                                                                        cobrar:
                                                                                                        $4,320
                                                                                                    </h6>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!-- Botón (Footer) -->
                                                                    <div
                                                                        class="offset-lg-9 col-lg-3">
                                                                        <button
                                                                            id="accordionButtonRepartidorPedido3"
                                                                            class="accordion-button rounded-bottom rounded-top-0"
                                                                            type="button"
                                                                            data-bs-toggle="collapse"
                                                                            data-bs-target="#collapseThreePedidoRepartidor"
                                                                            aria-expanded="true"
                                                                            aria-controls="collapseThreePedidoRepartidor">
                                                                            Ver
                                                                            más
                                                                            información
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button type="button"
                                                            class="btn btn3 btn-primary ms-2 shadow text18 titillium-web-regular bg-color-5blue"
                                                            onclick="regresar()">Regresar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Botón (Footer) -->
                        <div class="offset-lg-9 col-lg-3">
                            <button id="accordionButtonRepartidor${row.id_trabajador}"
                                class="accordion-button rounded-bottom rounded-top-0"
                                type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapse${row.id_trabajador}Repartidor" aria-expanded="true"
                                aria-controls="collapse${row.id_trabajador}Repartidor">
                                Ver más información
                            </button>
                        </div>
                    </div>
                </div>
            </div>`
        });
        
        if (DATA.dataset == 0) {
            await sweetAlert(1, DATA.message, true);
        }

    } else {
        await sweetAlert(2, DATA.error, true);
    }
}