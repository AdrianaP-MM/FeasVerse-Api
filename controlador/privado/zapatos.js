// Variables globales
const NOMBREC_INPUT = document.getElementById('nombreColor');
const MODAL_TITLE = document.getElementById('modalTitle');
const UPDATE_FORM = document.getElementById('updateForm');
const UPDATE_FORM_COLOR = document.getElementById('updateFromColor');
const ADD_FORM = document.getElementById('addZapato');
const MODAL_TITLE_TALLA = document.getElementById('modalTitleT');
const MODAL_TITLE_DETALLE = document.getElementById('modalTitleD');
const nombrecolor = document.getElementById('nombre_color');
const DATA_MODAL_COLORES = new bootstrap.Modal('#dataModal');
const DATA_DETALLES_MODAL = new bootstrap.Modal('#dataModalD');
const TALLAS_DETALLES_MODAL = new bootstrap.Modal('#dataModalTallas');
const DESCRIPCION_INPUT = document.getElementById('descripcionInput');
const FORMADD = document.getElementById('AddTallasF')

const TALLA_INPUT = document.getElementById('idTalla');
const COLOR_INPUT = document.getElementById('Color');
const CANTIDAD_INPUT = document.getElementById('cantidad');
const IMG_INPUT = document.getElementById('selectedImageF');
const BOTON_CANCELAR_COLOR = document.getElementById('cancelarBtnColor');

const BOTON_ACTUALIZAR = document.getElementById('actualizarBtn');
const BOTON_ACTUALIZAR_COLOR = document.getElementById('actualizarBtnColor');
const BOTON_ACTUALIZAR3 = document.getElementById('actualizarBtn3');
const CARDZAPATO = document.getElementById('slider');
const BOTON_ADD_COLOR = document.getElementById('btnAddColor');
const ADD_COLOR = document.getElementById('AddColor');
const PASTILLA_COLOR = document.getElementById('contenedorFilaColores');
const ID_COLOR = document.getElementById('id_color');

document.querySelector('title').textContent = 'Feasverse - Zapatos';

const COLORES_DIV = document.getElementById('colores');
const AGREGAR_DIV = document.getElementById('agregar');
const PRINCIPAL = document.getElementById('container');
const NOMBRE_INPUT = document.getElementById('nombreColorInput');

const FORM_EDIT_ZAPATO = document.getElementById('formZapatoEdit');


const ZAPATOS_API = 'services/privada/zapatos.php';

// Inputs del modal de UPDATE zapato
const NOMBRE_ZAPATOD = document.getElementById('nombreZapatoD'),
    GENERO_ZAPATOD = document.getElementById('generoZapatoD'),
    MARCA_ZAPATOD = document.getElementById('marcaZapatoD'),
    PRECIO_ZAPATOD = document.getElementById('precioZapatoD'),
    DESCRIPCION_ZAPATOD = document.getElementById('descripcionZapatoD'),
    IMAGEN_ZAPATOD = document.getElementById('selectedImageDetalleZapato');

// Constantes para establecer el contenido de la tabla.
const TABLE_BODY = document.getElementById('bodyDetalleZapato');

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar plantilla
    await loadTemplate();
    // Establecer propiedades iniciales
    NOMBREC_INPUT.readOnly = true;
    document.getElementById('registrados-tab').click();
});

const fillTableColores = async (form = null) => {
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ZAPATOS_API, 'readAllColores');
    console.log(DATA);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        PASTILLA_COLOR.innerHTML = "";
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            console.log(row.id_color)
            console.log(row.nombre_color)
            PASTILLA_COLOR.innerHTML += `
            <div class="pastilla" onclick="openDetailsColores(${row.id_color},'${row.nombre_color}')"> 
            <h4>${row.nombre_color}</h4>
        </div>
            `;
        });
        if (DATA.dataset == 0) {
            await sweetAlert(1, DATA.message, true);
        }
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const addColores = async () => {
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ADD_COLOR);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ZAPATOS_API, 'addColores', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Llama a la función 'sweetAlert' con ciertos parámetros.
        await sweetAlert(1, 'Se ha guardado correctamente', true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        // Limpia los valores de los elementos de entrada y establece una imagen de marcador de posición.
        NOMBRE_INPUT.value = ' ';
        fillTableColores();
    } else {
        await sweetAlert(2, DATA.error, false);
    }
}

