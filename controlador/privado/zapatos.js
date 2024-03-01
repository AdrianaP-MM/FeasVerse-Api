document.querySelector('title').textContent = 'Feasverse - Zapatos';

const COLORES_DIV = document.getElementById('colores');
const AGREGAR_DIV = document.getElementById('agregar');

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    document.getElementById('registrados-tab').click();
});

function showZapatos(button) {
    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}

function showColores(boton) {
    // Se muestra el div para agregar marca.
    COLORES_DIV.classList.remove('d-none');
    // Se oculta la visualizacion de las marcas.
    AGREGAR_DIV.classList.add('d-none');

    // Restablece el color de todos los botones
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
    });

    // Cambia el color del botón clicado
    boton.style.backgroundColor = '#1A89BD';
    boton.style.color = 'white';
}

function App(){}
    window.onload = function(event){
        var app = new App();
        window.app = app;
    }

    App.prototype.processingButton = function(event){

        const btn = event.currentTarget;
        const carruselList = event.currentTarget.parentNode;
        const track = event.currentTarget.parentNode.querySelector("#track");
        const carrusel = track.querySelectorAll('.carrusel');

        const carruselWidth = carrusel[0].offsetWidth;

        const trackWidth = track.offsetWidth;
        const listWidth = carruselList.offsetWidth;

        track.style.left == "" ? leftPosition = track.style.left = 0 :leftPosition = parseFloat(track.style.left.slice(0,-2) * -1);
        btn.dataset.button == "button-prev" ? prevAction(leftPosition,carruselWidth,track) : nextAction(leftPosition, trackWidth, listWidth, carruselWidth, track);
    }

    let prevAction = (leftPosition, carruselWidth, track) => {
        if(leftPosition > 0){
            track.style.left = `${-1 * (leftPosition - carruselWidth)}px`;
        }
    }

    let nextAction = (leftPosition, trackWidth, listWidth, carruselWidth, track) => {
        if(leftPosition < (trackWidth - listWidth)){
            track.style.left = `${-1 * (leftPosition + carruselWidth)}px`;
        }
    }


