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
        <header  >
            <nav class="navbar navbar-expand-lg fixed-top" id="header" data-bs-theme="dark">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <img src="../../recursos/imagenes/logo.svg" height="70" alt="FeasVerse">
                    </a>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav ms-auto">
                            <a class="nav-link" href="index.html"><i class="bi bi-shop"></i> Catálogo</a>
                            <a class="nav-link" href="cart.html"><i class="bi bi-cart"></i> Carrito</a>
                            <a class="nav-link" href="#" onclick="logOut()"><i class="bi bi-box-arrow-left"></i> Cerrar sesión</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    `);
    //* Se agrega el pie de la página web después del contenido principal.
    MAIN.insertAdjacentHTML('afterend', `
        <footer>
            <nav class="navbar fixed-bottom bg-body-tertiary">
            <div class="container">
                <div>
                    <h6>CoffeeShop</h6>
                    <p><i class="bi bi-c-square"></i> 2018-2024 Todos los derechos reservados</p>
                </div>
                <div>
                    <h6>Contáctanos</h6>
                    <p><i class="bi bi-envelope"></i> dacasoft@outlook.com</p>
                </div>
            </div>
        </nav>
        </footer>
    `);
}