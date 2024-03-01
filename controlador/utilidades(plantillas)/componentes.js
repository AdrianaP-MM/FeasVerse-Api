/*
*   Función para mostrar un mensaje de confirmación. Requiere la librería sweetalert para funcionar.
*   Parámetros: message (mensaje de confirmación).
*   Retorno: resultado de la promesa.
*/
const confirmAction = (title, message) => {
    // Crea una instancia personalizada de SweetAlert con estilos Bootstrap.
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",   // Estilo del botón "Sí".
            cancelButton: "btn btn-danger"      // Estilo del botón "No".
        },
        buttonsStyling: false   // Desactiva los estilos por defecto de SweetAlert.
    });

    // Muestra la modal de confirmación con los parámetros proporcionados.
    return swalWithBootstrapButtons.fire({
        title: title,               // Título de la modal.
        text: message,              // Mensaje de la modal.
        icon: 'warning',            // Ícono de advertencia.
        showCancelButton: true,      // Muestra el botón "Cancelar/No".
        confirmButtonText: "Sí",    // Texto del botón de confirmación.
        cancelButtonText: "No",     // Texto del botón de cancelación.
        closeOnClickOutside: false,  // Evita cerrar la modal al hacer clic fuera de ella.
        closeOnEsc: false,           // Evita cerrar la modal al presionar la tecla Esc.
        reverseButtons: true         // Invierte la posición de los botones.
    });
}

/*
*   Función asíncrona para manejar los mensajes de notificación al usuario. Requiere la librería sweetalert para funcionar.
*   Parámetros: type (tipo de mensaje), text (texto a mostrar), timer (uso de temporizador) y url (valor opcional con la ubicación de destino).
*   Retorno: ninguno.
*/
// Función para mostrar mensajes de alerta personalizados.
const sweetAlert = async (type, text, timer) => {
    let title, icon;
    // Se compara el tipo de mensaje a mostrar y se asignan valores correspondientes a título e ícono.
    switch (type) {
        case 1:
            title = 'Éxito';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error';
            break;
        case 3:
            title = 'Advertencia';
            icon = 'warning';
            break;
        case 4:
            title = 'Aviso';
            icon = 'info';
            break;
    }
    // Se define un objeto con las opciones principales para el mensaje.
    let options = {
        title: title,                    // Título del mensaje.
        text: text,                      // Texto del mensaje.
        icon: icon,                      // Ícono del mensaje.
        closeOnClickOutside: false,      // Evita cerrar la modal al hacer clic fuera de ella.
        closeOnEsc: false,               // Evita cerrar la modal al presionar la tecla Esc.
        confirmButtonText: 'Aceptar',    // Texto del botón de confirmación.
        confirmButtonColor: '#0D4560'    // Color del botón de confirmación.
    };
    // Se verifica el uso del temporizador y se ajusta el tiempo de duración del mensaje.
    options.timer = timer ? 3000 : null;
    // Se muestra el mensaje utilizando SweetAlert.
    await Swal.fire(options);
};

/*
*   Función para generar un gráfico de barras verticales. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), xAxis (datos para el eje X), yAxis (datos para el eje Y), legend (etiqueta para los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
const barGraph = (canvas, xAxis, yAxis, legend, title) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];

    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    // Se crea una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvas), {
        type: 'line',          // Tipo de gráfico (línea en este caso).
        data: {
            labels: xAxis,      // Etiquetas en el eje x.
            datasets: [{
                label: legend,   // Leyenda del conjunto de datos.
                data: yAxis,     // Datos en el eje y.

                borderColor: 'rgb(75, 192, 192)',  // Color del borde de la línea.
                tension: 0.1      // Tensión de la curva.
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title   // Título del gráfico.
                },
                legend: {
                    display: false  // No mostrar la leyenda.
                }
            }
        }
    });
}


/*
*   Función asíncrona para cerrar la sesión del usuario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const logOut = async () => {
    // Se muestra un mensaje de confirmación y se captura la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de cerrar la sesión?', 'Será regresado al inicio de sesión');

    // Se verifica la respuesta del mensaje.
    if (RESPONSE.isConfirmed) {
        // Si el usuario confirma, se redirige a la página de inicio de sesión.
        location.href = '/vistas/privado/index.html';
    } else {
        // Si el usuario cancela, se oculta algún elemento modal (posiblemente DATA_MODAL).
        DATA_MODAL.hide();
    }

}