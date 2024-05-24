// Constantes para establecer el contenido
const CONTAINER_MARCAS = document.getElementById('carousel_inner');
const MARCAS_API = 'services/publica/marcas.php';

// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    fillTable();
});


/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async () => {
    CONTAINER_MARCAS.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(MARCAS_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            TABLE_BODY.innerHTML += `
            <div class="card sizeCard" onclick="openDetails(${row.id_marca})">
                <img src="${SERVER_URL}helpers/images/marcas/${row.foto_marca}" />
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