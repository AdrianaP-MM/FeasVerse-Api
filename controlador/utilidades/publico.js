/*
*   Controladores de uso general en las páginas web del sitio público.
*   Sirve para manejar las plantillas del encabezado y pie del documento.
*/

//* Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');

/* Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.*/

const loadTemplate = async () => {
    // *Se agrega el encabezado de la página web antes del contenido principal.
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg sticky-top bg-color-3blue ">
            <div class="container-fluid">
                <div class="d-flex flex-row m-3 me-5">
                    <a class="navbar-brand" href="/vistas/publico/index.html">
                        <h2 class="text-white titillium-web-black m-0 p-0">FEASVERSE</h2>
                    </a>
                    <img src="../../recursos/imagenes/logo.svg" class="img1" alt="FeasVerseCompany" width="50"
                        height="50">
                </div>
                <button class="navbar-toggler mb-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-underline">

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle space" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <h5 class="text-white titillium-web-regular m-0 p-0">Ingresar</h5>
                            </a>
                            <ul class="dropdown-menu bg-color-4blue">
                                <li><a class="dropdown-item my-2" href="#">
                                        <h6 class="text-white titillium-web-regular m-0 p-0 py-1">Iniciar Sesión
                                        </h6>
                                    </a>
                                </li>
                                <li><a class="dropdown-item my-2" href="#">
                                        <h6 class="text-white titillium-web-regular m-0 p-0 py-1">Registrarse</h6>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link space" aria-current="page" href="#">
                                <h5 class="text-white titillium-web-regular m-0 p-0">Sobre Nosotros</h5>
                            </a>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle space" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <h5 class="text-white titillium-web-regular m-0 p-0">Marcas</h5>
                            </a>
                            <ul class="dropdown-menu bg-color-4blue">
                                <div class="d-flex flex-column">
                                    <div class="d-flex flex-row flex-wrap contenedorMarcas">
                                        <li> <!--*Elemento 1-->
                                            <a class="dropdown-item pointer-hover py-2 px-3" href="#">
                                                <img width="100px" height="100px"
                                                    src="../../recursos/imagenes/marcas/adidas.svg" alt="ADIDAS">
                                            </a>
                                        </li>
                                        <li> <!--*Elemento 2-->
                                            <a class="dropdown-item pointer-hover py-2 px-3" href="#">
                                                <img width="100px" height="100px"
                                                    src="../../recursos/imagenes/marcas/adidas.svg" alt="ADIDAS">
                                            </a>
                                        </li>
                                        <li> <!--*Elemento 3-->
                                            <a class="dropdown-item pointer-hover py-2 px-3" href="#">
                                                <img width="100px" height="100px"
                                                    src="../../recursos/imagenes/marcas/adidas.svg" alt="ADIDAS">
                                            </a>
                                        </li>
                                        <li> <!--*Elemento 4-->
                                            <a class="dropdown-item pointer-hover py-2 px-3" href="#">
                                                <img width="100px" height="100px"
                                                    src="../../recursos/imagenes/marcas/adidas.svg" alt="ADIDAS">
                                            </a>
                                        </li>
                                    </div>
                                </div>

                            </ul>
                        </li>

                    </ul>
                    <div class="d-flex">
                        <button class="btn btn-outline-primary" type="button">
                            <img src="../../recursos/imagenes/carrito.svg" width="50px" height="50">
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `);
    //* Se agrega el pie de la página web después del contenido principal.
    MAIN.insertAdjacentHTML('afterend', `
    `);
}