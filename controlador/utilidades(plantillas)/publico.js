/*
*   Controladores de uso general en las páginas web del sitio público.
*   Sirve para manejar las plantillas del encabezado y pie del documento.
*/

//* Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');
// *Se establece el título de la página web.
document.querySelector('title').textContent = 'FeasVerse';

/* Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.*/

const loadTemplate = async () => {
    // *Se agrega el encabezado de la página web antes del contenido principal.
    MAIN.insertAdjacentHTML('beforebegin', `
    <header> 
        <div class="flexboxNav1">
            <div>
                <nav class="navbar navbar-expand-lg cursor-hover fixed-top bg-color-3blue z-3" data-bs-theme="dark"
                    style="padding: 20px; padding-left: 65px; padding-right: 65px;">
                    <div class="container-fluid cursor-hover">
                        <a href="index.html" class="titillium-web-black text25">FEASVERSE
                            <img src="../../recursos/imagenes/logo.svg" class="img1" alt="FeasVerseCompany"
                                width="50" height="50">
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse cursor-hover" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-underline">
                                <li class="nav-item dropdown"> <!--*Elemento desplegable-->
                                    <a class="nav-link dropdown-toggle pointer-hover titillium-web-bold text18"
                                        href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Ingresar
                                    </a>
                                    <ul class="dropdown-menu cursor-hover bg-color-3blue">
                                        <li><a class="dropdown-item pointer-hover text15 titillium-web-regular"
                                                href="#">Registrarse</a>
                                        </li>
                                        <li><a class="dropdown-item pointer-hover text15 titillium-web-regular"
                                                id="textLight" href="#">Iniciar
                                                Sesión</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link pointer-hover titillium-web-bold text18" href="#">Sobre
                                        Nosotros</a>
                                </li>
                                <li class="nav-item dropdown"> <!--*Elemento desplegable -->
                                    <a class="nav-link dropdown-toggle pointer-hover titillium-web-bold text18"
                                        href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Marcas
                                    </a>
                                    <div>
                                        <ul class="dropdown-menu cursor-hover bg-color-3blue">
                                            <div class="d-flex flex-column">
                                                <!--TODO Inicio de filas, contenedor de filas-->
                                                <div class="d-flex flex-row mb-2"> <!--!fila 1-->
                                                    <li> <!--*Elemento 1-->
                                                        <a class="dropdown-item pointer-hover" id="textLight"
                                                            href="#">
                                                            <img class="imgMarca"
                                                                src="../../recursos/imagenes/marcas/adidas.svg"
                                                                alt="ADIDAS">
                                                        </a>
                                                    </li>
                                                    <li> <!--*Elemento 2-->
                                                        <a class="dropdown-item pointer-hover" id="textLight"
                                                            href="#">
                                                            <img class="imgMarca"
                                                                src="../../recursos/imagenes/marcas/adidas.svg"
                                                                alt="ADIDAS">
                                                        </a>
                                                    </li>
                                                    <li> <!--*Elemento 3-->
                                                        <a class="dropdown-item pointer-hover" id="textLight"
                                                            href="#">
                                                            <img class="imgMarca"
                                                                src="../../recursos/imagenes/marcas/adidas.svg"
                                                                alt="ADIDAS">
                                                        </a>
                                                    </li>
                                                    <li> <!--*Elemento 4-->
                                                        <a class="dropdown-item pointer-hover" id="textLight"
                                                            href="#">
                                                            <img class="imgMarca"
                                                            src="../../recursos/imagenes/marcas/adidas.svg"
                                                            alt="ADIDAS">
                                                        </a>
                                                    </li>
                                                </div> 
                                            </div>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end z-3">
                                <button class="btn bnt1 btn-outline-primary me-md-2" type="button">
                                    <img src="../../recursos/imagenes/carrito.svg" width="50px" height="50">
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    `);
    //* Se agrega el pie de la página web después del contenido principal.
    MAIN.insertAdjacentHTML('afterend', `
    <nav class="z-2 ">
    <footer class=" text-white text-center text-lg-start py-5 bg-color-3blue z-1">
        <!-- Grid container -->
        <div class="container p-4">
            <!--Grid row-->
            <div class="row ">
                <!--Grid column-->
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0 pb-3 z-2 ">
                    <h5 class="mb-0 titillium-web-bold z-2">Contáctanos</h5>
                    <ul class="list-unstyled mb-0 mt-4 ">
                        <li class="mb-3">
                            <img class="me-2" src="../../recursos/imagenes/icons/facebookIcon1.svg" alt="">
                            <a class="text-white titillium-web-light" href=""> FEASVerse </a>
                        </li>
                        <li class="mb-3">
                            <img class="me-2" src="../../recursos/imagenes/icons/instgrmIcon1.svg" alt="">
                            <a class="text-white titillium-web-light" href=""> FEAS.VERSE.SV </a>
                        </li>
                        <li class="mb-3">
                            <img class="me-2" src="../../recursos/imagenes/icons/xIcon1.svg" alt="">
                            <a class="text-white titillium-web-light" href=""> FEASVerse </a>
                        </li>
                        <li class="mb-3">
                            <img class="me-2" src="../../recursos/imagenes/icons//gmlIcon1.svg" alt="">
                            <a class="text-white titillium-web-light" href=""> feasverse.sv@gmail.com </a>
                        </li>
                    </ul>
                </div>
                <!--Grid column-->
                <!--Grid column-->
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0 pb-5">
                    <h5 class="mb-0 titillium-web-bold ">Desarrolladores</h5>
                    <ul class="list-unstyled mt-4">
                        <li class="mb-3 titillium-web-regular">
                            Josué Emiliano Valdés Jacobo
                        </li>
                        <li class="mb-3 titillium-web-regular">
                            Fernando José Gomez Martinez
                        </li>
                        <li class="mb-3 titillium-web-regular">
                            Adriana Paola Mejía Méndez
                        </li>
                    </ul>
                </div>
                <!--Grid column-->
                <!--Grid column-->
                <div class="col-lg-6 col-md-12 mb-4 mb-md-0 pb-5">
                    <h5 class="titillium-web-bold ">Donde Estamos Ubicados</h5>
                    <p class="titillium-web-regular mt-4">
                        Norte y, 83 Avenida Sur, San Salvador
                    </p>
                    <button type="button"
                        class="btn border border-2 shadow bg-color-4blue col-5 mt-4 rounded-pill p-3 text15 titillium-web-semibold text-white">Más
                        Sobre Nosotros</button>
                </div>
                <!--Grid column-->
            </div>
            <!--Grid row-->
        </div>
        <!-- Grid container -->
        <div class="d-flex justify-content-center">
            <!-- Copyright -->
            <div class="text-center copyright titillium-web-bold" style="background-color: rgba(255, 0, 0, 0);">
                Copyright © 2024 FeasVerseCompany. All rights reserved
                <a class="text-white titillium-web-light" href="./index.html">FeasVerse.com</a>
            </div>
        </div>
        <!-- Copyright -->
    </footer>
</nav>
    `);
}