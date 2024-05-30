const BUSCADOR_API = 'services/publica/buscador.php'; // URL de la API 
const MARCA_API = 'services/publica/marcas.php'; // URL de la API 
const CARDS_ZAPATO_BODY = document.getElementById('cardsZapato'); // Cuerpo de la tabla del carrito de compras
const PAGINATION = document.getElementById('pagination'); // Contenedor de la paginación
const CARDS_TALLAS = document.getElementById('contenedorFilaTallas');
const SELECT_COLOR = document.getElementById('coloresSelect');

const IMAGEN_MARCA = document.getElementById('imagenMarca');
const NOMBRE_MARCA = document.getElementById('nombreDeLaMarca');
const DESCRIPCION_MARCA = document.getElementById('descripcionDeLaMarca');

let currentPage = 1;
const itemsPerPage = 6; // Número de items por página
let allZapatos = []; // Variable para almacenar todos los datos de zapatos

document.addEventListener('DOMContentLoaded', async () => {
    await loadTemplate();
    const ACCORDION_BUTTON_TALLAS = document.getElementById('accordionTallas');
    ACCORDION_BUTTON_TALLAS.click();
    fillTalla();
    await fillMarca();
    await fillTable();
    fillSelect(BUSCADOR_API, 'readColor', 'coloresSelect');
    setupFilterEventListeners();
});

document.getElementById('buscadorInputZapatos').addEventListener('input', function () {
    var searchIcon = document.querySelector('.search-icon');
    var clearIcon = document.querySelector('.clear-icon');
    if (this.value.length > 0) {
        clearIcon.style.display = 'block';
    } else {
        searchIcon.style.display = 'block';
        clearIcon.style.display = 'none';
    }
});

function clearSearch() {
    var input = document.getElementById('buscadorInputZapatos');
    var searchIcon = document.querySelector('.search-icon');
    var clearIcon = document.querySelector('.clear-icon');
    input.value = '';
    input.focus();
    searchIcon.style.display = 'block';
    clearIcon.style.display = 'none';
}

const fillMarca = async () => {
    const FORM = new FormData();
    let idMarca = Number(getQueryParam('marca'));
    FORM.append('idMarca', idMarca);

    const DATA = await fetchData(MARCA_API, 'readOne', FORM);

    if (DATA.status) {
        const ROW = DATA.dataset;
        NOMBRE_MARCA.innerHTML = ROW.nombre_marca;
        DESCRIPCION_MARCA.innerHTML = ROW.descripcion_marca;
        IMAGEN_MARCA.src = `${SERVER_URL}helpers/images/marcas/${ROW.foto_marca}`;
    }
    else {
        // Mostrar mensaje de error
    }
}

const fillTalla = async () => {

    const DATA = await fetchData(BUSCADOR_API, 'readTallas');
    CARDS_TALLAS.innerHTML = '';
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CARDS_TALLAS.innerHTML += `
            <div class="cuadradoTalla">
                <h5 class="titillium-web-regular m-0 p-0">
                    ${row.num_talla}
                </h5>
            </div>
            `;
        });
    }
    else {
        // Mostrar mensaje de error
    }
}