const addZapato = async () => {
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ADD_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ZAPATOS_API, 'createRow', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Llama a la función 'sweetAlert' con ciertos parámetros.
        await sweetAlert(1, 'Se ha guardado correctamente', true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        // Limpia los valores de los elementos de entrada y establece una imagen de marcador de posición.
    } else {
        await sweetAlert(2, DATA.error, false);
    }
}


const fillTable = async (form = null) => {
    CARDZAPATO.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ZAPATOS_API, 'readAll');
    console.log(DATA);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            CARDZAPATO.innerHTML += `
            <div class="slide" onclick="openDetalles(${row.id_zapato})">
            <img src="${SERVER_URL}helpers/images/zapatos/${row.foto_detalle_zapato}">
            <span>${row.nombre_zapato}</span>
        </div>
            `;
        });

        if (DATA.dataset == 0) {
            await sweetAlert(1, DATA.message, true);
        }
    } else {
        sweetAlert(2, DATA.error, false);
    }
}
let idColor = null;
let nombre_color = null;


// Función para abrir los detalles de un trabajador.
const openDetailsColores = async (id_color, nombre_color) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id_color', id_color);
    FORM.append('nombre_color', nombre_color);
    console.log(id_color);
    console.log(nombre_color);
    idColor = id_color;
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ZAPATOS_API, 'readOneColores', FORM);
    console.log(DATA)
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se prepara el formulario.
        DATA_MODAL_COLORES.show();
        const ROW = DATA.dataset;
        NOMBREC_INPUT.value = nombre_color;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}



// Funciones de interacción
function showZapatos() {
    fillTable();
    COLORES_DIV.classList.add('d-none');
    AGREGAR_DIV.classList.add('d-none');
    PRINCIPAL.classList.remove('d-none');
}

function showColores(button) {
    fillTableColores();
    // Mostrar y ocultar divs correspondientes
    COLORES_DIV.classList.remove('d-none');
    AGREGAR_DIV.classList.add('d-none');
    PRINCIPAL.classList.add('d-none');

    // Restablecer colores de botones
    document.querySelectorAll('.boton-cambiar-color').forEach(boton => {
        boton.style.backgroundColor = '#146A93';
    });

    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}

function showAgregar(button) {
    fillSelect(ZAPATOS_API, 'readMarcas', 'marcaInput');
    // Mostrar y ocultar divs correspondientes
    AGREGAR_DIV.classList.remove('d-none');
    PRINCIPAL.classList.add('d-none');
    COLORES_DIV.classList.add('d-none');
    AGREGAR_PASO_DOS_DIV.classList.add('d-none');

    // Restablecer colores de botones
    document.querySelectorAll('.boton-cambiar-color').forEach(boton => {
        boton.style.backgroundColor = '#146A93';
    });

    button.style.backgroundColor = '#1A89BD';
    button.style.color = 'white';
}

DATA_DETALLES_MODAL._element.addEventListener('hidden.bs.modal', function () {
    BOTON_ACTUALIZAR3.textContent = "Actualizar";
});


// Funciones para abrir modales
/*
async function openDetails() {
    event.preventDefault(); 
    DATA_MODAL.show();
    UPDATE_FORM.reset();
    NOMBREC_INPUT.value =
    MODAL_TITLE.textContent = 'Detalles Color: Rojo';
}*/

async function openTallas() {
    event.preventDefault();
    UPDATE_FORM.reset();
    MODAL_TITLE_TALLA.textContent = 'Tallas y Stock del Producto';
}

