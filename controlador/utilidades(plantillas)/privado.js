/*
*   Controlador de uso general en las páginas web del sitio privado.
*   Sirve para manejar la plantilla del encabezado y pie del documento.
*/

//* Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('#mainContent');

/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/

const loadTemplate = async () => {
    const header = document.createElement('header');
    header.innerHTML = `
    <nav class="navbar bg-color-5blue fixed-top position-relative">
    <div class="container-fluid m-3">
        <div class="d-flex align-items-center collapse-div">
            <h1 class="collapse-fea">FEASVERSE - </h1>
            <h2 class="collapse-admin"> Administrador</h2>
        </div>
        <div class="linea"></div>
        <form class="d-flex align-items-center">
            <h1 class="navbar-brand text-white titillium-web-semibold margin-user">Usuario</h1>
            <button class="btn btn-outline-primary" type="button">
                <img src="/recursos/imagenes/icons/exitUser.svg" width="50px" height="50">
            </button>
    </div>
</nav>
    `;

    const slideMenu = document.createElement('div');
    slideMenu.innerHTML = `
        
    `;

    const footer = document.createElement('footer');
    footer.innerHTML = `
        <nav class="z-2 fixed-bottom position-relative">
            <div class="text-white text-center text-lg-start py-3 bg-color-5blue z-1">
                <div class="d-flex justify-content-left mx-5">
                    <div class="text-center copyright titillium-web-bold" style="background-color: rgba(255, 0, 0, 0);">
                        Copyright © 2024 FeasVerseCompany. All rights reserved
                        <a class="text-white titillium-web-light" href="./index.html">FeasVerse.com</a>
                    </div>
                </div>
            </div>
        </nav>
    `;
    var contenedorSlide = document.getElementById("slide");
    contenedorSlide.appendChild(slideMenu);

    const hamBurger = document.querySelector(".toggle-btn");
    hamBurger.addEventListener("click", function () {
        document.querySelector("#sidebar").classList.toggle("expand");
        document.querySelector(".lineah").classList.toggle("expand");
    });

    var contenedorHeader = document.getElementById("header");
    contenedorHeader.appendChild(header);

    var contenedorDiv = document.getElementById("contenedorMAIN");
    contenedorDiv.appendChild(MAIN);

    var contenedorFooter = document.getElementById("footer");
    contenedorFooter.appendChild(footer);
}
