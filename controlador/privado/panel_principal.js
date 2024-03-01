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
    // Se declaran los arreglos para guardar los datos a graficar.
    // Se declaran dos arreglos: uno para los meses y otro para las ventas.
    let Meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let Ventas = [80,150,45,30,50,80,30,100,95,95,50,70];
    
    // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
    barGraph('chart1', Meses, Ventas, 'Ventas', 'Ventas por mes');

}