const fillTable = async (page = 1) => {
    if (allZapatos.length === 0) { // Cargar los datos sólo una vez
        const FORM = new FormData();
        let idMarca = Number(getQueryParam('marca'));
        FORM.append('idMarca', idMarca);
        const DATA = await fetchData(BUSCADOR_API, 'readAllZapatoMarca', FORM);
        if (DATA.status) {
            allZapatos = DATA.dataset;
        } else {
            // Mostrar mensaje de error
            return;
        }
    }

    const filteredZapatos = applyFiltersToData(allZapatos);

    CARDS_ZAPATO_BODY.innerHTML = '';
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = filteredZapatos.slice(start, end);

    paginatedItems.forEach(row => {
        CARDS_ZAPATO_BODY.innerHTML += `
        <div class="col-lg-4 col-md-3 col-sm-6 mt-2 mb-2">
            <div class="card col-lg-12 col-md-12 col-sm-12" id="cardC">
                <a href="../../vistas/publico/detalle_zapato.html?zapato=${row.id_zapato}" class="text15">
                    <div class="image-wrapper2 col-lg-12">
                        <img src="${SERVER_URL}helpers/images/zapatos/${row.foto_detalle_zapato}" id="imagenZapato"
                            alt="${row.nombre_zapato}">
                    </div>
                    <div class="lineImgC"></div>
                    <div class="card-body">
                        <div class="d-flex flex-column col-lg-12 col-md-12 col-sm-12">
                            <div class="d-flex col-lg-12 col-md-12 col-sm-12">
                                <div class="d-flex flex-column col-lg-8 col-md-8 col-sm-8">
                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                        <h1 class="col-lg-12 col-md-12 col-sm-12 titillium-web-bold text18 text-black mb-0"
                                            id="nombre">
                                            ${row.nombre_zapato}
                                        </h1>
                                        <p class="col-lg-12 col-md-12 col-sm-12 titillium-web-extralight text12 clgr3 mt-0"
                                            id="categoria">
                                            ${row.genero_zapato}
                                        </p>
                                    </div>
                                </div>
                                <div class="d-flex col-lg-4 col-md-4 col-sm-4">
                                    <div
                                        class="d-flex col-lg-12 col-md-12 col-sm-12 justify-content-end">
                                        <p class="col-lg-11 titillium-web-extralight text12 clgr3"
                                            id="colores">
                                            ${row.colores} colores</p>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex col-lg-12 col-md-12 col-sm-12">
                                <div
                                    class="col-lg-6 col-md-6 col-sm-6 d-flex flex-row align-items-center">
                                    <img src="../../recursos/imagenes/icons/starFill.svg"
                                        alt="">
                                    <p class="titillium-web-bold text12 m-0 align-baselin clYellowStar mt-1"
                                        id="calificacionZapato">
                                        ${row.estrellas !== null ? row.estrellas : 0}</p>
                                </div>
                                <div
                                    class="d-flex col-lg-6 col-md-6 col-sm-6 justify-content-end align-items-center">
                                    <h1 class="titillium-web-bold text15 text-black d-flex align-items-center mt-1"
                                        id="precioZapato"> $${row.precio_unitario_zapato}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        `;
    });

    setupPagination(filteredZapatos.length, itemsPerPage, page);
}

function applyFiltersToData(data) {
    const selectedGenders = Array.from(document.querySelectorAll('.form-check-input:checked')).map(cb => cb.getAttribute('data-genero'));
    if (selectedGenders.length === 0) {
        return data;
    } else {
        return data.filter(item => selectedGenders.includes(item.genero_zapato));
    }
}

function setupFilterEventListeners() {
    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            fillTable(1); // Reiniciar a la primera página al aplicar filtros
        });
    });
}

const setupPagination = (totalItems, itemsPerPage, currentPage) => {
    PAGINATION.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let backNext = document.createElement('li');
    backNext.classList.add('page-item', 'backNext');
    backNext.innerHTML = `<a class="page-link" href="#" aria-label="ANTERIOR">&laquo; ANTERIOR</a>`;
    if (currentPage === 1) {
        backNext.classList.add('disabled');
    }
    backNext.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            fillTable(currentPage);
        }
    });
    PAGINATION.appendChild(backNext);

    for (let i = 1; i <= totalPages; i++) {
        let pageItem = document.createElement('li');
        pageItem.classList.add('page-item', 'num');
        if (i === currentPage) {
            pageItem.classList.add('active');
        }
        pageItem.innerHTML = `<a class="page-link num2" href="#">${i}</a>`;
        pageItem.addEventListener('click', () => {
            currentPage = i;
            fillTable(currentPage);
        });
        PAGINATION.appendChild(pageItem);
    }

    let next = document.createElement('li');
    next.classList.add('page-item', 'backNext');
    next.innerHTML = `<a class="page-link" href="#" aria-label="SIGUIENTE">SIGUIENTE &raquo;</a>`;
    if (currentPage === totalPages) {
        next.classList.add('disabled');
    }
    next.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage += 1;
            fillTable(currentPage);
        }
    });
    PAGINATION.appendChild(next);
}

const getQueryParam = (param) => {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