const openDetalles = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('id_zapato', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ZAPATOS_API, 'readOneZapato', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se prepara el formulario.
        FORM_EDIT_ZAPATO.reset();
        const ROW = DATA.dataset;
        NOMBRE_ZAPATOD.value = ROW.nombre_zapato;
        GENERO_ZAPATOD.value = findNumberValue(ROW.genero_Zapato);
        fillSelect(ZAPATOS_API, 'readMarcas', 'marcaZapatoD', ROW.id_marca);
        PRECIO_ZAPATOD.value = ROW.precio_unitario_zapato;
        DESCRIPCION_ZAPATOD.value = ROW.descripcion_zapato;
        // Actualiza el título del modal con el ID del zapato.
        MODAL_TITLE_DETALLE.textContent = 'Detalle del zapato #' + id;
        fillTableDetalles(id);
        // Se muestra la caja de diálogo con su título.
        DATA_DETALLES_MODAL.show();
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const fillTableDetalles = async (id) => {
    const FORM = new FormData();
    FORM.append('id_zapato', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ZAPATOS_API, 'readDetallesZapato', FORM);
    TABLE_BODY.innerHTML = '';
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        const ROW = DATA.dataset;
        IMAGEN_ZAPATOD.src = `${SERVER_URL}/helpers/images/zapatos/${ROW.foto_detalle_zapato} `;

        if (DATA.dataset == 0) {
            await sweetAlert(1, DATA.message, true);
        }
        else {
            if (Array.isArray(DATA.dataset)) {
                console.log(id);
                // Construir la fila de la tabla si solo hay un elemento en el conjunto de datos.
                DATA.dataset.forEach(row => {
                    TABLE_BODY.innerHTML += `
                <tr>
                    <td data-labelN="N°">${row.id_detalle_zapato}</td>
                    <td data-labelT="Talla">${row.id_talla}</td>
                    <td data-labelS="Cantidad Actual">${row.cantidad_zapato}</td>
                    <td data-labelE="Color actual">${row.id_color}</td>
                    <td>
                        <button class="Verde"> <img class="note"
                            src="../../recursos/imagenes/icons/notebook.svg"
                            width="35px" height="35px">
                        </button>
                        <button class="Rojo"> <img class="note"
                            src="../../recursos/imagenes/basura.svg" width="35px"
                            height="35px">
                        </button>
                    </td>
                </tr>
            `;
                });
            } else {
                console.log("Hola Adriana nos habla feo");
                TABLE_BODY.innerHTML += `
                <tr> 
                    <td data-labelN="N°">${ROW.id_detalle_zapato}</td>
                    <td data-labelT="Talla">${ROW.id_talla}</td>
                    <td data-labelS="Cantidad Actual">${ROW.cantidad_zapato}</td>
                    <td data-labelE="Color actual">${ROW.id_color}</td>
                    <td>
                        <button class="Verde"> <img class="note"
                            src="../../recursos/imagenes/icons/notebook.svg"
                            width="35px" height="35px">
                        </button>
                        <button class="Rojo"> <img class="note"
                            src="../../recursos/imagenes/basura.svg" width="35px"
                            height="35px">
                        </button>
                    </td>
                </tr>
            `;
            }
        }
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

function findNumberValue(value) {
    // Comprobar si el valor es 'Activo'
    if (value == 'Unisex') {
        return 1; // Si es 'Activo', devolver 1
    } else if (value == 'Masculino') {
        return 2; // Si no es 'Activo', devolver 2
    }
    else { return 3 }
}

async function addDetalles() {
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ADD_FORM);
    FORM.append('descripcionInput', DESCRIPCION_INPUT.value);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ZAPATOS_API, 'createRow', FORM);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        await sweetAlert(1, 'Se ha guardado correctamente', true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        TALLAS_DETALLES_MODAL.show();
        fillSelect(ZAPATOS_API, 'readTallas', 'idTalla');
        fillSelect(ZAPATOS_API, 'readColores', 'Color');
        // Resetear el formulario
        document.getElementById('addZapato').reset();
    } else {
        await sweetAlert(2, DATA.error, false);
    }
}

async function createRowPT2() {
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORMADD);

    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ZAPATOS_API, 'createRowPT2', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra un mensaje de éxito.
        const RESPONSE = await confirmAction('Guardado Exitosamente', '¿Desea agregar otro detalle?');

        // Se verifica la respuesta del mensaje.
        if (RESPONSE.isConfirmed) {
            // Resetear el formulario
            TALLA_INPUT.value = ' ';
            COLOR_INPUT.value = ' ';
        } else {
            // Si el usuario cancela, se oculta algún elemento modal (posiblemente DATA_MODAL).
            TALLAS_DETALLES_MODAL.hide();
        }

    } else {
        await sweetAlert(2, DATA.error, false);
    }
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
function enableFormFields() {
    NOMBREC_INPUT.readOnly = false;
}
function disableFormFields() {
    NOMBREC_INPUT.readOnly = true;

}

