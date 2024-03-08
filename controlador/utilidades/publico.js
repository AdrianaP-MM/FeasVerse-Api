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
    <header class="sticky-top">
        <nav class="navbar navbar-expand-lg bg-color-3blue shadow">
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
                            <a class="nav-link space" aria-current="page" href="/vistas/publico/sobre_nosotros.html">
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
                        <button class="btn btn-outline-primary" type="button" onclick="gotoCarrito()" >
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
    <footer class="text-center text-lg-start text-white bg-color-3blue">
        <!-- Section: Social media -->
        <section class="d-flex justify-content-between p-4 topFooter">
            <!-- Right -->
            <div>
                <a href="" class="text-white me-4">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="" class="text-white me-4">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="" class="text-white me-4">
                    <i class="fab fa-google"></i>
                </a>
                <a href="" class="text-white me-4">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="" class="text-white me-4">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="" class="text-white me-4">
                    <i class="fab fa-github"></i>
                </a>
            </div>
            <!-- Right -->
        </section>
        <!-- Section: Social media -->

        <!-- Section: Links  -->
        <section class="">
            <div class="container text-center text-md-start mt-5">
                <!-- Grid row -->
                <div class="row mt-3">
                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                        <!-- Content -->
                        <h5 class="text-white titillium-web-bold">FEASVERSE</h5>
                        <hr class="mb-4 mt-0 d-inline-block mx-auto" />
                        <h6 class="titillium-web-regular">
                            Trabajando por la calidad de nuestros productos desde 2024,
                            garantizando la mejor calidad que no encontrarás en otro lado
                        </h6>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                        <!-- Links -->
                        <h5 class="text-white titillium-web-bold">Desarrolladores</h5>
                        <hr class="mb-4 mt-0 d-inline-block mx-auto" />
                        <h6 class="titillium-web-regular">
                            <a href="#!" class="text-white">Josué Emiliano Valdés Jacobo</a>
                        </h6>
                        <h6 class="titillium-web-regular mt-3">
                            <a href="#!" class="text-white">Adriana Paola Mejía Méndez</a>
                        </h6>
                        <h6 class="titillium-web-regular mt-3">
                            <a href="#!" class="text-white">Fernando José Gomez Martinez</a>
                        </h6>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                        <!-- Content -->
                        <h5 class="text-white titillium-web-bold">Donde estamos ubicados</h5>
                        <hr class="mb-4 mt-0 d-inline-block mx-auto" />
                        <h6 class="titillium-web-regular">
                            Norte y, 83 Avenida Sur, San Salvador
                        </h6>
                        <button type="button" onclick="gotoAboutUs()"
                            class="btn border shadow bg-color-4blue col-10 rounded-pill p-3 text15 titillium-web-semibold text-white mt-4">
                            Más Sobre Nosotros</button>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <!-- Links -->
                        <h5 class="text-white titillium-web-bold">Contáctanos</h5>
                        <hr class="mb-4 mt-0 d-inline-block mx-auto" />

                        <div class="d-flex flex-row align-items-center mb-3">
                            <img class="me-2" src="../../recursos/imagenes/icons/facebookIcon1.svg" alt="">
                            <a class="text-white titillium-web-light" href="#">
                                <h6>FEASVerse</h6>
                            </a>
                        </div>
                        <div class="d-flex flex-row align-items-center mb-3">
                            <img class="me-2" src="../../recursos/imagenes/icons/instgrmIcon1.svg" alt="">
                            <a class="text-white titillium-web-light" href="">
                                <h6>FEAS.VERSE.SV </h6>
                            </a>
                        </div>
                        <div class="d-flex flex-row align-items-center mb-3">
                            <img class="me-2" src="../../recursos/imagenes/icons/xIcon1.svg" alt="">
                            <a class="text-white titillium-web-light" href="">
                                <h6>FEASVerse</h6>
                            </a>
                        </div>
                        <div class="d-flex flex-row align-items-center mb-3">
                            <img class="me-2" src="../../recursos/imagenes/icons//gmlIcon1.svg" alt="">
                            <a class="text-white titillium-web-light" href="">
                                <h6>feasverse.sv@gmail.com</h6>
                            </a>
                        </div>
                    </div>
                    <!-- Grid column -->
                </div>
                <!-- Grid row -->
            </div>
        </section>
        <!-- Section: Links  -->

        <!-- Copyright -->
        <div class="text-center p-3 btmFooter">
            Copyright © 2024 FeasVerseCompany. All rights reserved
        </div>
        <!-- Copyright -->
    </footer>
    <!-- Footer -->
`);
}

function gotoAboutUs() {
    location.href = "/vistas/publico/sobre_nosotros.html";
}

function gotoCarrito() {
    location.href = "/vistas/publico/carrito.html";
}