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
const DCOMENTARIOS_BODY = document.getElementById('Prueba')

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
                <div class="ComentarioC mt-3" data-id="${row.idComentario}" data-bs-toggle="tab" id="ComentarioC_${row.idComentario}" role="tab"
                                data-bs-target="#rectanguloP" aria-controls="rectanguloP" aria-selected="true">
                                
                                <div class="Calificacion d-flex align-items: center; justify-content-end" id="idComentario_${row.idComentario}">
                                <input type="number" class="d-none" id="Fecha_${row.idComentario}" name="Fecha">
                                    <p style="font-size: 23px;" class=" d-flex justify-content-end flex-row"
                                        id="NumberCalificacion_${row.idComentario}">${row.calificacion_comentario}</p>
                                    <a href="#" class="bi-star-fill estrella d-flex justify-content-end mt-2"></a>
                                </div>
                                <h5 class="comentarioT" id="TituloComentario_${row.idComentario}">${row.titulo_comentario}</h5>
                                <p class="comentarioD" id="DescripcionComentario_${row.idComentario}">${row.descripcion_comentario}</p>`
            });
            // Asignar un manejador de eventos a todos los elementos .ComentarioC
            document.querySelectorAll('.ComentarioC').forEach(comentario => {
                comentario.addEventListener('click', function () {
                    ShowComentario(this.dataset.idComentario);
                });
            });
        }
    } else {
        console.error('ERROR:', DATA.error);
        await sweetAlert(4, DATA.error, true);
    }
};

const ShowComentario = async (idComentario) => {
    try {
        console.log(idComentario); // Verifica que idComentario no sea undefined
        // Crear un objeto FormData para enviar el idComentario
        const formData = new FormData(); 
        formData.append('idComentario', idComentario);

        COMENTARIOS_DIV.classList.remove('d-none'); // Mostrar el contenedor de comentarios

        // Obtener los datos del comentario específico usando la API
        const DATA = await fetchData(COMENTARIOS_API, 'readOneComentario', formData);
        
        console.log('Response from fetchData:', DATA);


        if (DATA && DATA.status) {
            DCOMENTARIOS_DIV.innerHTML = ''; // Limpiamos el contenido anterior antes de agregar nuevos comentarios
            DATA.dataset.forEach(row => {
                DCOMENTARIOS_DIV.innerHTML += `
                    <div class="d-flex flex-row flex-wrap contenedorElemento1 justify-content-between">
                        <div class="container p-0 m-0">
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
                    <div class="d-flex flex-column flex-wrap contenedorComentario">
                        <h6 class="titillium-web-semibold color-3blue Texto">Descripcion del comentario:</h6>
                        <p class="Texto">${row.descripcion_comentario}</p>
                        <div class="container p-0 m-0 mt-4">
                            <button type="button" class="btn btn1 btn-primary" id="btnRetirar" onclick="updateEstado()">
                                Retirar comentario
                            </button>
                        </div>
                    </div>`;
            });
        } else {
            if (DATA && DATA.error) {
                console.error('Error fetching data:', DATA.error);
                await sweetAlert(2, DATA.error, null); // Mostrar mensaje de error
            } else {
                console.error('Unknown error: Unable to fetch data.');
                await sweetAlert(2, 'Unknown error: Unable to fetch data.', null); // Mostrar mensaje de error
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        await sweetAlert(2, 'Error processing request.', null); // Mostrar mensaje de error
    } finally {
        COMENTARIOS_DIV.classList.add('d-none'); // Ocultar el contenedor de comentarios
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