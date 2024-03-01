// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Pedidos';

// Constante para uso
const PEDIDOS_DIV = document.getElementById('pedidos');
const REPARTIDOR_DIV = document.getElementById('repartidor');;
//CONSTANTE PARA TIPOS DE CATEGORIA PARA EL RESULTADO
const CONT_CATEGORIA_PEDIDO = document.getElementById('contenedorCategoriaPedido');
const CARDS_NUEVOS_PEDIDOS = document.getElementById('cardsDeNuevosPedidos');
const IMAGEN_PEDIDO = document.getElementById('imagenPedido');
const TEXTO_CABEZADO = document.getElementById('textoDelCabezado');
const REPARTIR = document.getElementById('cantidadNuevosPedidosRepartidor');
const COLOR = document.getElementById('colorDelEstadoDelPedido');
const NOMBRE_ESTADO = document.getElementById('nombreDelEstadoDelPedido')

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
            console.log('Hola')
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
    accordionButtonRepartidorPedido.addEventListener('click', function(){

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

    //Cambio del texto para la info del accordion
    const accordionButtonRepartidor = document.getElementById('accordionButtonRepartidor');
    accordionButtonRepartidor.addEventListener('click', function(){ 
        const isExpanded = accordionButtonRepartidor.getAttribute('aria-expanded') === 'true';
        //Cambio del texto del boton 
        accordionButtonRepartidor.textContent = isExpanded ? 'Ver menos información' : 'Ver más información';
    })

    // Hace clic automáticamente en el botón del accordion para ocultar los detalles por defecto.
    accordionButton.click();
    accordionButton2.click();
    accordionButton3.click();
    accordionButtonRepartidorPedido.click();
    accordionButtonRepartidor.click();
});

function regresar(){
    CONT_CATEGORIA_PEDIDO.classList.remove('d-none');
    CARDS_NUEVOS_PEDIDOS.classList.add('d-none');
}

//FUNCION PARA mostrar los nuevos pedidos del repartidor  
function mostrarNuevosPedidos(){
    CONT_CATEGORIA_PEDIDO.classList.add('d-none');
    CARDS_NUEVOS_PEDIDOS.classList.remove('d-none');
}

function mostrarPedidosProgreso(){

}

function mostrarPedidosEntregados(){

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
const cambioDeEstado = async () =>  {
    await sweetAlert(1, 'Se ha cambiado correctamente el estado del pedido', true);
}
