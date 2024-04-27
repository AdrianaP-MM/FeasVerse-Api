// Variables globales
const NOMBREC_INPUT = document.getElementById('nombreColor');
const MODAL_TITLE = document.getElementById('modalTitle');
const UPDATE_FORM = document.getElementById('updateForm');
const MODAL_TITLE_TALLA = document.getElementById('modalTitleT');
const MODAL_TITLE_DETALLE = document.getElementById('modalTitleD');

const DATA_MODAL = new bootstrap.Modal('#dataModal');
const DATA_TALLAS_MODAL = new bootstrap.Modal('#dataModalT');
const DATA_DETALLES_MODAL = new bootstrap.Modal('#dataModalD');

const BOTON_ACTUALIZAR = document.getElementById('actualizarBtn');
const BOTON_ACTUALIZAR2 = document.getElementById('actualizarBtn2');
const BOTON_ACTUALIZAR3 = document.getElementById('actualizarBtn3');

document.querySelector('title').textContent = 'Feasverse - Zapatos';

const COLORES_DIV = document.getElementById('colores');
const AGREGAR_DIV = document.getElementById('agregar');
const AGREGAR_PASO_DOS_DIV = document.getElementById('paso2');

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar plantilla
    await loadTemplate();

    // Establecer propiedades iniciales
    NOMBREC_INPUT.readOnly = true;
    document.getElementById('registrados-tab').click();
});

// Funciones de interacción
function showZapatos(button) {
    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}

function showColores(button) {
    // Mostrar y ocultar divs correspondientes
    COLORES_DIV.classList.remove('d-none');
    AGREGAR_DIV.classList.add('d-none');
    AGREGAR_PASO_DOS_DIV.classList.add('d-none');

    // Restablecer colores de botones
    document.querySelectorAll('.boton-cambiar-color').forEach(boton => {
        boton.style.backgroundColor = '#146A93';
    });

    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}

function showPaso2(button) {
    // Mostrar y ocultar divs correspondientes
    COLORES_DIV.classList.add('d-none');
    AGREGAR_DIV.classList.add('d-none');
    AGREGAR_PASO_DOS_DIV.classList.remove('d-none');
}

function showAgregar(button) {
    // Mostrar y ocultar divs correspondientes
    AGREGAR_DIV.classList.remove('d-none');
    COLORES_DIV.classList.add('d-none');
    AGREGAR_PASO_DOS_DIV.classList.add('d-none');

    // Restablecer colores de botones
    document.querySelectorAll('.boton-cambiar-color').forEach(boton => {
        boton.style.backgroundColor = '#146A93';
    });

    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}

// Funciones relacionadas con los modales
DATA_MODAL._element.addEventListener('hidden.bs.modal', function () {
    BOTON_ACTUALIZAR.textContent = "Actualizar";
});

DATA_DETALLES_MODAL._element.addEventListener('hidden.bs.modal', function () {
    BOTON_ACTUALIZAR3.textContent = "Actualizar";
});

DATA_TALLAS_MODAL._element.addEventListener('hidden.bs.modal', function () {
    BOTON_ACTUALIZAR2.textContent = "Actualizar";
});

// Funciones para abrir modales
async function openDetails() {
    DATA_MODAL.show();
    UPDATE_FORM.reset();
    NOMBREC_INPUT.value = "Rojo";
    MODAL_TITLE.textContent = 'Detalles Color: Rojo';
}

async function openTallas() {
    DATA_DETALLES_MODAL.hide();
    DATA_TALLAS_MODAL.show();
    UPDATE_FORM.reset();
    MODAL_TITLE_TALLA.textContent = 'Tallas y Stock del Producto';
}

async function openDetalles() {
    DATA_DETALLES_MODAL.show();
    MODAL_TITLE_DETALLE.textContent = 'Detalle del zapato';
}

// Función para mostrar imágenes seleccionadas
function displaySelectedImage(event, elementId) {
    const selectedImage = document.getElementById(elementId);
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            selectedImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}

// Funciones para actualizar y cancelar en modales
async function botonActualizar() {
    const textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    if (textoBoton === 'Actualizar') {
        NOMBREC_INPUT.readOnly = false;
        BOTON_ACTUALIZAR.textContent = "Guardar";
    } else if (textoBoton === 'Guardar') {
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        DATA_MODAL.hide();
    }
}

