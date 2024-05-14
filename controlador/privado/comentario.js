// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Comentarios';
//Declaracion de variables

const COMENTARIOS_DIV = document.getElementById('rectanguloP'),
    DCOMENTARIOS_DIV = document.getElementById('idComentario'),
    NUMBERCALIFICACION = document.getElementById('NumberCalificacion'),
    DESCRIPCIONCOMENTARIO = document.getElementById('DescripcionComentario'),
    ID_COMENTARIO = document.getElementById('idComentario1'),
    BOTON_ESTADO = document.getElementById('btnRetirar'),
    FECHA = document.getElementById('Fecha'),
    TITULOCOMENTARIO = document.getElementById('TituloComentario');

const COMENTARIO_BODY = document.getElementById('ComentarioC');
const DCOMENTARIOS_BODY = document.getElementById('idComentario')

const COMENTARIOS_API = 'services/privada/comentarios.php';

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    COMENTARIOS_DIV.classList.remove('d-none');
    DCOMENTARIOS_DIV.classList.add('d-none');
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
                <div class="ComentarioC mt-3" id="ComentarioC_${row.id_comentario}"  onclick="ShowComentario(${row.id_comentario})">
                    <div class="Calificacion d-flex align-items: center; justify-content-end" id="idComentario1_${row.id_comentario}">
                        <input type="number" class="d-none" id="Fecha_${row.id_comentario}" name="Fecha">
                        <p style="font-size: 23px;" class=" d-flex justify-content-end flex-row"
                            id="NumberCalificacion_${row.id_comentario}">${row.calificacion_comentario}</p>
                        <a href="#" class="bi-star-fill estrella d-flex justify-content-end mt-2"></a>
                    </div>
                    <h5 class="comentarioT" id="TituloComentario_${row.id_comentario}">${row.titulo_comentario}</h5>
                    <p class="comentarioD" id="DescripcionComentario_${row.idComentario}">${row.descripcion_comentario}</p>
                </div>`
            });
            // Asignar un manejador de eventos a todos los elementos .ComentarioC
        }
    } else {
        await sweetAlert(4, DATA.error, true);
    }
};

const ShowComentario = async (idComentario) => {

    // Creamos un FormData y añadimos el id del comentario
    const formData = new FormData();
    formData.append('idComentario', idComentario);
    DCOMENTARIOS_BODY.innerHTML = '';
    // Mostramos el contenedor de comentarios
    DCOMENTARIOS_DIV.classList.remove('d-none');
    // Ocultamos el contenedor de comentarios después de realizar todas las operaciones
    COMENTARIOS_DIV.classList.add('d-none');

    // Obtenemos los datos del comentario específico usando la API
    const DATA = await fetchData(COMENTARIOS_API, 'readOneComentario', formData);

    // Verificamos si la respuesta es exitosa
    if (DATA.status) {
        // Verificamos si hay datos en el conjunto de datos
        if (DATA.dataset.length === 0) {
            await sweetAlert(1, "No hay comentarios disponibles.", true);
        } else {
            const row = DATA.dataset;

            // Iteramos sobre cada comentario en el conjunto de datos
            // Construimos el HTML para mostrar el comentario
            DCOMENTARIOS_BODY.innerHTML += `
            <div class="nav-link idComentario z-0 d-flex flex-column " id="idComentario">
                    <div class="d-flex flex-row flex-wrap contenedorElemento1 justify-content-between">
                        <div class="container p-0 m-0" id="idComentario2">
                            <button class="btn" type="button" onclick="volver()">
                                <img src="../../recursos/imagenes/flecha.png" width="25px" height="30px">
                            </button> <!--Boton para volver a la pagina de comentarios-->
                        </div>
                        <div class="d-flex flex-column justify-content-center flex-wrap mx-5 me-5 ms-5 mb-2 contenedorInfoCliente">
                            <h3 class="fw-normal titillium-web-regular mb-5 color-4blue">Información del comentario</h3>
                            <p class="titillium-web-regular">
                                <span class="fw-bold">Nombre del cliente:</span> ${row.nombre_cliente}, ${row.apellido_cliente}
                            </p>
                            <p class="titillium-web-regular">
                                <span class="fw-bold">Correo del cliente:</span> ${row.correo_cliente}
                            </p>
                            <p class="titillium-web-regular">
                                <span class="fw-bold">Teléfono del cliente:</span> ${row.telefono_cliente}
                            </p>
                        </div>
                        <div class="d-flex flex-column contedorDataZapato flex-wrap">
                            <div class="detalleZapato d-flex flex-column flex-wrap justify-content-evenly">
                                <h5 class="titillium-web-extralight color-3blue"> Producto Comentado</h5>
                                <img src="${row.foto_detalle_zapato}" alt="zapatoC" class="">
                                <p class=" m-0 fw-semi-bold">${row.nombre_zapato}</p>
                                <p class="m-0">Zapato ${row.genero_zapato}</p>
                                <p class="m-0">2 Colores ${row.nombre_color}</p>
                                <p class=" m-0 fw-bold">$${row.precio_unitario_zapato}</p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column flex-wrap contenedorComentario ms-5">
                        <h6 class="titillium-web-semibold color-3blue Texto">Descripcion del comentario:</h6>
                        <p class="Texto ">${row.descripcion_comentario}</p>
                        <div class="container p-0 m-0 mt-4">
                            <button type="button" class="btn btn1 btn-primary" id="btnRetirar" onclick="(openUpdate)">
                                Retirar comentario
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    } else {
        // Si hay un error, mostramos una alerta
        await sweetAlert(4, DATA.error, true);
    }
};

const openUpdate = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    FORM.append('idComentario', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(COMENTARIOS_API, 'readOne', FORM);
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