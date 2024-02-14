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
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn bnt1 btn-outline-primary me-md-2" type="button"></button>
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
    
    `);
}