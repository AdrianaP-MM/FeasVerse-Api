// Se establece el título de la página web.
document.querySelector('title').textContent = 'Feasverse - Comentarios';
//Declaracion de variables

const COMENTARIOS_DIV = document.getElementById('rectanguloP'),
    DCOMENTARIOS_DIV = document.getElementById('rectanguloP1'),
    NUMBERCALIFICACION = document.getElementById('NumberCalificacion'),
    DESCRIPCIONCOMENTARIO = document.getElementById('DescripcionComentario'),
    ID_COMENTARIO = document.getElementById('idComentario'),
    BOTON_ESTADO = document.getElementById('btnRetirar'),
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

const updateEstado = async (idComentario) => {
    try {
        const DATA = await fetchData(COMENTARIOS_API, 'updateEstado');
        console.log(DATA); // Verifica los datos devueltos

        if (DATA && DATA.status !== undefined) {
            if (DATA.status) {
                await sweetAlert(1, 'Se ha actualizado correctamente', true);
            } else {
                await sweetAlert(2, DATA.error || 'Error desconocido', false);
            }
        } else {
            throw new Error("Respuesta de la API no válida");
        }
    } catch (error) {
        console.error("Error al actualizar estado:", error);
        await sweetAlert(2, "Error de conexión o procesamiento", false);
    }
};



function ShowComentario(div) {
    // Se muestra el div para agregar trabajador.
    DCOMENTARIOS_DIV.classList.remove('d-none');
    div.style.backgroundColor = ""
    // Se oculta el formulario de tabla.
    COMENTARIOS_DIV.classList.add('d-none');
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