async function botonCancelar() {
    const textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    if (textoBoton === 'Actualizar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Se cerrará la ventana emergente');
        if (RESPONSE.isConfirmed) {
            DATA_MODAL.hide();
        }
    } else if (textoBoton === 'Guardar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Si has modificado, no se guardará');
        if (RESPONSE.isConfirmed) {
            DATA_MODAL.hide();
        }
    }
}

// Funciones para actualizar y cancelar en otros modales (similar a las anteriores)
async function botonActualizar2() {
    const textoBoton = BOTON_ACTUALIZAR2.textContent.trim();

    if (textoBoton === 'Actualizar') {
        BOTON_ACTUALIZAR2.textContent = "Guardar";
    } else if (textoBoton === 'Guardar') {
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        DATA_TALLAS_MODAL.hide();
        DATA_DETALLES_MODAL.show();
    }
}

async function botonCancelar2() {
    const textoBoton = BOTON_ACTUALIZAR2.textContent.trim();

    if (textoBoton === 'Actualizar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Se cerrará la ventana emergente');
        if (RESPONSE.isConfirmed) {
            DATA_TALLAS_MODAL.hide();
            DATA_DETALLES_MODAL.show();
        }
    } else if (textoBoton === 'Guardar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Si has modificado, no se guardará');
        if (RESPONSE.isConfirmed) {
            DATA_TALLAS_MODAL.hide();
            DATA_DETALLES_MODAL.show();
        }
    }
}

async function botonActualizar3() {
    const textoBoton = BOTON_ACTUALIZAR3.textContent.trim();

    if (textoBoton === 'Actualizar') {
        BOTON_ACTUALIZAR3.textContent = "Guardar";
    } else if (textoBoton === 'Guardar') {
        await sweetAlert(1, 'Se ha actualizado correctamente', true);
        DATA_DETALLES_MODAL.hide();
    }
}

async function botonCancelar3() {
    const textoBoton = BOTON_ACTUALIZAR3.textContent.trim();

    if (textoBoton === 'Actualizar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Se cerrará la ventana emergente');
        if (RESPONSE.isConfirmed) {
            DATA_DETALLES_MODAL.hide();
        }
    } else if (textoBoton === 'Guardar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Si has modificado, no se guardará');
        if (RESPONSE.isConfirmed) {
            DATA_DETALLES_MODAL.hide();
        }
    }
}


var container = document.getElementById('container')
var slider = document.getElementById('slider');
var slides = document.getElementsByClassName('slide').length;
var buttons = document.getElementsByClassName('btn');

var currentPosition = 0;
var currentMargin = 0;
var slidesPerPage = 0;
var slidesCount = slides - slidesPerPage;
var containerWidth = container.offsetWidth;
var prevKeyActive = false;
var nextKeyActive = true;

window.addEventListener("resize", checkWidth);

function checkWidth() {
	containerWidth = container.offsetWidth;
	setParams(containerWidth);
}

function setParams(w) {
	if (w < 551) {
		slidesPerPage = 1;
	} else {
		if (w < 901) {
			slidesPerPage = 2;
		} else {
			if (w < 1101) {
				slidesPerPage = 3;
			} else {
				slidesPerPage = 4;
			}
		}
	}
	slidesCount = slides - slidesPerPage;
	if (currentPosition > slidesCount) {
		currentPosition -= slidesPerPage;
	};
	currentMargin = - currentPosition * (100 / slidesPerPage);
	slider.style.marginLeft = currentMargin + '%';
	if (currentPosition > 0) {
		buttons[0].classList.remove('inactive');
	}
	if (currentPosition < slidesCount) {
		buttons[1].classList.remove('inactive');
	}
	if (currentPosition >= slidesCount) {
		buttons[1].classList.add('inactive');
	}
}

setParams();

function slideRight() {
	if (currentPosition != 0) {
		slider.style.marginLeft = currentMargin + (100 / slidesPerPage) + '%';
		currentMargin += (100 / slidesPerPage);
		currentPosition--;
	};
	if (currentPosition === 0) {
		buttons[0].classList.add('inactive');
	}
	if (currentPosition < slidesCount) {
		buttons[1].classList.remove('inactive');
	}
};

function slideLeft() {
	if (currentPosition != slidesCount) {
		slider.style.marginLeft = currentMargin - (100 / slidesPerPage) + '%';
		currentMargin -= (100 / slidesPerPage);
		currentPosition++;
	};
	if (currentPosition == slidesCount) {
		buttons[1].classList.add('inactive');
	}
	if (currentPosition > 0) {
		buttons[0].classList.remove('inactive');
	}
};
