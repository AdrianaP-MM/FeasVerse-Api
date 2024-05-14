// Constante para completar la ruta de la API.
const PEDIDOS_API = 'services/privada/pedidos.php';

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Constante para obtener el número de horas.
    const HOUR = new Date().getHours();
    // Se define una variable para guardar un saludo.
    let greeting = '';
    // Dependiendo del número de horas transcurridas en el día, se asigna un saludo para el usuario.
    if (HOUR < 12) {
        greeting = 'Buenos días';
    } else if (HOUR < 19) {
        greeting = 'Buenas tardes';
    } else if (HOUR <= 23) {
        greeting = 'Buenas noches';
    }
    // Selecciona el contenedor del saludo
    const greetingContainer = document.getElementById('mainTitle');
    // Asigna el saludo al contenedor
    greetingContainer.textContent = `${greeting}, bienvenida/o`;
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    graficoBarrasVentas();
});

// Definición de la función asíncrona llamada 'graficoBarrasVentas'.
const graficoBarrasVentas = async () => {

    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PEDIDOS_API, 'ventasPorMes');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let Meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        let Ventas = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            Ventas.push(row.Cantidad);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        barGraph('chart1', Meses, Ventas, 'Ventas', 'Ventas por mes');
    } else {
        document.getElementById('chart1').remove();
        console.log(DATA.error);
    }
}
