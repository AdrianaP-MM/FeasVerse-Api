// Se establece el título de la página web.
    document.querySelector('title').textContent = 'Feasverse - Comentarios';

    const COMENTARIOS_DIV = document.getElementById('rectanguloP');
    const DCOMENTARIOS_DIV = document.getElementById('rectanguloP1');

    // *Método del evento para cuando el documento ha cargado.
    document.addEventListener('DOMContentLoaded', async () => {
        // *Llamada a la función para mostrar el encabezado y pie del documento.
        loadTemplate();
        COMENTARIOS_DIV.classList.remove('d-none');
        DCOMENTARIOS_DIV.classList.add('d-none');
    });

    function ShowComentario(div) {
        // Se muestra el div para agregar trabajador.
        DCOMENTARIOS_DIV.classList.remove('d-none');
        div.style.backgroundColor=""
        // Se oculta el formulario de tabla.
        COMENTARIOS_DIV.classList.add('d-none');
    }