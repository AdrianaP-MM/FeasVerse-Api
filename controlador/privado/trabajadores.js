// *Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // *Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    var primeraPestana = document.querySelector('#tabla-tab');
    if (primeraPestana) {
        primeraPestana.click();
        // Se muestra el div de tabla
        TABLE_DIV.classList.remove('d-none');
        ADD_DIV.classList.add('d-none');
    }

    ondblclickRowTable();
});

function ondblclickRowTable() {
    var id, ape, nom, dui, tel, eml, nvl;

    var table = document.getElementById('tablaTrabajadores');
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].ondblclick = function () {
            rIndex = this.rowIndex;
            id = this.cells[0].innerHTML;
            ape = this.cells[1].innerHTML;
            nom = this.cells[2].innerHTML;
            dui = this.cells[3].innerHTML;
            tel = this.cells[4].innerHTML;
            eml = this.cells[5].innerHTML;
            nvl = this.cells[6].innerHTML;

            // Mostrar SweetAlert con la información de la fila
            Swal.fire({
                html: `
                    <div class="contenedorDetallesTrabajador position-relative z-3"> <div class="rectangle z-0"></div>
            <div class="contenedorTituloD z-3">
                <h1 class="text-white text25 titillium-web-regular mb-2">Detalles Trabajador: ${id}</h1>
            </div>
            <div class="contenedorFormD z-3">
                <form class="row needs-validation form1" novalidate>
                    <div class="col-md-6">
                        <label for="validationCustom01" class="form-label">Nombres</label>
                        <input type="text" class="form-control editableInput" id="nombresInputD"
                            placeholder="Ingresa los nombres" required disabled value="${nom}"> 
                    </div>
                    <div class="col-md-6">
                        <label for="validationCustom02" class="form-label ">Apellidos</label>
                        <input type="text" class="form-control editableInput" id="apellidosInputD"
                            placeholder="Ingresa los apellidos" required disabled value="${ape}">
                    </div>
                    <div class="col-md-6 mt-3">
                        <label for="validationCustom02" class="form-label ">DUI</label>
                        <input type="text" class="form-control editableInput" id="DUIInputD"
                            placeholder="Ingresa el dui" required disabled value="${dui}">
                    </div>
                    <div class="col-md-6 mt-3">
                        <label for="validationCustom02" class="form-label ">Teléfono</label>
                        <input type="text" class="form-control editableInput" id="telInputD"
                            placeholder="Ingresa el número telefonico" required disabled value="${tel}">
                    </div>
                    <div class="col-md-6 mt-3">
                        <label for="validationCustom02" class="form-label ">Correo Electronico</label>
                        <input type="text" class="form-control editableInput" id="emailInputD"
                            placeholder="Ingresa el correo electronico" required disabled value="${eml}">
                    </div>
                    <div class="col-md-6 mt-3">
                        <label for="validationCustom02" class="form-label ">Fecha de Nacimiento</label>
                        <input type="text" class="form-control editableInput" id="fechanInputD"
                            placeholder="Ingresa la fecha de nacimiento" required disabled value="...">
                    </div>
                    <div class="col-md-6 mt-3">
                        <label for="validationCustom02" class="form-label">Fecha de Registro</label>
                        <input type="text" class="form-control editableInput" id="fecharInputD"
                            placeholder="21/2/2024" required disabled value="...">
                    </div>
                    <div class="col-md-6 mt-3">
                        <label for="validationCustom02" class="form-label ">Estado del
                            Trabajador</label>
                        <input type="text" class="form-control editableInput" id="estadoInputD"
                            placeholder="Vigente" required disabled value="...">
                    </div>
                    <div class="col-md-6 mt-3">
                        <label for="validationCustom02" class="form-label ">Nivel de Usuario</label>
                        <input type="text" class="form-control editableInput" id="nivelInputD"
                            placeholder="Ingresa el nivel de usuario" required disabled value="${nvl}">
                    </div>
                    <div class="col-md-6 mt-3">
                        <label for="validationCustom02" class="form-label ">Contraseña</label>
                        <input type="text" class="form-control editableInput" id="conInputD"
                            placeholder="Ingresa la contraseña" required disabled value="...">
                    </div>
                    <div class="contenedorBotones2">
                        <button type="button"
                            class="btn btn3 btn-primary ms-2 shadow text18 titillium-web-regular" onclick="closeSweet()"> Regresar</button>
                        <button class="btn btn3 btn-primary shadow ms-4 text18 titillium-web-regular"
                            type="button" onclick="HabiliDesaInput()" id="updatesave">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
                `,
                width: '70vw',
                background: '#1A89BD',
                showCancelButton: false,
                showConfirmButton: false,
                heightAuto: false,
                customClass: {
                    popup: 'custom-swal-popup'
                }
            });
        };
    }
}


// Constante para establecer el espacio de tabla y el espacio de agregar.
const TABLE_DIV = document.getElementById('tabla');
const ADD_DIV = document.getElementById('agregar');


function showAddDiv(boton) {
    // Se muestra el div para agregar trabajador.
    ADD_DIV.classList.remove('d-none');
    // Se oculta el formulario de tabla.
    TABLE_DIV.classList.add('d-none');

    // Restablece el color de todos los botones
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
    });

    // Cambia el color del botón clicado
    boton.style.backgroundColor = '#1A89BD';
    boton.style.color = 'white';
}


function showTableDiv(boton) {
    // Se muestra el div para agregar trabajador.
    TABLE_DIV.classList.remove('d-none');
    // Se oculta el formulario de tabla.
    ADD_DIV.classList.add('d-none');

    // Restablece el color de todos los botones
    var botones = document.querySelectorAll('.boton-cambiar-color');
    botones.forEach(function (b) {
        b.style.backgroundColor = '#146A93';
    });

    // Cambia el color del botón clicado
    boton.style.backgroundColor = '#1A89BD';
    boton.style.color = 'white';
}

const forms = document.querySelectorAll('.needs-validation')

Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
    }, false)
})

function returnBack() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "¿Seguro que quieres cancelar?",
        text: 'Los datos ingresados no serán guardados',
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            var inputs = document.querySelectorAll('.form-control');
            inputs.forEach(function (I) {
                I.value = '';
            });

            var primeraPestana = document.querySelector('#tabla-tab');
            primeraPestana.click();
            // Se muestra el div de tabla
            TABLE_DIV.classList.remove('d-none');
            ADD_DIV.classList.add('d-none');
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {

        }
    });
}

function HabiliDesaInput() {
    var inputs = document.querySelectorAll('.editableInput');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = !inputs[i].disabled;
    }

    /*if todos los input están habilitados, guardar
    y cerrar alert*/

}

function closeSweet() {
    Swal.close();
}