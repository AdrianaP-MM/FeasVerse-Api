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
    <div class="wrapper">
        <aside id="sidebar" class="position-relative">
            <img src="/recursos/imagenes/figureSMenu1.svg" class="triangleimg">
            <div class="d-flex position-relative">
                <div class="lineah"></div>
                <div class="lineah"></div>
                <button class="toggle-btn" type="button">
                    <i class="lni lni-grid-alt"><img src="../../recursos/imagenes/logo.svg" class="img1"
                            alt="FeasVerseCompany" width="50" height="50"></i>
                </button>
            </div>
            <ul class="sidebar-nav">
                <li class="sidebar-item mt-4">
                    <a href="#" class="sidebar-link">
                        <div class="contenedorItemNav pt-5">
                            <i class="lni lni-user img"> <img src="/recursos/imagenes/icons/houseIcon.svg"
                                    width="40" height="40" class="imgIcon"></i>
                            <span class="text-nav text20 titillium-web-regular">Inicio</span>
                        </div>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <div class="contenedorItemNav">
                            <i class="lni lni-user img"> <img src="/recursos/imagenes/icons/workersIcon.svg"
                                    width="40" height="40"></i>
                            <span class="text-nav text20 titillium-web-regular">Trabajadores</span>
                        </div>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <div class="contenedorItemNav">
                            <i class="lni lni-user img"> <img src="/recursos/imagenes/icons/clientIcon.svg"
                                    width="40" height="40"></i>
                            <span class="text-nav text20 titillium-web-regular">Clientes</span>
                        </div>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <div class="contenedorItemNav">
                            <i class="lni lni-user img"> <img src="/recursos/imagenes/icons/shoesIcon.svg"
                                    width="40" height="40"></i>
                            <span class="text-nav text20 titillium-web-regular">Zapatos</span>
                        </div>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <div class="contenedorItemNav">
                            <i class="lni lni-user img"> <img src="/recursos/imagenes/icons/pedidoIcon.svg"
                                    width="40" height="40"></i>
                            <span class="text-nav text20 titillium-web-regular">Pedidos</span>
                        </div>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <div class="contenedorItemNav">
                            <i class="lni lni-user img"> <img src="/recursos/imagenes/icons/marcaIcon.svg"
                                    width="40" height="40"></i>
                            <span class="text-nav text20 titillium-web-regular">Marcas</span>
                        </div>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <div class="contenedorItemNav" >
                            <i class="lni lni-user img"> <img src="/recursos/imagenes/icons/comentIcon.svg"
                                    width="40" height="40"></i>
                            <span class="text-nav text20 titillium-web-regular">Comentarios</span>
                        </div>
                    </a>
                </li>
            </ul>
        </aside>
        <div id="contenedorMAIN" class="position-relative">
        </div>
    </div>
    `;

    const footer = document.createElement('footer');
    footer.innerHTML = `
        <nav class="z-2 position-relative">
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
    });

    const sideBar = document.getElementById('sidebar');
    // Verifica si el contenido excede la altura del elemento
    if (sideBar.scrollHeight > sideBar.clientHeight) {
        // Agrega la clase si el contenido se desborda
        sideBar.classList.add('claseDesbordamiento');
    } else {
        // Elimina la clase si el contenido no se desborda
        sideBar.classList.remove('claseDesbordamiento');
    }

    var contenedorHeader = document.getElementById("header");
    contenedorHeader.appendChild(header);

    var contenedorDiv = document.getElementById("contenedorMAIN");
    contenedorDiv.appendChild(MAIN);

    var contenedorFooter = document.getElementById("footer");
    contenedorFooter.appendChild(footer);
}