// Funciones para actualizar y cancelar en modales
const botonActualizarColor = async () => {
    const textoBoton = BOTON_ACTUALIZAR_COLOR.textContent.trim();
    event.preventDefault(); // Se evita recargar la página web después de enviar el formulario.

    if (textoBoton === 'Actualizar') {
        console.log(idColor);
        // Habilita la edición de los campos de entrada.
        enableFormFields(); // Suponemos que habilita todos los campos incluido NOMBREC_INPUT.
        NOMBREC_INPUT.readOnly = false; // Asegura que el campo específico también es editable.
        BOTON_ACTUALIZAR_COLOR.textContent = "Guardar";
    } else if (textoBoton === 'Guardar') {
        // Deshabilita la edición de los campos de entrada.
        disableFormFields(); // Suponemos que deshabilita todos los campos.

        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(UPDATE_FORM_COLOR);
        FORM.append('id_color', idColor);
        FORM.append('nombreColor', NOMBREC_INPUT.value);

        // Petición para guardar los datos del formulario.
        const DATA = await fetchData(ZAPATOS_API, 'ActColores', FORM);

        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, 'Se ha actualizado correctamente', true);
            // Se cierra la caja de diálogo.
            DATA_MODAL_COLORES.hide();
            restoreEvrPS();
            fillTableColores();
        } else {
            enableFormFields(); // Si hay error, habilita los campos nuevamente para corrección.
            sweetAlert(2, DATA.error, false);
        }
    }
};


async function botonCancelar() {
    const textoBoton = BOTON_ACTUALIZAR.textContent.trim();

    if (textoBoton === 'Actualizar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Se cerrará la ventana emergente');
        if (RESPONSE.isConfirmed) {
        }
    } else if (textoBoton === 'Guardar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Si has modificado, no se guardará');
        if (RESPONSE.isConfirmed) {
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

        DATA_DETALLES_MODAL.show();
    }
}

async function botonCancelar2() {
    const textoBoton = BOTON_ACTUALIZAR2.textContent.trim();

    if (textoBoton === 'Actualizar') {
        const RESPONSE = await confirmAction('¿Seguro que quieres regresar?', 'Se cerrará la ventana emergente');
        if (RESPONSE.isConfirmed) {

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

async function showCancelConfirmation(message, submessage) {
    const RESPONSE = await confirmAction(message, submessage);
    if (RESPONSE.isConfirmed) {
        DATA_MODAL_COLORES.hide();
    }
}


async function botonCancelarColor() {
    await showCancelConfirmation('¿Seguro qué quieres regresar?', 'Se cerrará la ventana emergente');
}

var container = document.getElementById('container');
var slider = document.getElementById('slider');
var slides = document.getElementsByClassName('slide').length;
var buttons = document.getElementsByClassName('btn');

var currentPosition = 0;
var slidesPerPage = 0;
var slidesCount = slides - slidesPerPage;
var containerWidth = container.offsetWidth;

window.addEventListener("resize", checkWidth);

function checkWidth() {
    containerWidth = container.offsetWidth;
    setParams(containerWidth);
}

function setParams(w) {
    if (w < 551) {
        slidesPerPage = 1;
    } else if (w < 901) {
        slidesPerPage = 2;
    } else if (w < 1101) {
        slidesPerPage = 3;
    } else {
        slidesPerPage = 4;
    }
    slidesCount = slides - slidesPerPage;
    currentPosition = Math.min(currentPosition, slidesCount);
    currentPosition = Math.max(currentPosition, 0);
    slider.style.transform = 'translateX(-' + currentPosition * (100 / slidesPerPage) + '%)';
    updateButtons();
}

function updateButtons() {
    buttons[0].classList.toggle('inactive', currentPosition <= 0);
    buttons[1].classList.toggle('inactive', currentPosition >= slidesCount - slidesPerPage);
}

setParams();

function slideRight() {
    currentPosition = Math.min(currentPosition + 1, slidesCount - slidesPerPage);
    slider.style.transform = 'translateX(-' + currentPosition * (100 / slidesPerPage) + '%)';
    updateButtons();
}

function slideLeft() {
    currentPosition = Math.max(currentPosition - 1, 0);
    slider.style.transform = 'translateX(-' + currentPosition * (100 / slidesPerPage) + '%)';
    updateButtons();
}