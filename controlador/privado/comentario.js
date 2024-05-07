// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Comentarios';
//Declaracion de variables

const COMENTARIOS_DIV = document.getElementById('rectanguloP'),
    DCOMENTARIOS_DIV = document.getElementById('rectanguloP1'),
    NUMBERCALIFICACION = document.getElementById('NumberCalificacion'),
    DESCRIPCIONCOMENTARIO = document.getElementById('DescripcionComentario'),
    ID_COMENTARIO = document.getElementById('idComentario'),
    BOTON_ESTADO = document.getElementById('btnRetirar'),
    FECHA = document.getElementById('Fecha'),
    TITULOCOMENTARIO = document.getElementById('TituloComentario');

const COMENTARIO_BODY = document.getElementById('ComentarioC');

const COMENTARIOS_API = 'services/privada/comentarios.php';

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    COMENTARIOS_DIV.classList.remove('d-none');
    //DCOMENTARIOS_DIV.classList.add('d-none');
    fillComents();
});

const fillComents = async () => {
    // Obtén los datos de la API
    const DATA = await fetchData(COMENTARIOS_API, 'readAll');

    // Verifica si la respuesta es satisfactoria
    if (DATA.status) {
        if (DATA.dataset.length === 0) {
            await sweetAlert(1, "No hay comentarios disponibles.", true);
        } else {
            // Manejar los datos de comentarios
            DATA.dataset.forEach(row => {
                COMENTARIO_BODY.innerHTML += `
                <div class="ComentarioC mt-3" data-bs-toggle="tab" id="ComentarioC" role="tab"
                                data-bs-target="#rectanguloP" aria-controls="rectanguloP" aria-selected="true">
                                
                                <div class="Calificacion d-flex align-items: center; justify-content-end" id="idComentario">
                                <input type="number" class="d-none" id="Fecha" name="Fecha">
                                    <p style="font-size: 23px;" class=" d-flex justify-content-end flex-row"
                                        id="NumberCalificacion">${row.calificacion_comentario}</p>
                                    <a href="#" class="bi-star-fill estrella d-flex justify-content-end mt-2"></a>
                                </div>
                                <h5 class="comentarioT" id="TituloComentario">${row.titulo_comentario}</h5>
                                <p class="comentarioD" id="DescripcionComentario">${row.descripcion_comentario}</p>`
            });
            // Asignar un manejador de eventos
            document.querySelector('.ComentarioC').addEventListener('click', function () {
                ShowComentario(this);
            });
        }
    } else {
        console.error('ERROR:', DATA.error);
        await sweetAlert(4, DATA.error, true);
    }
};

BOTON_ESTADO.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_PRODUCTO.value) ? action = 'updateRow' : action = 'createRow';
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(COMENTARIOS_API, action, BOTON_ESTADO);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillComents();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

const ShowComentario = async (idComentario) => {
    try {
        COMENTARIOS_DIV.classList.remove('d-none');
        const body = new URLSearchParams({ idComentario }).toString();

        const DATA = await fetchData(COMENTARIOS_API, 'readOneComentario', body);

        if (DATA.status) {
            const BOTON = DATA.dataset;
            const ESTADO_PRODUCTO = ESTADO_PRODUCTO.estado_producto;
        } else {
            sweetAlert(2, DATA.error, null);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        sweetAlert(2, 'Error processing request.', null);
    } finally {
        COMENTARIOS_DIV.classList.add('d-none');
    }
};


const openUpdate = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    FORM.append('idProducto', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar producto';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        EXISTENCIAS_PRODUCTO.disabled = true;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_PRODUCTO.value = ROW.id_producto;
        NOMBRE_PRODUCTO.value = ROW.nombre_producto;
        DESCRIPCION_PRODUCTO.value = ROW.descripcion_producto;
        PRECIO_PRODUCTO.value = ROW.precio_producto;
        EXISTENCIAS_PRODUCTO.value = ROW.existencias_producto;
        ESTADO_PRODUCTO.checked = ROW.estado_producto;
        fillSelect(CATEGORIA_API, 'readAll', 'categoriaProducto', ROW.id_categoria);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

function volver() {
    COMENTARIOS_DIV.classList.remove('d-none');
    // Se oculta el formulario de tabla.
    DCOMENTARIOS_DIV.classList.add('d-none');
}

const RetirarC = async () => {
    var textoBoton = BOTON_ESTADO.textContent.trim();

    await sweetAlert(1, 'Se ha retirado el comentario correctamente', true);

}