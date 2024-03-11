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

    // Selecciona el botón de accordion y agrega un evento click para expandir o contraer detalles.
    const accordionButton = document.getElementById('accordionButton');
    accordionButton.addEventListener('click', function () {
        const isExpanded = accordionButton.getAttribute('aria-expanded') === 'true';
        // Cambia la visibilidad del contenedor de detalles según si está expandiendo o contrayendo
        const detallesDeMasPedido = document.getElementById('infoDeRepartidor');
        if (isExpanded) {
            detallesDeMasPedido.classList.remove('d-none');
        } else {
            detallesDeMasPedido.classList.add('d-none');
        }

        // Cambia el texto del botón según si está expandiendo o contrayendo
        accordionButton.textContent = isExpanded ? 'Ver menos información' : 'Ver más información';
    });

    // Selecciona el botón de accordion y agrega un evento click para expandir o contraer detalles.
    const accordionButton2 = document.getElementById('accordionButton2');
    accordionButton2.addEventListener('click', function () {
        const isExpanded2 = accordionButton2.getAttribute('aria-expanded') === 'true';

        // Cambia la visibilidad del contenedor de detalles según si está expandiendo o contrayendo
        const detallesDeMasPedido2 = document.getElementById('infoDeRepartidor2');
        if (isExpanded2) {
            detallesDeMasPedido2.classList.remove('d-none');
        } else {
            detallesDeMasPedido2.classList.add('d-none');
        }

        // Cambia el texto del botón según si está expandiendo o contrayendo
        accordionButton2.textContent = isExpanded2 ? 'Ver menos información' : 'Ver más información';
    });

    // Selecciona el botón de accordion y agrega un evento click para expandir o contraer detalles.
    const accordionButton3 = document.getElementById('accordionButton3');
    accordionButton3.addEventListener('click', function () {
        const isExpanded3 = accordionButton3.getAttribute('aria-expanded') === 'true';
        // Cambia la visibilidad del contenedor de detalles según si está expandiendo o contrayendo
        const detallesDeMasPedido3 = document.getElementById('infoDeRepartidor3');
        if (isExpanded3) {
            detallesDeMasPedido3.classList.remove('d-none');
        } else {
            detallesDeMasPedido3.classList.add('d-none');
        }

        // Cambia el texto del botón según si está expandiendo o contrayendo
        accordionButton3.textContent = isExpanded3 ? 'Ver menos información' : 'Ver más información';
    });

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

    // Hace clic automáticamente en el botón del accordion para ocultar los detalles por defecto.
    accordionButton.click();
    accordionButton2.click();
    accordionButton3.click();
    accordionButtonRepartidorPedido.click();
    accordionButtonRepartidorPedido2.click();
    accordionButtonRepartidorPedido3.click();
    accordionButtonRepartidor.click();
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
function ShowPedidos(boton) {
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
const cambioDeEstado = async () => {
    await sweetAlert(1, 'Se ha cambiado correctamente el estado del pedido', true);
}
